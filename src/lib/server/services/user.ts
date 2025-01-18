import {feedbacksTable, usersTable} from "$lib/server/db/schema";
import {desc, eq, sql} from "drizzle-orm";
import {z} from "zod";
import type {PostgresJsDatabase} from "drizzle-orm/postgres-js/driver";

export const getUser = async (uid:string, email:string, db:PostgresJsDatabase)=> {
    // one user cab have multiple profiles
    const user = await db.select()
        .from(usersTable)
        .where(eq(usersTable.uid, uid))
        .then((res) => res[0]);
    if (user) {
        return user;
    }
    // create a new user
    console.log("Uid", uid, "logged in but not found in the database, creating a new user");
    const res = z.string().email().safeParse(email);
    if (!res.success) {
        console.error("Get user error:", res.error);
        throw new Error("Invalid email");
    }
    return await createNewUser(uid, res.data, db);
}

export const createNewUser = async (uid: string, email: string, db:PostgresJsDatabase) => {
    // email is the only true identifier
    await db.insert(usersTable)
        .values({ email: email, uid: uid })
        .onConflictDoNothing();
    console.log("POST /auth/ newUser user created:", email);
    return await db.select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .then((res) => res[0]);
}

export const getWordStats = async (userId: number, db:PostgresJsDatabase) =>
    db.execute(sql`WITH date_range AS (SELECT generate_series(
                                         date_trunc('day', CURRENT_DATE - INTERVAL '1 months'),
                                         date_trunc('day', CURRENT_DATE),
                                         '1 day'::interval
                                 )::date AS date),
           user_word_counts AS (SELECT DATE(created_at) AS date,
                                       COUNT(*)         AS word_count
                                FROM user_words
                                WHERE user_id = ${userId}
                                  AND created_at >= CURRENT_DATE - INTERVAL '1 months'
                                GROUP BY DATE(created_at))
      SELECT dr.date,
             COALESCE(uwc.word_count, 0) AS word_count
      FROM date_range dr
               LEFT JOIN
           user_word_counts uwc ON dr.date = uwc.date
      ORDER BY dr.date;`);

export const getRecentNUserEmails = async (N: number, db:PostgresJsDatabase) =>
    db.select({email:usersTable.email, date:usersTable.created_at})
        .from(usersTable).orderBy(desc(usersTable.created_at)).limit(N);

export const getUserStats = async (db:PostgresJsDatabase) =>
    db.execute(sql`WITH date_range AS (SELECT generate_series(
                                         date_trunc('day', CURRENT_DATE - INTERVAL '1 months'),
                                         date_trunc('day', CURRENT_DATE),
                                         '1 day'::interval
                                 )::date AS date),
           user_counts AS (SELECT DATE(created_at) AS date,
                                COUNT(*)         AS user_count
                                FROM users WHERE created_at >= CURRENT_DATE - INTERVAL '1 months'
                                GROUP BY DATE(created_at))
      SELECT dr.date, COALESCE(uwc.user_count, 0) AS word_count
      FROM date_range dr
               LEFT JOIN
           user_counts uwc ON dr.date = uwc.date
      ORDER BY dr.date;`);

export const getRecentFeedbacks = async (db:PostgresJsDatabase) =>
    db.select().from(feedbacksTable).orderBy(desc(feedbacksTable.timestamp));


export const getRecentUserLogs = async (db:PostgresJsDatabase) =>
    db.execute(sql`SELECT
                       ul.id AS log_id,
                       u.id AS user_id,
                       u.email,  -- Assuming there's a username column, adjust if needed
                       d.id AS doc_id,
                       d.name AS document_name,
                       ul.page,
                       ul.action,
                       ul.timestamp
                   FROM
                       user_logs ul
                           JOIN
                       users u ON ul.user_id = u.id
                           JOIN
                       documents d ON ul.doc_id = d.id
                   WHERE
                       ul.action = 'VIEW'  -- Assuming 'read' is the action for reading logs
                   ORDER BY
                       ul.timestamp DESC
                   LIMIT 10;`)
import {eq} from "drizzle-orm";
import {usersTable} from "$lib/server/db/schema";
import type {PostgresJsDatabase} from "drizzle-orm/postgres-js/driver";

interface data {
    period: {
        start: number,
        end: number
    }
}

interface Lines {
    data: data[]
}

interface InvoicePaidEvent {
    customer: string,
    amount_paid: number,
    subscription: string,
    customer_email: string,
    status: string,
    lines: Lines
}

export const processInvoicePaidEvent = async (eventData: InvoicePaidEvent, db:PostgresJsDatabase) => {
    const email = eventData.customer_email;
    const subscriptionId = eventData.subscription;
    const user = await db.select().from(usersTable)
        .where(eq(usersTable.email, email))
        .then((res) => res[0]);
    if (!user) {
        console.warn("User paying for subscription without an account");
        throw new Error("User not found during payment");
    }
    // build and save newSubscription
    // const periodStart = eventData.lines.data[0].period.start;
    // const periodEnd = eventData.lines.data[0].period.end;
    // return newSub;
}
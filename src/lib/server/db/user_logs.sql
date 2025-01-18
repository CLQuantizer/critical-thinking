-- create table users (
--                        id serial primary key,
--                        uid text not null,
--                        email text not null,
--                        username text,
--                        status integer not null default 0,
--                        created_at timestamp not null default current_timestamp,
--                        updated_at timestamp not null default current_timestamp
-- );
-- -- create a unique index on the uid column
-- create unique index users_uid_index on users (uid);
-- -- create a unique index on the email column
-- create unique index users_email_index on users (email);

-- The user_logs table
create table user_logs (
    id serial primary key,
    user_id integer not null REFERENCES users(id),
    doc_id integer not null default -1,
    page integer not null default -1,
    action text not null,
    timestamp timestamp not null default current_timestamp
);

-- uniq by user_id, doc_id, and page
create unique index user_logs_user_id_doc_id_page_index on user_logs (user_id, doc_id, page);
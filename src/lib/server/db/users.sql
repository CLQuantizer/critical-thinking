create table users (
    id serial primary key,
    uid text not null,
    email text not null,
    username text,
    status integer not null default 0,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp
);
-- create a unique index on the uid column
create unique index users_uid_index on users (uid);
-- create a unique index on the email column
create unique index users_email_index on users (email);
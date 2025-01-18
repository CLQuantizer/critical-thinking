import {SQL_LITE} from "$env/static/private";
import {createClient} from "@libsql/client";
import { drizzle } from 'drizzle-orm/libsql';

export const SqlLiteClient = drizzle(createClient({url: 'file:' + SQL_LITE}));


import type {DrizzleD1Database} from "drizzle-orm/d1/driver";
import {LibSQLDatabase} from "drizzle-orm/libsql";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			// DrizzleD1Database or
			db: DrizzleD1Database | LibSQLDatabase
			userId: string
		}
		interface Platform {
			env?: {
				DB: D1Database
			},
			caches: CacheStorage & { default: Cache }
		}
		// interface PageState {}
	}
}

export {}

import type {DrizzleD1Database} from "drizzle-orm/d1/driver";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			// DrizzleD1Database or
			db: DrizzleD1Database
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

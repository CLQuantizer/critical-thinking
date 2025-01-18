import type {SupabaseClient, User} from '@supabase/supabase-js'
import type {PostgresJsDatabase} from "drizzle-orm/postgres-js/driver";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient
			session: any | null
			db: PostgresJsDatabase
			safeGetSession: () => Promise<{ user: User | null }>
			user: any | null
		}
		interface Platform {
			env?: {
				HYPERDRIVE: string
			},
			caches: CacheStorage & { default: Cache }
		}
		interface PageData {
			supabase: SupabaseClient
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}

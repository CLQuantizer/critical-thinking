import {drizzle} from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const getHyperDrive = (HYPERDRIVE: string)=>
    drizzle(postgres(HYPERDRIVE));

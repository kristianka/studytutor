import { UserMetadata } from "@supabase/supabase-js";

export interface User extends UserMetadata {
    user_metadata: {
        first_name: string;
        last_name: string;
    };
}

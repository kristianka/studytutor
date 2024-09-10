import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Home() {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    const user = data?.user;

    return (
        <main>
            <h1>Home</h1>
            {user ? <p>hello {user?.email}</p> : <p>Not logged in</p>}
            <p>hello world</p>
            <Link href="/login">Login</Link>
        </main>
    );
}

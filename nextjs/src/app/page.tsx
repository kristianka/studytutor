import { createClient } from "@/utils/supabase/server";

export default async function Home() {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    const user = data?.user;

    return (
        <main>
            <h1>Home</h1>
            {user ? <p>hello {user?.email}</p> : <p>Not logged in</p>}
        </main>
    );
}

import { createClient } from "@/utils/supabase/server";

export default async function Home() {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    const user = data?.user;

    return (
        // needs to be here because of root layout
        <main className="mx-auto mt-10 max-w-7xl">
            <h1>Home</h1>
            {user ? <p>hello {user.user_metadata.first_name}</p> : <p>Not logged in</p>}
        </main>
    );
}

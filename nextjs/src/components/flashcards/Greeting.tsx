export default function Greeting({ firstName }: { firstName: string }) {
    return (
        <div className="flex items-center justify-between">
            <div className="">
                <h1 className="text-3xl font-bold">Hi, {firstName}!</h1>
                <h2 className="text-xl font-bold">What do you want to learn about today? 😊</h2>
            </div>
            <h2 className="text-2xl font-bold">🔥21</h2>
        </div>
    );
}

export default function Greeting({ firstName }: { firstName: string }) {
    return (
        <div className="flex items-center justify-between">
            <div className="">
                <h1 className="text-3xl font-bold">Hi, {firstName}!</h1>
                <h2 className="text-xl font-bold">What is your study plan for today? 😊</h2>
            </div>
        </div>
    );
}

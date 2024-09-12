// to do add name to user type when it's asked in registration
export interface User {
    id: string;
    aud: string;
    role: string;
    email: string;
    email_confirmed_at: string;
    confirmation_sent_at: string;
    last_sign_in_at: string;
    created_at: string;
    updated_at: string;
}

import { Link } from 'react-router'
import { Card } from '../components/ui/Card'

export function RegisterPage() {
    return (
        <main className="grid min-h-screen place-items-center bg-canvas p-4">
            <Card className="flex w-full max-w-[420px] flex-col gap-5">
                <h1 className="text-h1 text-text-primary">Create your account</h1>
                <Link
                    className="text-small text-brand-600 hover:text-brand-700"
                    to="/login"
                >
                    Already have an account? Sign in
                </Link>
            </Card>
        </main>
    )
}

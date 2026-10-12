import type { ReactNode } from 'react'
import { Card } from '../ui/Card'

type AuthCardProps = {
    title: string
    children: ReactNode
}

export function AuthCard({ title, children }: AuthCardProps) {
    return (
        <main className="grid min-h-screen place-items-center bg-canvas p-4 sm:p-6">
            <Card className="flex w-full max-w-[420px] flex-col gap-6 sm:p-6">
                <h1 className="text-center text-h1 text-text-primary">
                    {title}
                </h1>
                {children}
            </Card>
        </main>
    )
}
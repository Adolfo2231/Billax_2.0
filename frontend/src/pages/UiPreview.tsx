import { Alert } from "../components/ui/Alert";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { FormField } from "../components/ui/FormField";

export function UiPreview() {
    return (
        <main className="min-h-screen bg-canvas text-text-primary p-6 flex flex-col gap-5">
            <h1 className="text-h1">UI preview</h1>
            <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
            </div>
            <Card>
                <div className="flex flex-col gap-4">
                    <FormField id="email" label="Email" type="email" placeholder="you@example.com" />
                    <FormField
                        id="password"
                        label="Password"
                        type="password"
                        hint="Min. 8 characters"
                    />
                    <FormField
                        id="confirm"
                        label="Confirm password"
                        type="password"
                        error="Passwords do not match"
                    />
                </div>
            </Card>
            <Alert variant="error">Something went wrong</Alert>
            <Alert variant="success">Account created</Alert>
        </main>
    );
}

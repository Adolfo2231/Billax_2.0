import { Input } from "./Input";
import { Label } from "./Label";

type FormFieldProps = {
    id: string;
    label: string;
    error?: string;
    hint?: string;
} & Omit<React.ComponentProps<typeof Input>, "id" | "invalid">;

export function FormField({ id, label, error, hint, ...inputProps }: FormFieldProps) {
    const errorId = `${id}-error`;
    const hintId = `${id}-hint`;
    const describedBy =
        [inputProps["aria-describedby"], hint ? hintId : undefined, error ? errorId : undefined]
            .filter(Boolean)
            .join(" ") || undefined;

    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor={id}>{label}</Label>
            <Input
                {...inputProps}
                id={id}
                invalid={Boolean(error)}
                aria-describedby={describedBy}
            />
            {hint ? (
                <p id={hintId} className="text-caption text-text-secondary">
                    {hint}
                </p>
            ) : null}
            {error ? (
                <p id={errorId} className="text-caption text-danger">
                    {error}
                </p>
            ) : null}
        </div>
    );
}

import { Input } from "./Input";
import { Label } from "./Label";

type FormFieldProps = {
    id: string;
    label: React.ReactNode;
    error?: string;
    hint?: string;
    icon?: React.ReactNode;
} & Omit<React.ComponentProps<typeof Input>, "id" | "invalid">;

export function FormField({
    id,
    label,
    error,
    hint,
    icon,
    ...inputProps
}: FormFieldProps) {
    const errorId = `${id}-error`;
    const hintId = `${id}-hint`;
    const describedBy =
        [inputProps["aria-describedby"], hint ? hintId : undefined, error ? errorId : undefined]
            .filter(Boolean)
            .join(" ") || undefined;

    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor={id}>{label}</Label>
            <div className="relative">
                {icon ? (
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute left-4 top-[50%] size-[20px] -translate-y-[50%] text-text-secondary"
                    >
                        {icon}
                    </span>
                ) : null}
                <Input
                    {...inputProps}
                    id={id}
                    invalid={Boolean(error)}
                    aria-describedby={describedBy}
                    className={`${icon ? "pl-[44px]" : ""} ${inputProps.className ?? ""}`}
                />
            </div>
            {hint ? (
                <p id={hintId} className="text-caption text-text-secondary">
                    {hint}
                </p>
            ) : null}
            {error ? (
                <p id={errorId} className="text-caption text-text-primary">
                    {error}
                </p>
            ) : null}
        </div>
    );
}

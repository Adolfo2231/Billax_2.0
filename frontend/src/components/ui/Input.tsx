type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
    type?: "text" | "email" | "password" | "number";
    invalid?: boolean;
};

export function Input({
    type = "text",
    invalid = false,
    className,
    ...rest
}: InputProps) {
    return (
        <input
            type={type}
            aria-invalid={invalid}
            className={`w-full rounded-md border bg-surface px-4 py-3 text-small text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${invalid ? "border-danger" : "border-border"} ${className ?? ""}`}
            {...rest}
        />
    );
}
import { Spinner } from "./Spinner";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary';
    loading?: boolean;
};

const variantClassName = {
    primary: "bg-brand-600 text-surface hover:bg-brand-700",
    secondary: "border border-border bg-surface text-text-primary hover:bg-surface-muted",
};

export function Button({
    variant = "primary",
    loading = false,
    disabled,
    children,
    className,
    type = "button",
    ...rest
}: ButtonProps) {
    return (
    <button
        type={type}
        disabled={disabled || loading}
        aria-busy={loading}
        className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-3 text-small font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variantClassName[variant]} ${className ?? ""}`}
        {...rest}
    >
        {loading ? <Spinner /> : null}
        {children}
    </button>
    );
}
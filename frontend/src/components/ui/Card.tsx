type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...rest }: CardProps) {
    return (
        <div
            className={`rounded-lg border border-border bg-surface p-5 text-text-primary shadow-card ${className ?? ''}`}
            {...rest}
        />
    );
}

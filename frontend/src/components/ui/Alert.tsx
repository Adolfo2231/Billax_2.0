type AlertProps = {
    variant: 'error' | 'success';
    children: React.ReactNode;
    className?: string;
};

const variantClassName = {
    error: 'border-danger bg-surface text-text-primary',
    success: 'border-brand-600 bg-brand-50 text-text-primary',
};

const variantRole = {
    error: 'alert',
    success: 'status',
} as const;

export function Alert({ variant, children, className }: AlertProps) {
    return (
        <div
            role={variantRole[variant]}
            className={`rounded-md border px-4 py-3 text-small ${variantClassName[variant]} ${className ?? ''}`}
        >
            {children}
        </div>
    );
}

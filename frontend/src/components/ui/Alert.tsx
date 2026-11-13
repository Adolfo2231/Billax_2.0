type AlertProps = {
    variant: 'error' | 'success' | 'dark-error' | 'dark-success';
    children: React.ReactNode;
    className?: string;
};

const variantClassName = {
    error: 'border-danger bg-surface text-text-primary',
    success: 'border-brand-600 bg-brand-50 text-text-primary',
    /* Dark auth screens: do not rely on className overrides — Tailwind keeps the
       stylesheet-order winner, so light bg + text-white becomes an empty white box. */
    'dark-error': 'border-danger/40 bg-dark-input text-white',
    'dark-success': 'border-dark-accent/40 bg-dark-input text-white',
};

const variantRole = {
    error: 'alert',
    success: 'status',
    'dark-error': 'alert',
    'dark-success': 'status',
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

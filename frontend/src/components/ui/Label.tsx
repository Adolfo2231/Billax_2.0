type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ className, ...rest }: LabelProps) {
    return (
        <label
            className={`text-small font-medium text-text-secondary ${className ?? ""}`}
            {...rest}
        />
    );
}
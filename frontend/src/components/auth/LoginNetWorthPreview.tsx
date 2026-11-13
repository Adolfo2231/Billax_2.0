/**
 * Decorative marketing preview for the desktop login hero.
 * Not wired to live account totals — visual only.
 */
export function LoginNetWorthPreview() {
    return (
        <div
            aria-hidden="true"
            className="w-full max-w-[480px] rounded-xl border border-white/10 bg-black px-[40px] py-[48px] shadow-accent-glow"
        >
            <p className="text-small text-dark-text-secondary">
                Total net worth
            </p>
            <p className="mt-5 text-[40px] font-bold leading-none tracking-tight text-white">
                $7,090.35
            </p>
        </div>
    )
}

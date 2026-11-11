import type { EnvelopeIcon as EnvelopeIconName } from '../../types/Envelope'

type EnvelopeIconProps = {
    icon: EnvelopeIconName
    color: string
}

function IconGraphic({ icon }: { icon: EnvelopeIconName }) {
    switch (icon) {
        case 'rent':
            return (
                <path
                    d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinejoin="round"
                />
            )
        case 'groceries':
            return (
                <>
                    <path
                        d="M6 7h1.5l1.2 9h8.6l1.4-7H8"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <circle cx="10" cy="19" r="1.2" fill="currentColor" />
                    <circle cx="16" cy="19" r="1.2" fill="currentColor" />
                </>
            )
        case 'gas':
            return (
                <>
                    <rect
                        x="5"
                        y="4"
                        width="9"
                        height="16"
                        rx="1.5"
                        stroke="currentColor"
                        strokeWidth="1.75"
                    />
                    <path
                        d="M14 8h2.5a2 2 0 0 1 2 2v6.5a1.5 1.5 0 0 0 3 0V11"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                    />
                    <path
                        d="M7.5 8h4"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                    />
                </>
            )
        case 'fun':
            return (
                <path
                    d="M12 3.5 14.2 9h5.8l-4.7 3.5 1.8 5.5L12 14.8 7 18l1.8-5.5L4 9h5.8L12 3.5Z"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinejoin="round"
                />
            )
        case 'emergency':
            return (
                <path
                    d="M12 3.5 19 6.5v5c0 4.5-3 7.5-7 8.5-4-1-7-4-7-8.5v-5l7-3Z"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinejoin="round"
                />
            )
    }
}

export function EnvelopeIcon({ icon, color }: EnvelopeIconProps) {
    return (
        <span
            aria-hidden="true"
            className="grid size-[40px] shrink-0 place-items-center rounded-md"
            style={{
                color,
                backgroundColor: `${color}26`,
            }}
        >
            <svg className="size-[20px]" viewBox="0 0 24 24" fill="none">
                <IconGraphic icon={icon} />
            </svg>
        </span>
    )
}

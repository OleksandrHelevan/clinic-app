export const GeminiLogo = ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        <defs>
            <linearGradient id="gem1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4285F4" />
                <stop offset="100%" stopColor="#8AB4F8" />
            </linearGradient>
        </defs>
        <path
            d="M14 2C14 2 14 13 2 14C14 14 14 26 14 26C14 26 14 14 26 14C14 14 14 2 14 2Z"
            fill="url(#gem1)"
        />
    </svg>
);
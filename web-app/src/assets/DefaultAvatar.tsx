interface DefaultAvatarProps {
    className?: string;
}

export const DefaultAvatar = ({ className }: DefaultAvatarProps) => (
    <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#9ca3af"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ backgroundColor: '#f3f4f6' }}
    >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);
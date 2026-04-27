interface AvatarProps {
    height?: number;
    width?: number;
    color?: string;
}

export const Avatar = ({
                           height = 100,
                           width = 100,
                           color = "#5c52d4",
                       }: AvatarProps) => (
    <svg
        width={width}
        height={height}
        viewBox="-1.6 -1.6 19.2 19.2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
    >
        <g>
            <rect
                x="-1.6"
                y="-1.6"
                width="19.2"
                height="19.2"
                rx="9.6"
                fill="#ffffff"
            />
        </g>

        <path
            d="m 8 1 c -1.65625 0 -3 1.34375 -3 3 s 1.34375 3 3 3 s 3 -1.34375 3 -3 s -1.34375 -3 -3 -3 z m -1.5 7 c -2.492188 0 -4.5 2.007812 -4.5 4.5 v 0.5 c 0 1.109375 0.890625 2 2 2 h 8 c 1.109375 0 2 -0.890625 2 -2 v -0.5 c 0 -2.492188 -2.007812 -4.5 -4.5 -4.5 z"
            fill={color}
        />
    </svg>
);
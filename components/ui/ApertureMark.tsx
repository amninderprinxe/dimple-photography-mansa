"use client";

interface ApertureMarkProps {
  size?: number;
  className?: string;
  blades?: number;
}

/**
 * A stylised camera-aperture mark built from overlapping blade shapes.
 * Used as the brand mark and as an ambient rotating motif across the site —
 * the one signature element the whole design is built around.
 */
export default function ApertureMark({
  size = 40,
  className = "",
  blades = 8,
}: ApertureMarkProps) {
  const bladeArray = Array.from({ length: blades });
  const radius = 44;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      fill="none"
    >
      <circle
        cx="50"
        cy="50"
        r="48"
        stroke="url(#apertureRing)"
        strokeWidth="0.75"
        opacity="0.6"
      />
      {bladeArray.map((_, i) => {
        const angle = (360 / blades) * i;
        return (
          <g key={i} transform={`rotate(${angle} 50 50)`}>
            <path
              d={`M50 50 L${50 + radius} 50 L${50 + radius * 0.72} ${
                50 - radius * 0.4
              } Z`}
              fill="url(#apertureBlade)"
              opacity="0.85"
            />
          </g>
        );
      })}
      <circle cx="50" cy="50" r="14" fill="#07070A" stroke="#C9A227" strokeWidth="0.75" />
      <defs>
        <linearGradient id="apertureBlade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E9CE79" />
          <stop offset="55%" stopColor="#C9A227" />
          <stop offset="100%" stopColor="#8F6B12" />
        </linearGradient>
        <linearGradient id="apertureRing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E9CE79" />
          <stop offset="100%" stopColor="#8F6B12" />
        </linearGradient>
      </defs>
    </svg>
  );
}

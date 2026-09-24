// Five-pointed star with an outer radius of 1, scaled per use.
const starPath =
  "M0,-1 L0.2245,-0.309 L0.9511,-0.309 L0.3633,0.118 L0.5878,0.809 L0,0.382 L-0.5878,0.809 L-0.3633,0.118 L-0.9511,-0.309 L-0.2245,-0.309 Z";

// Twelve stars on a circle (radius 84, centre 100,100), like the EU flag.
// Hard-coded so server and client render identical markup.
const starPositions = [
  [100, 16],
  [142, 27.25],
  [172.75, 58],
  [184, 100],
  [172.75, 142],
  [142, 172.75],
  [100, 184],
  [58, 172.75],
  [27.25, 142],
  [16, 100],
  [27.25, 58],
  [58, 27.25],
] as const;

type EuStarRingProps = {
  className?: string;
  starSize?: number;
  /** Overrides the orbit speed when combined with `animate-orbit`. */
  duration?: string;
};

/** Decorative EU-flag star ring, used as a brand motif behind key visuals. */
export function EuStarRing({
  className = "",
  starSize = 7,
  duration,
}: EuStarRingProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      fill="currentColor"
      className={className}
      style={duration ? { animationDuration: duration } : undefined}
    >
      {starPositions.map(([x, y]) => (
        <path
          key={`${x}-${y}`}
          d={starPath}
          transform={`translate(${x} ${y}) scale(${starSize})`}
        />
      ))}
    </svg>
  );
}

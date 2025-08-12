import React, { useRef } from "react";

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: string;
  style?: React.CSSProperties;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(82, 39, 255, 0.25)",
  style
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
    divRef.current.style.setProperty("--spotlight-color", spotlightColor);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden rounded-lg bg-card border border-border 
        before:absolute before:inset-0 before:z-0 before:opacity-0 
        before:bg-[radial-gradient(250px_circle_at_var(--mouse-x)_var(--mouse-y),var(--spotlight-color),transparent)]
        before:transition-opacity before:duration-300 hover:before:opacity-100 ${className}`}
      style={{
        '--spotlight-color': spotlightColor,
        ...style
      } as React.CSSProperties}
    >
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;
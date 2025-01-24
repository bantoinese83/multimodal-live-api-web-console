import React, { useEffect, useRef, useCallback } from "react";

const lineCount = 3;

export type AudioPulseProps = {
  active: boolean;
  volume: number;
  hover?: boolean;
  className?: string;
};

export default function AudioPulse({ active, volume, hover, className }: AudioPulseProps) {
  const lines = useRef<HTMLDivElement[]>([]);

  const update = useCallback(() => {
    lines.current.forEach((line, i) => {
      line.style.height = `${Math.min(24, 4 + volume * (i === 1 ? 400 : 60))}px`;
    });
  }, [volume]);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      update();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [update]);

  return (
    <div className={`audio-pulse ${className} ${active ? 'active' : ''} ${hover ? 'hover' : ''}`}>
      {Array(lineCount)
        .fill(null)
        .map((_, i) => (
          <div
            key={i}
            ref={(el) => (lines.current[i] = el!)}
          />
        ))}
    </div>
  );
}
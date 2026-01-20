import React, { useMemo } from 'react';

interface Props {
  text: string;
  onClick?: () => void;
  className?: string;
  href?: string;
  icon?: React.ReactNode;
}

const SparkleButton: React.FC<Props> = ({ text, onClick, className = "", href, icon }) => {
  const particles = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      alpha: Math.random(),
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 2,
      size: Math.random() * 0.3 + 0.1,
      originX: Math.random() * 1000 - 500,
      originY: Math.random() * 1000 - 500,
    }));
  }, []);

  const content = (
    <div className="sp">
      <button className={`sparkle-button ${className}`} onClick={onClick}>
        <span className="spark"></span>
        <span className="backdrop"></span>
        {icon ? (
          <div className="sparkle flex items-center justify-center -translate-x-1/4 -translate-y-[5%]">
            {icon}
          </div>
        ) : (
          <svg className="sparkle" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            <path d="M6 4L7 6L9 7L7 8L6 10L5 8L3 7L5 6L6 4Z" />
            <path d="M18 16L19 18L21 19L19 20L18 22L17 20L15 19L17 18L18 16Z" />
          </svg>
        )}
        <span className="text">{text}</span>
      </button>
      <div className="particle-pen">
        {particles.map((p) => (
          <svg
            key={p.id}
            className="particle"
            style={{
              '--x': p.x,
              '--y': p.y,
              '--alpha': p.alpha,
              '--duration': p.duration,
              '--delay': p.delay,
              '--size': p.size,
              '--origin-x': `${p.originX}%`,
              '--origin-y': `${p.originY}%`,
            } as React.CSSProperties}
            viewBox="0 0 6 6"
          >
            <path d="M3 0L3.5 2.5L6 3L3.5 3.5L3 6L2.5 3.5L0 3L2.5 2.5L3 0Z" />
          </svg>
        ))}
      </div>
    </div>
  );

  if (href) {
    return <a href={href} className="inline-block" target="_blank" rel="noopener noreferrer">{content}</a>;
  }

  return content;
};

export default SparkleButton;
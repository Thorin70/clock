
import React from 'react';

interface ClockHandProps {
  rotation: number;
  heightPercent: number;
  widthPx: number;
  colorClass: string;
  zIndex: string;
  clockRadius: number;
}

const ClockHand: React.FC<ClockHandProps> = ({ rotation, heightPercent, widthPx, colorClass, zIndex, clockRadius }) => {
  const handHeight = clockRadius * (heightPercent / 100);

  return (
    <div
      className={`absolute bottom-1/2 left-1/2 ${colorClass} ${zIndex} rounded-t-lg shadow-md`}
      style={{
        width: `${widthPx}px`,
        height: `${handHeight}px`,
        transformOrigin: 'bottom center',
        transform: `translateX(-50%) rotate(${rotation}deg)`,
      }}
      aria-hidden="true"
    />
  );
};

export default ClockHand;

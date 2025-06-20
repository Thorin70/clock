
import React from 'react';
import ClockHand from './ClockHand';

const CLOCK_DIAMETER_PX = 320; 
const CLOCK_RADIUS_PX = CLOCK_DIAMETER_PX / 2;
const RIM_THICKNESS_PX = 12; 
const INNER_FACE_OFFSET_FROM_RIM_EDGE_PX = 2; 

const INNER_FACE_RADIUS_PX = CLOCK_RADIUS_PX - RIM_THICKNESS_PX;

interface ClockProps {
  currentTime: Date;
}

const Clock: React.FC<ClockProps> = ({ currentTime }) => {
  const seconds = currentTime.getSeconds();
  const minutes = currentTime.getMinutes();
  const hours = currentTime.getHours();

  const secondDeg = (seconds / 60) * 360;
  const minuteDeg = ((minutes + seconds / 60) / 60) * 360;
  const hourDeg = (((hours % 12) + minutes / 60 + seconds / 3600) / 12) * 360;

  return (
    <div
      className="relative rounded-full bg-gray-800 shadow-[0_12px_35px_rgba(0,0,0,0.5),_0_0_0_2px_rgba(100,116,139,0.3)] filter drop-shadow(0_0_10px_rgba(0,0,0,0.3))"
      style={{ 
        width: `${CLOCK_DIAMETER_PX}px`, 
        height: `${CLOCK_DIAMETER_PX}px`,
        padding: `${RIM_THICKNESS_PX}px`
      }}
      role="timer"
      aria-roledescription="analog clock"
      aria-label={`Current time: ${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`}
    >
      <div 
        className="relative w-full h-full rounded-full bg-gray-900 shadow-[inset_0_3px_10px_rgba(0,0,0,0.5),_inset_0_0_0_1px_rgba(255,255,255,0.05)]"
      >
        <div className="absolute inset-0" aria-hidden="true">
          {Array.from({ length: 60 }).map((_, i) => {
            const isMajorTick = i % 5 === 0;
            const tickHeight = isMajorTick ? 12 : 7;
            const tickWidth = isMajorTick ? 3 : 1.5;
            const tickColorClass = isMajorTick ? 'bg-gray-400' : 'bg-gray-700';
            
            const tickDistanceFromInnerEdge = INNER_FACE_OFFSET_FROM_RIM_EDGE_PX + 3;

            return (
              <div
                key={`tick-${i}`}
                className={`absolute left-1/2 transform -translate-x-1/2 ${tickColorClass} rounded-full`}
                style={{
                  width: `${tickWidth}px`,
                  height: `${tickHeight}px`,
                  top: `${tickDistanceFromInnerEdge}px`, 
                  transformOrigin: `50% ${INNER_FACE_RADIUS_PX - tickDistanceFromInnerEdge}px`,
                  transform: `translateX(-50%) rotate(${i * 6}deg)`,
                }}
              />
            );
          })}
        </div>

        {Array.from({ length: 12 }, (_, i) => {
          const hourValue = i + 1;
          const numberDisplayRadius = INNER_FACE_RADIUS_PX * 0.78; 
          const angleRad = (hourValue / 12) * 2 * Math.PI - Math.PI / 2; 
          
          const x = numberDisplayRadius * Math.cos(angleRad);
          const y = numberDisplayRadius * Math.sin(angleRad);
          
          return (
            <div
              key={`hour-${hourValue}`}
              className="absolute text-xl font-light text-gray-300 flex items-center justify-center select-none"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
                width: '30px', 
                height: '30px',
              }}
              aria-hidden="true"
            >
              {hourValue}
            </div>
          );
        })}

        <div className="absolute inset-0 z-[20]" aria-hidden="true">
          <ClockHand rotation={hourDeg} heightPercent={55} widthPx={7} colorClass="bg-sky-400" zIndex="z-[1]" clockRadius={INNER_FACE_RADIUS_PX} />
          <ClockHand rotation={minuteDeg} heightPercent={75} widthPx={5} colorClass="bg-sky-300" zIndex="z-[2]" clockRadius={INNER_FACE_RADIUS_PX} />
          <ClockHand rotation={secondDeg} heightPercent={90} widthPx={2} colorClass="bg-red-500" zIndex="z-[3]" clockRadius={INNER_FACE_RADIUS_PX} />
        </div>

        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-gray-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-[21] shadow-md" aria-hidden="true"></div>
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-[22]" aria-hidden="true"></div>
      </div>
    </div>
  );
};

export default Clock;

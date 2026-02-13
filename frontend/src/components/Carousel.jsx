import { useEffect, useState } from "react";

export default function ThreeDCarousel({ images = [], autoRotateSpeed = 2500 }) {
  const [angle, setAngle] = useState(0);

  const itemCount = images.length;
  const visibleCount = 3;
  const step = 360 / itemCount;
  const radius = 350;

  useEffect(() => {
    if (itemCount === 0) return;

    const interval = setInterval(() => {
      setAngle((prev) => prev - step);
    }, autoRotateSpeed);

    return () => clearInterval(interval);
  }, [itemCount, step, autoRotateSpeed]);

  return (
    <div className="w-full flex justify-center py-5 perspective-1000">
      <div
        className="relative w-[300px] h-[200px] preserve-3d transition-transform duration-700 ease-out"
        style={{ transform: `rotateY(${angle}deg)` }}
      >
        {images.map((src, i) => {
          const rotate = i * step;
          const fullRotation = rotate + angle;

          return (
            <div
              key={i}
              className="absolute top-0 left-0 w-full h-full rounded-xl overflow-hidden shadow-xl transition-all duration-700"
              style={{
                transform: `
                  rotateY(${rotate}deg)
                  translateZ(${radius}px)
                `,
                opacity: isCardVisible(fullRotation, visibleCount, step) ? 1 : 0.12,
                scale: isCardVisible(fullRotation, visibleCount, step) ? 1 : 0.85,
              }}
            >
              <img src={src} className="w-full h-full object-cover" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// SHOW ONLY 3 CARDS LOGIC
function isCardVisible(rotation, visibleCount, step) {
  const normalized = ((rotation % 360) + 360) % 360;
  const halfRange = (visibleCount * step) / 2;

  return normalized > 360 - halfRange || normalized < halfRange;
}

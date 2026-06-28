import { useEffect, useState } from 'react';

const MOBILE_QUERY = '(max-width: 768px), (pointer: coarse)';

/** Определяет мобильное / touch-устройство */
export function useDevice() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(MOBILE_QUERY).matches : false,
  );

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return {
    isMobile,
    /** На mobile отключаем тяжёлые 3D-эффекты */
    enableHeavyEffects: !isMobile,
    dpr: isMobile ? ([1, 1] as [number, number]) : ([1, 1.5] as [number, number]),
  };
}

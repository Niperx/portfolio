import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePortfolioStore } from '../../hooks/usePortfolioStore';

export function LoadingScreen() {
  const isLoading = usePortfolioStore((s) => s.isLoading);
  const setIsLoading = usePortfolioStore((s) => s.setIsLoading);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    let killed = false;

    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { strokeDashoffset: 200 },
        { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' },
      );
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (killed) return;
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          onComplete: () => { if (!killed) setIsLoading(false); },
        });
      },
    });

    tl.to(progressRef.current, { width: '100%', duration: 1.6, ease: 'power2.inOut' });

    return () => { killed = true; tl.kill(); };
  }, [setIsLoading]);

  if (!isLoading) return null;

  return (
    <div
      ref={containerRef}
      className="paper-texture fixed inset-0 z-50 flex flex-col items-center justify-center bg-mono-bg"
    >
      {/* Hand-drawn линия */}
      <svg className="mb-6 h-16 w-48" viewBox="0 0 200 40">
        <line
          ref={lineRef}
          x1="10" y1="20" x2="190" y2="20"
          stroke="#b0b0b0"
          strokeWidth="1.5"
          strokeDasharray="200"
          strokeDashoffset="200"
        />
        <polygon points="100,5 115,20 100,35 85,20" fill="none" stroke="#5eead4" strokeWidth="1" opacity="0.6" />
      </svg>

      <div className="mb-8 text-center">
        <h1 className="mb-1 text-4xl font-bold tracking-[0.3em] text-mono-paper md:text-5xl">
          NIPERX
        </h1>
        <p className="text-xs tracking-[0.4em] text-mono-gray">ISOMETRIC SKETCH LAB</p>
      </div>

      <div className="h-px w-64 overflow-hidden bg-mono-border md:w-80">
        <div ref={progressRef} className="h-full w-0 bg-mono-light" />
      </div>
    </div>
  );
}

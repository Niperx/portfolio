import { useEffect } from 'react';
import { Scene } from './components/scene/Scene';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { HUD } from './components/ui/HUD';
import { AboutPanel } from './components/ui/AboutPanel';
import { ContactPanel } from './components/ui/ContactPanel';
import { ProjectModal } from './components/ui/ProjectModal';
import { MobileGallery } from './components/ui/MobileGallery';
import { SEO } from './components/ui/SEO';
import { useDevice } from './hooks/useDevice';
import { usePortfolioStore } from './hooks/usePortfolioStore';

export default function App() {
  const { isMobile, dpr } = useDevice();
  const viewMode = usePortfolioStore((s) => s.viewMode);
  const setViewMode = usePortfolioStore((s) => s.setViewMode);
  const setControlMode = usePortfolioStore((s) => s.setControlMode);

  useEffect(() => {
    if (isMobile) {
      setViewMode('2d');
      setControlMode('explore');
    } else {
      setViewMode('3d');
      setControlMode('explore');
    }
  }, [isMobile, setViewMode, setControlMode]);

  const show3D = viewMode === '3d';

  return (
    <div className="relative h-full w-full">
      <SEO
        title="Niperx | Isometric Sketch Lab"
        description="Black & white low-poly isometric portfolio — bots, VPN, web apps."
      />

      <LoadingScreen />

      {isMobile && !show3D ? (
        <MobileGallery />
      ) : (
        <div className="absolute inset-0">
          <Scene isMobile={isMobile} dpr={dpr} />
        </div>
      )}

      <HUD isMobile={isMobile} show3D={show3D} />
      <AboutPanel />
      <ContactPanel />
      <ProjectModal />
    </div>
  );
}

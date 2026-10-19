import React, { useState, useEffect } from 'react';
import { Download, Sparkles, X, Smartphone, Check } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const PwaInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);

  useEffect(() => {
    // Check if app is already running in standalone PWA mode
    const checkStandalone = window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as any).standalone === true;
    setIsStandalone(checkStandalone);

    // Detect iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent) && !(window as any).MSStream;
    setIsIos(isIosDevice);

    // Check if dismissed before in session
    if (sessionStorage.getItem('lifequest_pwa_dismissed')) {
      setIsDismissed(true);
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    sounds.playClick();
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        sounds.playLevelUp();
        setDeferredPrompt(null);
      }
    } else if (isIos) {
      setShowIosGuide(true);
    }
  };

  const handleDismiss = () => {
    sounds.playClick();
    setIsDismissed(true);
    sessionStorage.setItem('lifequest_pwa_dismissed', 'true');
  };

  // If already installed in standalone mode, or dismissed, do not show
  if (isStandalone || isDismissed) return null;

  // If we don't have prompt and not on iOS, hide
  if (!deferredPrompt && !isIos) return null;

  return (
    <>
      {/* Floating Bottom PWA Install Banner */}
      <div className="fixed bottom-20 lg:bottom-6 right-4 z-40 max-w-sm w-[calc(100%-2rem)] sm:w-auto animate-slide-up">
        <div className="bg-slate-900/95 backdrop-blur-md text-white p-3.5 sm:p-4 rounded-3xl border border-white/20 shadow-2xl flex items-center justify-between gap-3 ring-1 ring-black/20">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-brand-500 flex items-center justify-center flex-shrink-0 shadow-tactile-green text-white font-black text-lg">
              ⚡
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-white truncate">Install LifeQuest</span>
                <span className="text-[9px] font-black uppercase px-1.5 py-0.2 bg-brand-400 text-slate-950 rounded-full">
                  PWA
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium truncate mt-0.5">
                {isIos ? 'Add to Home Screen for 100% full screen' : 'Fast, works offline with zero lag'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={handleInstallClick}
              className="btn-tactile-primary py-2 px-3.5 text-xs font-black gap-1.5 touch-manipulation whitespace-nowrap shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install</span>
            </button>
            <button
              onClick={handleDismiss}
              className="p-1.5 text-slate-400 hover:text-white rounded-xl touch-manipulation"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* iOS Safari Installation Guide Modal */}
      {showIosGuide && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
          onClick={() => setShowIosGuide(false)}
        >
          <div 
            className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border-2 border-slate-200 text-slate-900 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-brand-500 text-white flex items-center justify-center font-black">
                  📱
                </div>
                <h3 className="font-black text-base">Install on iPhone / iPad</h3>
              </div>
              <button 
                onClick={() => setShowIosGuide(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 font-medium">
              Safari on iOS lets you install LifeQuest to run in standalone fullscreen mode:
            </p>

            <ol className="space-y-3 text-xs font-semibold text-slate-700">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-900 flex-shrink-0">1</span>
                <span>Tap the <strong className="text-slate-900">Share</strong> button in Safari's bottom toolbar (<span className="font-mono text-brand-600">⎋</span>).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-900 flex-shrink-0">2</span>
                <span>Scroll down and tap <strong className="text-slate-900">Add to Home Screen</strong> (<span className="font-mono text-brand-600">⊞</span>).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-900 flex-shrink-0">3</span>
                <span>Tap <strong className="text-brand-600">Add</strong> in the top-right corner to launch with zero browser UI!</span>
              </li>
            </ol>

            <button
              onClick={() => setShowIosGuide(false)}
              className="w-full btn-tactile-primary py-2.5 text-xs font-black justify-center"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  );
};

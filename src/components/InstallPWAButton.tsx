import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const InstallPWAButton = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowBanner(false);
      toast({
        title: t('pwa.installed'),
        description: t('pwa.installDescription'),
      });
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [t, toast]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      setShowBanner(true);
      return;
    }

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } catch (error) {
      console.error('Error installing PWA:', error);
      toast({
        title: t('pwa.notSupported'),
        variant: 'destructive',
      });
    }
  };

  if (isInstalled) {
    return null;
  }

  return (
    <>
      <Button
        variant="default"
        size="sm"
        onClick={handleInstallClick}
        className="gap-2"
        aria-label={t('nav.install')}
      >
        <Download className="h-4 w-4" />
        <span className="hidden sm:inline">{t('nav.install')}</span>
      </Button>

      {showBanner && !deferredPrompt && (
        <Card className="fixed bottom-4 left-4 right-4 z-50 p-4 shadow-lg md:left-auto md:right-4 md:w-96">
          <button
            onClick={() => setShowBanner(false)}
            className="absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
            aria-label={t('pwa.dismiss')}
          >
            <X className="h-4 w-4" />
          </button>
          <div className="space-y-2">
            <h3 className="font-semibold">{t('pwa.install')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('pwa.installDescription')}
            </p>
            <div className="text-sm text-muted-foreground">
              <p className="font-medium">Desktop:</p>
              <p>Click the install icon in your browser's address bar</p>
              <p className="mt-2 font-medium">Mobile (Chrome/Edge):</p>
              <p>Tap menu (⋮) → "Install app" or "Add to Home Screen"</p>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

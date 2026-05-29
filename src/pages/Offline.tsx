import { useTranslation } from 'react-i18next';
import { WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Offline = () => {
  const { t } = useTranslation();

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <WifiOff className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="mb-4 text-3xl font-bold">{t('offline.title')}</h1>
        <p className="mb-8 text-lg text-muted-foreground">{t('offline.message')}</p>
        <Button onClick={handleRetry} size="lg">
          {t('offline.retry')}
        </Button>
      </div>
    </div>
  );
};

export default Offline;

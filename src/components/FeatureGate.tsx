import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useFlags } from '@/lib/queries';
import { Skeleton } from '@/components/ui/skeleton';

interface FeatureGateProps {
  flag: string;
  children: ReactNode;
}

export const FeatureGate = ({ flag, children }: FeatureGateProps) => {
  const { t } = useTranslation();
  const { data: flags, isLoading } = useFlags();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const isEnabled = flags?.[flag] === true;

  if (!isEnabled) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{t('feature.comingSoon')}</AlertTitle>
          <AlertDescription>
            {t('feature.notAvailable')}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <>{children}</>;
};

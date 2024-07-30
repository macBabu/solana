import './global.css';
import { AppLayout } from '@/components/ui/app-layout';
import { ClusterProvider } from '@/components/cluster/cluster-data-access';
import { SolanaProvider } from '@/components/solana/solana-provider';

export const metadata = {
  title: 'solana-dapp',
  description: 'Generated by create-solana-dapp',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClusterProvider>
          <SolanaProvider>
            <AppLayout>{children}</AppLayout>
          </SolanaProvider>
        </ClusterProvider>
      </body>
    </html>
  );
}

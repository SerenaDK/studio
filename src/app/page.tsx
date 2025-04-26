import { getApplixirAd, type ApplixirAd } from '@/services/applixir';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function Home() {
  let adData: ApplixirAd | null = null;
  let error: string | null = null;

  console.log('AdServerMVP: Requesting ad...'); // Basic server-side logging

  try {
    adData = await getApplixirAd();
    console.log('AdServerMVP: Ad received successfully.'); // Basic server-side logging
  } catch (e) {
    console.error('AdServerMVP: Error fetching ad:', e); // Basic server-side logging
    error = 'Failed to load ad. Please try again later.';
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-12 lg:p-24">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">Advertisment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video border rounded-md overflow-hidden flex items-center justify-center bg-secondary">
            {error ? (
              <p className="text-destructive text-center p-4">{error}</p>
            ) : adData ? (
              <div
                className="w-full h-full"
                dangerouslySetInnerHTML={{ __html: adData.adMarkup }}
                aria-live="polite" // Announce changes for screen readers
                role="advertisement"
              />
            ) : (
              <p className="text-muted-foreground">Loading ad...</p>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

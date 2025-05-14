'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Loader2, Sparkles } from 'lucide-react';
import { getStyleRecommendations } from '@/ai/flows/style-recommendation';
import type { Metadata } from 'next'; // Although not used by 'use client', useful if page becomes server component
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// export const metadata: Metadata = { // Cannot be used in client component
//   title: 'Style Assistant',
//   description: 'Get personalized sportswear and uniform recommendations from our AI.',
// };

export default function StyleAssistantPage() {
  const [preferences, setPreferences] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!preferences.trim()) {
      setError("Please describe your style preferences.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setRecommendations('');

    try {
      const result = await getStyleRecommendations({ preferences });
      setRecommendations(result.recommendations);
    } catch (err) {
      console.error("Error getting style recommendations:", err);
      setError('Sorry, something went wrong while generating recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto shadow-2xl">
        <CardHeader className="text-center">
          <Bot className="mx-auto h-16 w-16 text-primary mb-4" />
          <CardTitle className="text-3xl font-bold text-primary">AI Style Assistant</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Tell us about your style, preferred colors, and activities. Our AI will suggest the perfect sportswear or uniform for you!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Textarea
                placeholder="e.g., 'I love bright colors like electric blue and neon green. I need comfortable running gear for marathons, and also a sleek black soccer uniform for my team. Prefer breathable fabrics.'"
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                rows={5}
                className="text-base"
                disabled={isLoading}
              />
              {error && <p className="text-sm text-destructive mt-2">{error}</p>}
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Getting Recommendations...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Get Style Recommendations
                </>
              )}
            </Button>
          </form>
        </CardContent>
        {recommendations && (
          <CardFooter className="flex-col items-start gap-4 pt-6 border-t">
             <Alert className="bg-accent/20 border-accent/50">
              <Sparkles className="h-5 w-5 text-primary" />
              <AlertTitle className="font-semibold text-primary">Your Personalized Recommendations!</AlertTitle>
              <AlertDescription className="text-foreground whitespace-pre-line leading-relaxed">
                {recommendations}
              </AlertDescription>
            </Alert>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

'use server';

/**
 * @fileOverview Provides personalized style recommendations based on user preferences.
 *
 * - getStyleRecommendations - A function that returns personalized style recommendations.
 * - StyleRecommendationInput - The input type for the getStyleRecommendations function.
 * - StyleRecommendationOutput - The return type for the getStyleRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StyleRecommendationInputSchema = z.object({
  preferences: z
    .string()
    .describe(
      'A description of the user style preferences, including preferred colors, styles, and types of sportswear or uniforms.'
    ),
});

export type StyleRecommendationInput = z.infer<typeof StyleRecommendationInputSchema>;

const StyleRecommendationOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'Personalized style recommendations based on the user preferences, including specific product suggestions.'
    ),
});

export type StyleRecommendationOutput = z.infer<typeof StyleRecommendationOutputSchema>;

export async function getStyleRecommendations(
  input: StyleRecommendationInput
): Promise<StyleRecommendationOutput> {
  return styleRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'styleRecommendationPrompt',
  input: {schema: StyleRecommendationInputSchema},
  output: {schema: StyleRecommendationOutputSchema},
  prompt: `You are a personal style assistant for sportswear and uniforms. Based on the user's preferences, provide personalized style recommendations, including specific product suggestions.

User Preferences: {{{preferences}}}`,
});

const styleRecommendationFlow = ai.defineFlow(
  {
    name: 'styleRecommendationFlow',
    inputSchema: StyleRecommendationInputSchema,
    outputSchema: StyleRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

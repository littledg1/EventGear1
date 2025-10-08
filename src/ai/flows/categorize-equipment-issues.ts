'use server';

/**
 * @fileOverview This file defines a Genkit flow for categorizing equipment issues from support tickets,
 * assigning severity levels, and escalating high-severity issues.
 *
 * - categorizeEquipmentIssue - A function that categorizes equipment issues and assigns severity.
 * - CategorizeEquipmentIssueInput - The input type for the categorizeEquipmentIssue function.
 * - CategorizeEquipmentIssueOutput - The return type for the categorizeEquipmentIssue function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeEquipmentIssueInputSchema = z.object({
  issueReport: z
    .string()    
    .describe('The text of the equipment issue report from the support ticket.'),
});
export type CategorizeEquipmentIssueInput = z.infer<
  typeof CategorizeEquipmentIssueInputSchema
>;

const CategorizeEquipmentIssueOutputSchema = z.object({
  severity: z
    .enum(['low', 'medium', 'high'])
    .describe(
      'The severity level of the issue (low, medium, or high), based on the impact to the event.'
    ),
  category: z
    .string()
    .describe(
      'A short category name describing the issue (e.g. \'power\', \'connectivity\', \'physical damage\').'
    ),
  escalate: z
    .boolean()
    .describe(
      'A boolean value indicating whether the issue should be escalated for immediate attention.  Should be true if severity is high.'
    ),
});
export type CategorizeEquipmentIssueOutput = z.infer<
  typeof CategorizeEquipmentIssueOutputSchema
>;

export async function categorizeEquipmentIssue(
  input: CategorizeEquipmentIssueInput
): Promise<CategorizeEquipmentIssueOutput> {
  return categorizeEquipmentIssueFlow(input);
}

const categorizeEquipmentIssuePrompt = ai.definePrompt({
  name: 'categorizeEquipmentIssuePrompt',
  input: {schema: CategorizeEquipmentIssueInputSchema},
  output: {schema: CategorizeEquipmentIssueOutputSchema},
  prompt: `You are an expert equipment manager for a large event.
Your job is to categorize incoming equipment issue reports (support tickets) from staff, assign a severity level (low, medium, or high), determine a category, and determine if the issue needs to be escalated for immediate attention.

Here is the equipment issue report:
\"{{{issueReport}}}\"

Based on the issue report, determine the severity, category, and whether to escalate the issue. Escalate if the severity is high.  High severity issues are those that will cause significant disruption to the event.

Return the severity, category, and escalate values in the output schema.
`,
});

const categorizeEquipmentIssueFlow = ai.defineFlow(
  {
    name: 'categorizeEquipmentIssueFlow',
    inputSchema: CategorizeEquipmentIssueInputSchema,
    outputSchema: CategorizeEquipmentIssueOutputSchema,
  },
  async input => {
    const {output} = await categorizeEquipmentIssuePrompt(input);
    return output!;
  }
);

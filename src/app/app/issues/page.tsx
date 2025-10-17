'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorizeEquipmentIssue, CategorizeEquipmentIssueOutput } from '@/ai/flows/categorize-equipment-issues';
import { AppHeader } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { issues as mockIssues } from '@/lib/data';

const formSchema = z.object({
  issueReport: z.string().min(10, 'Please provide a detailed description of the issue.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function ManageIssuesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<CategorizeEquipmentIssueOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      issueReport: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    setError(null);
    setResult(null);
    try {
      const output = await categorizeEquipmentIssue({ issueReport: values.issueReport });
      setResult(output);
    } catch (e) {
      console.error(e);
      setError('Failed to categorize issue. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const getSeverityBadgeVariant = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Manage Issues" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Sparkles className="text-primary" />
                Categorize New Issue
              </CardTitle>
              <CardDescription>Describe an equipment issue to have AI categorize its severity and type.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="issueReport"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Issue Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., 'The headphones won't turn on even after charging. The power light is blinking red.'"
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Categorize Issue
                  </Button>
                </form>
              </Form>
              {result && (
                <Card className="mt-6 bg-card">
                  <CardHeader>
                    <CardTitle className="font-headline text-lg">AI Analysis Result</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Severity</span>
                      <Badge variant={getSeverityBadgeVariant(result.severity)} className="capitalize">{result.severity}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Category</span>
                      <Badge variant="outline" className="capitalize">{result.category}</Badge>
                    </div>
                    {result.escalate && (
                      <div className="flex items-center gap-2 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-destructive">
                        <AlertTriangle className="size-5" />
                        <span className="font-medium">This issue requires escalation!</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
               {error && (
                  <p className="mt-4 text-sm text-destructive">{error}</p>
                )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Reported Issues</CardTitle>
              <CardDescription>A list of all currently tracked equipment issues.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Equipment ID</TableHead>
                      <TableHead>Issue</TableHead>
                      <TableHead>Severity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockIssues.map((issue) => (
                      <TableRow key={issue.id}>
                        <TableCell className="font-mono text-xs">{issue.equipmentId}</TableCell>
                        <TableCell>{issue.description}</TableCell>
                        <TableCell>
                          <Badge variant={getSeverityBadgeVariant(issue.severity)} className="capitalize">{issue.severity}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}

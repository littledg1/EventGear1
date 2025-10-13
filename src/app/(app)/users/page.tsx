'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppHeader } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Trash2 } from 'lucide-react';
import { attendees } from '@/lib/data';

const formSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function UsersPage() {
  const [users, setUsers] = useState(attendees.slice(0, 2)); // Use some attendees as initial users
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  function onSubmit(values: FormValues) {
    const newUser = {
      id: `user-${Date.now()}`,
      name: values.username,
      email: `${values.username}@example.com`,
      phone: '',
      avatarUrl: `https://picsum.photos/seed/${values.username}/100/100`,
    };
    setUsers((prevUsers) => [...prevUsers, newUser]);
    toast({
      title: 'User Created',
      description: `User "${values.username}" has been successfully added.`,
    });
    form.reset();
  }
  
  function handleDeleteUser(userId: string) {
    setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
     toast({
      title: 'User Deleted',
      description: `The user has been removed.`,
      variant: 'destructive'
    });
  }

  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Manage Users" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Existing Users</CardTitle>
                <CardDescription>
                  List of all standard users with access to the app.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Username</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell className="text-right">
                             <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user.id)}>
                                <Trash2 className="size-4 text-destructive"/>
                                <span className="sr-only">Delete User</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <UserPlus />
                Add New User
              </CardTitle>
              <CardDescription>
                Create a new standard user account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="new_user" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Create User
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

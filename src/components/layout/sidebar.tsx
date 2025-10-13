'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CalendarClock,
  CheckCheck,
  Cog,
  Home,
  QrCode,
  Wrench,
  Users,
  PartyPopper,
  UserPlus,
  BarChart
} from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const menuItems = [
  { href: '/events', label: 'Events', icon: PartyPopper },
  { href: '/sessions', label: 'Set Session', icon: CalendarClock },
  { href: '/express-checkin', label: 'Express Check-in', icon: QrCode },
  { href: '/return-mode', label: 'Return Mode', icon: CheckCheck },
  { href: '/issues', label: 'Manage Issues', icon: Wrench },
  { href: '/event-stats', label: 'Event Stats', icon: BarChart },
  { href: '/settings', label: 'Settings', icon: Cog },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <Icons.logo className="size-8 text-primary" />
          <h1 className="font-headline text-xl font-semibold text-primary">
            EventGear
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.label, side: 'right' }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-3 p-3">
          <Avatar className="size-9">
            <AvatarImage src="https://picsum.photos/seed/user/100/100" alt="Admin" data-ai-hint="person portrait"/>
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-sidebar-foreground">Admin User</span>
            <span className="text-xs text-sidebar-foreground/70">Event Organizer</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

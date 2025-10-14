
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
  BarChart,
  ClipboardList,
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
import { useEffect, useState } from 'react';

const menuItems = [
  { href: '/events', label: 'Events', icon: PartyPopper },
  { href: '/sessions', label: 'Set Session', icon: CalendarClock },
  { href: '/express-checkin', label: 'Check Out', icon: QrCode },
  { href: '/return-mode', label: 'Return Mode', icon: CheckCheck },
  { href: '/outstanding', label: 'Outstanding', icon: ClipboardList },
  { href: '/issues', label: 'Manage Issues', icon: Wrench },
  { href: '/event-stats', label: 'Event Stats', icon: BarChart },
];

const adminMenuItems = [
    { href: '/users', label: 'Users', icon: Users },
]

const bottomMenuItems = [
    { href: '/settings', label: 'Settings', icon: Cog },
]

export function AppSidebar() {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Must be in useEffect to access localStorage on the client
    setUserRole(localStorage.getItem('userRole'));
  }, []);

  const allMenuItems = [
      ...menuItems,
      ...(userRole === 'admin' ? adminMenuItems : []),
      ...bottomMenuItems
  ]

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
          {userRole === 'admin' && adminMenuItems.map((item) => (
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
       <SidebarFooter className="mt-auto">
        <SidebarMenu>
            {bottomMenuItems.map((item) => (
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
        <div className="flex items-center gap-3 p-3">
          <Avatar className="size-9">
            <AvatarImage src="https://picsum.photos/seed/user/100/100" alt="Admin" data-ai-hint="person portrait"/>
            <AvatarFallback>{userRole === 'admin' ? 'AD' : 'GU'}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-sidebar-foreground">{userRole === 'admin' ? 'Admin User' : 'Guest User'}</span>
            <span className="text-xs text-sidebar-foreground/70">Event Organizer</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

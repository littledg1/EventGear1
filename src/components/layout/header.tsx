import { SidebarTrigger } from "@/components/ui/sidebar";

type AppHeaderProps = {
  title: string;
  children?: React.ReactNode;
};

export function AppHeader({ title, children }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden"/>
        <div className="flex items-center gap-4">
            <h1 className="font-headline text-2xl font-bold tracking-tight">
            {title}
            </h1>
            {children}
        </div>
      </div>
    </header>
  );
}

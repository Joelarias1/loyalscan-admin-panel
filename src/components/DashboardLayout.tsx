import * as React from "react";
import { SidebarProvider, SidebarInset, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SearchSmIcon, LayoutLeftIcon } from "@untitledui/icons-react/outline";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useNavigate } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const searchItems = [
  { title: "Dashboard", url: "/dashboard", category: "Principal" },
  { title: "Negocios", url: "/businesses", category: "Principal" },
  { title: "Clientes", url: "/customers", category: "Principal" },
  { title: "Tarjetas de Fidelidad", url: "/loyalty-cards", category: "Principal" },
  { title: "Ubicaciones", url: "/locations", category: "Principal" },
  { title: "Campañas", url: "/campaigns", category: "Marketing" },
  { title: "Mensajes Push", url: "/push-messages", category: "Marketing" },
  { title: "Analíticas", url: "/analytics", category: "Marketing" },
  { title: "Configuración", url: "/settings", category: "Sistema" },
];

function DashboardHeader({ onOpenSearch }: { onOpenSearch: () => void }) {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <header className="px-6 pt-4 pb-3 flex items-center gap-3">
      <AnimatePresence>
        {collapsed && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 shrink-0"
              onClick={toggleSidebar}
            >
              <LayoutLeftIcon className="h-4 w-4 rotate-180" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={onOpenSearch}
        className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground bg-white/80 hover:bg-white border border-border/50 rounded-lg shadow-sm transition-colors flex-1 max-w-md"
      >
        <SearchSmIcon className="h-4 w-4" />
        <span className="flex-1 text-left">Buscar...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
    </header>
  );
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (url: string) => {
    setOpen(false);
    navigate(url);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-sidebar-background">
        <AppSidebar />
        {/* SidebarInset transparente para mantener el fondo gris */}
        <SidebarInset className="flex flex-col flex-1 p-0 bg-transparent">

          {/* Top Header - Search bar with collapse toggle */}
          <DashboardHeader onOpenSearch={() => setOpen(true)} />

          {/* Main Content - Floating White Card */}
          <div className="flex-1 flex flex-col overflow-hidden mx-4 mb-4 rounded-xl bg-white shadow-sm border border-border/40">
            <div className="flex-1 overflow-auto p-6">
              {children}
            </div>
          </div>

        </SidebarInset>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Buscar páginas..." />
        <CommandList>
          <CommandEmpty>No se encontraron resultados.</CommandEmpty>
          <CommandGroup heading="Principal">
            {searchItems
              .filter((item) => item.category === "Principal")
              .map((item) => (
                <CommandItem
                  key={item.url}
                  onSelect={() => handleSelect(item.url)}
                >
                  {item.title}
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandGroup heading="Marketing">
            {searchItems
              .filter((item) => item.category === "Marketing")
              .map((item) => (
                <CommandItem
                  key={item.url}
                  onSelect={() => handleSelect(item.url)}
                >
                  {item.title}
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandGroup heading="Sistema">
            {searchItems
              .filter((item) => item.category === "Sistema")
              .map((item) => (
                <CommandItem
                  key={item.url}
                  onSelect={() => handleSelect(item.url)}
                >
                  {item.title}
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </SidebarProvider>
  );
}

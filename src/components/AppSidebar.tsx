
import {
  LayoutGrid01Icon,
  Users01Icon,
  Building02Icon,
  LogOut01Icon,
  LayoutLeftIcon,
} from "@untitledui/icons-react/outline";
import { Clock } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const mainNavItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutGrid01Icon },
  { title: "Negocios", url: "/businesses", icon: Building02Icon },
  { title: "Pruebas Gratuitas", url: "/trials", icon: Clock },
];

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const { signOut, user } = useAuth();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-none bg-sidebar-background">
      {collapsed ? (
        <div className="h-14" />
      ) : (
        <SidebarHeader className="h-14 flex flex-row items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <img
              src="/logo.svg"
              alt="Logo"
              className="h-8 w-8 object-contain"
            />
            <span className="font-bold text-lg tracking-tight">LoyalScan</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={toggleSidebar}
          >
            <LayoutLeftIcon className="h-4 w-4" />
          </Button>
        </SidebarHeader>
      )}

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2">
            Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 mt-auto">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-white border border-border/50 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
            <Users01Icon className="w-4 h-4 text-primary" />
          </div>
          {!collapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium truncate">
                {user?.email?.split('@')[0] || 'Admin'}
              </span>
              <span className="text-xs opacity-70 truncate">
                {user?.email || 'admin@loyalscan.com'}
              </span>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size={collapsed ? "icon" : "default"}
          className={`${collapsed ? 'w-8 h-8 mx-auto' : 'w-full justify-start gap-3'} hover:text-red-400`}
          onClick={signOut}
        >
          <LogOut01Icon className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span>Cerrar Sesión</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

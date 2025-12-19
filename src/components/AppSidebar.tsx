
import {
  LayoutGrid01Icon,
  Users01Icon,
  CreditCard01Icon,
  Building02Icon,
  MarkerPin01Icon,
  Settings01Icon,
  LogOut01Icon,
  Bell01Icon,
  BarChart01Icon,
  Mail01Icon,
  LayoutLeftIcon,
} from "@untitledui/icons-react/outline";
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
  { title: "Clientes", url: "/customers", icon: Users01Icon },
  { title: "Tarjetas de Fidelidad", url: "/loyalty-cards", icon: CreditCard01Icon },
  { title: "Ubicaciones", url: "/locations", icon: MarkerPin01Icon },
];

const marketingItems = [
  { title: "Campañas", url: "/campaigns", icon: Mail01Icon },
  { title: "Mensajes Push", url: "/push-messages", icon: Bell01Icon },
  { title: "Analíticas", url: "/analytics", icon: BarChart01Icon },
];

const systemItems = [
  { title: "Configuración", url: "/settings", icon: Settings01Icon },
];

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const { signOut, user } = useAuth();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-none bg-sidebar-background">
      <SidebarHeader className="px-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-between w-full">
              <SidebarMenuButton tooltip="LoyalScan" className="h-10 flex-1">
                <img
                  src="/logo.svg"
                  alt="Logo"
                  className="h-6 w-6 object-contain"
                />
                <span className="font-bold text-base tracking-tight">LoyalScan</span>
              </SidebarMenuButton>
              {!collapsed && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  onClick={toggleSidebar}
                >
                  <LayoutLeftIcon className="h-4 w-4" />
                </Button>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

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

        <SidebarGroup>
          <SidebarGroupLabel className="px-2">
            Marketing
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {marketingItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
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

        <SidebarGroup>
          <SidebarGroupLabel className="px-2">
            Sistema
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
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

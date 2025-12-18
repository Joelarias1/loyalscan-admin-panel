
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CreditCard, Store, TrendingUp } from "lucide-react";
import { useBusinessStats } from "@/features/control-panel/business/hooks/useBusinessStats";

const Index = () => {
  const { data: bStats, isLoading: bLoading } = useBusinessStats("production");

  const stats = [
    {
      title: "Total de Negocios",
      value: bLoading ? "..." : bStats?.total ?? 0,
      description: "Negocios registrados",
      icon: Store,
    },
    {
      title: "Negocios Activos",
      value: bLoading ? "..." : bStats?.active ?? 0,
      description: "Suscripciones pagas",
      icon: TrendingUp,
    },
    {
      title: "Total de Clientes",
      value: "—",
      description: "Próximamente",
      icon: Users,
    },
    {
      title: "Tarjetas activas",
      value: "—",
      description: "Próximamente",
      icon: CreditCard,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Bienvenido de nuevo</h2>
          <p className="text-muted-foreground">
            Aquí tienes un resumen de tu plataforma LoyalScan.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="hover:shadow-md transition-shadow border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <CardDescription className="text-xs">
                  {stat.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
              <CardDescription>Últimas actividades en la plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">No hay actividad reciente</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
              <CardDescription>Tareas administrativas comunes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Selecciona una opción de la barra lateral</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;

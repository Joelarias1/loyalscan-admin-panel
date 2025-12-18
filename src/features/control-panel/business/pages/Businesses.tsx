import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Store, CreditCard, XCircle, Clock } from "lucide-react";
import { useBusinessStats, SubscriptionEnvironment } from "../hooks/useBusinessStats";
import { useBusinesses } from "../hooks/useBusinesses";
import { BusinessTable } from "../components/BusinessTable";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Businesses = () => {
  const [env, setEnv] = useState<SubscriptionEnvironment>("production");
  const { data: stats, isLoading: statsLoading } = useBusinessStats(env);
  const { data: businesses, isLoading: businessesLoading } = useBusinesses(env);

  const cards = [
    {
      title: "Negocios Totales",
      value: stats?.total ?? 0,
      description: "Registrados en la plataforma",
      icon: Store,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Negocios Activos",
      value: stats?.active ?? 0,
      description: "Suscripción de pago activa",
      icon: CreditCard,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Planes Cancelados",
      value: stats?.canceled ?? 0,
      description: "Suscripción terminada",
      icon: XCircle,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
    {
      title: "Cuentas en Trial",
      value: stats?.trial ?? 0,
      description: "Periodo de prueba",
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <DashboardLayout title="Negocios">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Gestión de Negocios</h2>
            <p className="text-muted-foreground">
              Monitorea y administra todos los negocios registrados.
            </p>
          </div>

          <Tabs 
            value={env} 
            onValueChange={(v) => setEnv(v as SubscriptionEnvironment)}
            className="w-full md:w-auto"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="production">Producción</TabsTrigger>
              <TabsTrigger value="test">Stripe Test</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${card.bg}`}>
                    <card.icon className={`h-4 w-4 ${card.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">
                    {statsLoading ? "..." : card.value}
                  </div>
                  <CardDescription className="text-xs mt-1">
                    {card.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="border-none shadow-sm overflow-hidden">
          <CardHeader className="pb-0">
            <CardTitle>Listado de Negocios</CardTitle>
            <CardDescription>
              Detalle completo de los negocios en el entorno de {env}.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 mt-4">
            <BusinessTable data={businesses || []} isLoading={businessesLoading} isTestMode={env === "test"} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Businesses;

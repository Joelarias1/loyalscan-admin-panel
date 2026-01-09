import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CreditCard, AlertTriangle, CheckCircle2, XCircle, FlaskConical } from "lucide-react";
import { useTrialStats } from "../hooks/useTrialStats";
import { useTrials } from "../hooks/useTrials";
import { TrialTable } from "../components/TrialTable";
import { motion } from "motion/react";
import { useState } from "react";

type StripeMode = "live" | "test";

const Trials = () => {
  const [mode, setMode] = useState<StripeMode>("live");
  const { data: stats, isLoading: statsLoading } = useTrialStats(mode);
  const { data: trials, isLoading: trialsLoading, refetch, isFetching } = useTrials(mode);

  const cards = [
    {
      title: "Total Trials",
      value: stats?.total ?? 0,
      description: "Pruebas gratuitas registradas",
      icon: Clock,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Activos",
      value: stats?.active ?? 0,
      description: "En periodo de prueba",
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Con Tarjeta",
      value: stats?.withCard ?? 0,
      description: "Auto-cobro al expirar",
      icon: CreditCard,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      title: "Sin Tarjeta",
      value: stats?.withoutCard ?? 0,
      description: "Requiere pago manual",
      icon: AlertTriangle,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Expirados",
      value: stats?.expired ?? 0,
      description: "Sin conversión",
      icon: XCircle,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Pruebas Gratuitas</h2>
            <p className="text-gray-500">
              Monitorea todas las cuentas en periodo de prueba.
            </p>
          </div>
          <Tabs value={mode} onValueChange={(v) => setMode(v as StripeMode)}>
            <TabsList>
              <TabsTrigger value="live" className="gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Producción
              </TabsTrigger>
              <TabsTrigger value="test" className="gap-2">
                <FlaskConical className="h-4 w-4" />
                Test
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="stat-card">
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

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-100 bg-white pb-6">
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Listado de Pruebas Gratuitas
              </CardTitle>
              {mode === "test" && (
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-md">
                  <FlaskConical className="h-3 w-3" />
                  Modo Test
                </span>
              )}
            </div>
            <CardDescription className="text-gray-600 mt-1">
              Negocios en trial ordenados por días restantes.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <TrialTable
              data={trials || []}
              isLoading={trialsLoading}
              onRefresh={() => refetch()}
              isRefreshing={isFetching && !trialsLoading}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Trials;

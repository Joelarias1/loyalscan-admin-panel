import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, FlaskConical, CreditCard, Layers, Wallet, Users, Scan } from "lucide-react";
import { useLoyaltyCards } from "../hooks/useLoyaltyCards";
import { LoyaltyCardsTable } from "../components/LoyaltyCardsTable";
import { motion } from "motion/react";
import { useState, useMemo } from "react";

type StripeMode = "live" | "test";

const LoyaltyCards = () => {
  const [mode, setMode] = useState<StripeMode>("live");
  const { data: loyaltyCards, isLoading } = useLoyaltyCards(mode);

  // Calculate stats from data
  const stats = useMemo(() => {
    if (!loyaltyCards) return { total: 0, stamps: 0, levels: 0, prepaid: 0, totalCustomers: 0, totalScans: 0 };

    return {
      total: loyaltyCards.length,
      stamps: loyaltyCards.filter(c => c.rewardsType === "stamps").length,
      levels: loyaltyCards.filter(c => c.rewardsType === "levels").length,
      prepaid: loyaltyCards.filter(c => c.rewardsType === "prepaid").length,
      totalCustomers: loyaltyCards.reduce((sum, c) => sum + c.customerCount, 0),
      totalScans: loyaltyCards.reduce((sum, c) => sum + c.transactionCount, 0),
    };
  }, [loyaltyCards]);

  const cards = [
    {
      title: "Total Clubs",
      value: stats.total,
      description: "Clubs activos",
      icon: CreditCard,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Estampillas",
      value: stats.stamps,
      description: "Tipo estampillas",
      icon: CreditCard,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      title: "Niveles",
      value: stats.levels,
      description: "Tipo niveles",
      icon: Layers,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Prepago",
      value: stats.prepaid,
      description: "Tipo prepago",
      icon: Wallet,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Clientes",
      value: stats.totalCustomers,
      description: "Total registrados",
      icon: Users,
      color: "text-gray-600",
      bg: "bg-gray-50",
    },
    {
      title: "Escaneos",
      value: stats.totalScans,
      description: "Total transacciones",
      icon: Scan,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Tarjetas de Fidelidad</h2>
            <p className="text-gray-500">
              Todos los clubs de fidelidad activos en la plataforma.
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

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
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
                    {isLoading ? "..." : card.value}
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
                Listado de Clubs
              </CardTitle>
              {mode === "test" && (
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-md">
                  <FlaskConical className="h-3 w-3" />
                  Modo Test
                </span>
              )}
            </div>
            <CardDescription className="text-gray-600 mt-1">
              Clubs de fidelidad ordenados por fecha de creación.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <LoyaltyCardsTable data={loyaltyCards || []} isLoading={isLoading} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LoyaltyCards;

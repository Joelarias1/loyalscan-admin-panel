import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, CheckCircle2, XCircle } from "lucide-react";

interface BusinessTableProps {
  data: any[];
  isLoading: boolean;
  isTestMode?: boolean;
}

// Helper to format plan names (remove _test suffix, capitalize)
const formatPlanName = (planName: string): string => {
  if (!planName) return "";
  // Remove _test suffix
  let formatted = planName.replace(/_test$/i, "");
  // Capitalize first letter of each word
  formatted = formatted
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
  return formatted;
};

export const BusinessTable = ({ data, isLoading, isTestMode = false }: BusinessTableProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns = [
    {
      accessorKey: "name",
      header: "Nombre negocio",
      cell: ({ row }: any) => (
        <span className="font-bold text-foreground">{row.getValue("name")}</span>
      ),
    },
    {
      accessorKey: "email",
      header: "Email dueño",
      cell: ({ row }: any) => (
        <span className="text-sm text-muted-foreground">{row.getValue("email") || "—"}</span>
      ),
    },
    {
      accessorKey: "payment_status",
      header: "Estado pago",
      cell: ({ row }: any) => {
        const status = row.getValue("payment_status");
        let variant: "default" | "outline" | "destructive" | "secondary" = "outline";
        let label = status;
        let className = "font-medium px-3";

        if (status === "trialing") {
          variant = "outline";
          label = "TRIAL";
          className = "bg-amber-50 text-amber-700 border-amber-200 font-bold px-3";
        } else if (status === "paid" || status === "active") {
          variant = "default";
          label = isTestMode ? "Pagado (Test)" : "Pagado";
        } else if (status === "no_payment") {
          variant = "secondary";
          label = "Sin pago aún";
        } else if (status === "canceled" || status === "unpaid") {
          variant = "destructive";
          label = "Cancelado";
        }

        return <Badge variant={variant} className={className}>{label}</Badge>;
      },
    },
    {
      accessorKey: "is_trial",
      header: "Trial?",
      cell: ({ row }: any) => {
        const isTrial = row.getValue("is_trial");
        return (
          <div className="flex items-center gap-2">
            {isTrial ? (
              <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">
                <CheckCircle2 className="h-3 w-3 mr-1" /> SÍ
              </Badge>
            ) : (
              <Badge variant="outline" className="text-muted-foreground border-muted">
                <XCircle className="h-3 w-3 mr-1" /> NO
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      id: "plan",
      header: "Plan",
      cell: ({ row }: any) => {
        const planName = row.original.planName;
        const planPrice = row.original.planPrice;
        const subscriptionType = row.original.subscriptionType;

        // Si no tiene plan, mostrar "Sin plan"
        if (!planName) {
          return <span className="text-muted-foreground italic text-sm">Sin plan</span>;
        }

        // Si es trial (sin tarjeta)
        if (subscriptionType === 'trial' || planName.toLowerCase().includes("trial")) {
          return (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 font-bold">
              TRIAL
            </Badge>
          );
        }

        // Si es demo
        if (planName.toLowerCase().includes("demo")) {
          return (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-bold">
              DEMO
            </Badge>
          );
        }

        // Format plan name (remove _test, capitalize)
        const formattedPlanName = formatPlanName(planName);

        // Mostrar nombre del plan con precio
        return (
          <div className="flex flex-col">
            <span className="font-medium text-sm">{formattedPlanName}</span>
            {planPrice && (
              <span className="text-xs text-muted-foreground">{planPrice}</span>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: () => (
        <div className="flex justify-end pr-4">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  if (isLoading) {
    return (
      <div className="w-full h-48 flex items-center justify-center text-muted-foreground italic bg-white rounded-md border">
        Cargando negocios...
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/30 text-xs">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-b">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="font-bold text-foreground/80 h-10 px-6 uppercase tracking-wider">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/5 transition-colors border-b last:border-0 h-16">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-2 px-6">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center text-muted-foreground font-medium">
                  No se encontraron negocios.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4 px-6 border-t bg-muted/5">
        <div className="text-xs font-bold text-muted-foreground uppercase">
          Total: {data.length} resultados
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-8 px-4 text-[10px] font-black"
          >
            ATRAS
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="h-8 px-4 text-[10px] font-black"
          >
            SIGUIENTE
          </Button>
        </div>
      </div>
    </div>
  );
};

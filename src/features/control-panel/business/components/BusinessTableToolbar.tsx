import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TableExport } from "@/components/TableExport";
import { Table } from "@tanstack/react-table";
import { CircleX, Columns3, Filter, ListFilter, Package, RefreshCw } from "lucide-react";
import { RefObject } from "react";
import { Business } from "../types";
import { getPlanDisplayName, NO_PLAN_VALUE } from "../plans";
import { getComputedStatusLabel } from "../utils";
import { businessExportColumns } from "../export-columns";
import { cn } from "@/lib/utils";

interface BusinessTableToolbarProps {
  table: Table<Business>;
  data: Business[];
  inputRef: RefObject<HTMLInputElement>;
  id: string;
  isTestMode: boolean;
  selectedStatuses: string[];
  uniqueStatusValues: string[];
  statusCounts: Map<any, any>;
  onStatusChange: (checked: boolean, value: string) => void;
  selectedPlans: string[];
  uniquePlanValues: string[];
  planCounts: Map<any, any>;
  onPlanChange: (checked: boolean, value: string) => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function BusinessTableToolbar({
  table,
  data,
  inputRef,
  id,
  isTestMode,
  selectedStatuses,
  uniqueStatusValues,
  statusCounts,
  onStatusChange,
  selectedPlans,
  uniquePlanValues,
  planCounts,
  onPlanChange,
  onRefresh,
  isRefreshing,
}: BusinessTableToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        {/* Filter by name or email */}
        <div className="relative">
          <Input
            id={`${id}-input`}
            ref={inputRef}
            className={cn(
              "peer min-w-60 ps-9",
              Boolean(table.getColumn("name")?.getFilterValue()) && "pe-9",
            )}
            value={(table.getColumn("name")?.getFilterValue() ?? "") as string}
            onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
            placeholder="Buscar por nombre o email..."
            type="text"
            aria-label="Buscar por nombre o email"
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <ListFilter size={16} strokeWidth={2} aria-hidden="true" />
          </div>
          {Boolean(table.getColumn("name")?.getFilterValue()) && (
            <button
              className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Limpiar filtro"
              onClick={() => {
                table.getColumn("name")?.setFilterValue("");
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
            >
              <CircleX size={16} strokeWidth={2} aria-hidden="true" />
            </button>
          )}
        </div>
        {/* Filter by status */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Filter
                className="-ms-1 me-2 opacity-60"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              Estado
              {selectedStatuses.length > 0 && (
                <span className="-me-1 ms-3 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
                  {selectedStatuses.length}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="min-w-36 p-3" align="start">
            <div className="space-y-3">
              <div className="text-xs font-medium text-muted-foreground">Filtros</div>
              <div className="space-y-3">
                {uniqueStatusValues.map((value, i) => (
                  <div key={value} className="flex items-center gap-2">
                    <Checkbox
                      id={`${id}-status-${i}`}
                      checked={selectedStatuses.includes(value)}
                      onCheckedChange={(checked: boolean) => onStatusChange(checked, value)}
                    />
                    <Label
                      htmlFor={`${id}-status-${i}`}
                      className="flex grow justify-between gap-2 font-normal"
                    >
                      {getComputedStatusLabel(value)}
                      <span className="ms-2 text-xs text-muted-foreground">
                        {statusCounts.get(value)}
                      </span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
        {/* Filter by plan */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Package
                className="-ms-1 me-2 opacity-60"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              Plan
              {selectedPlans.length > 0 && (
                <span className="-me-1 ms-3 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
                  {selectedPlans.length}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="min-w-36 p-3" align="start">
            <div className="space-y-3">
              <div className="text-xs font-medium text-muted-foreground">Planes</div>
              <div className="space-y-3">
                {uniquePlanValues.map((value, i) => (
                  <div key={value} className="flex items-center gap-2">
                    <Checkbox
                      id={`${id}-plan-${i}`}
                      checked={selectedPlans.includes(value)}
                      onCheckedChange={(checked: boolean) => onPlanChange(checked, value)}
                    />
                    <Label
                      htmlFor={`${id}-plan-${i}`}
                      className="flex grow justify-between gap-2 font-normal"
                    >
                      {value === NO_PLAN_VALUE ? "Sin plan" : getPlanDisplayName(value, isTestMode)}
                      <span className="ms-2 text-xs text-muted-foreground">
                        {planCounts.get(value)}
                      </span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
        {/* Toggle columns visibility */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Columns3
                className="-ms-1 me-2 opacity-60"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              Vista
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Columnas visibles</DropdownMenuLabel>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                const columnLabels: Record<string, string> = {
                  payment_status: "Estado Plan",
                  planName: "Plan",
                  implementation: "Progreso",
                  customerCount: "Clientes",
                  transactionCount: "Escaneos",
                  totalRevenue: "Ingresos",
                  currentPeriodEnd: "Próximo Pago",
                  canceledAt: "Cancelación",
                  created_at: "Registro",
                };
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    onSelect={(event) => event.preventDefault()}
                  >
                    {columnLabels[column.id] || column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center gap-3">
        {/* Export */}
        <TableExport
          data={data}
          columns={businessExportColumns}
          filename="negocios"
        />
        {/* Refresh button */}
        {onRefresh && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            title="Actualizar datos"
          >
            <RefreshCw
              className={cn("h-4 w-4", isRefreshing && "animate-spin")}
              aria-hidden="true"
            />
            <span className="sr-only">Actualizar</span>
          </Button>
        )}
      </div>
    </div>
  );
}

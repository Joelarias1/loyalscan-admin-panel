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
import { Table } from "@tanstack/react-table";
import { CircleX, Columns3, Filter, ListFilter } from "lucide-react";
import { RefObject } from "react";
import { LoyaltyCard } from "../types";
import { getRewardsTypeLabel } from "../utils";
import { cn } from "@/lib/utils";

interface LoyaltyCardTableToolbarProps {
  table: Table<LoyaltyCard>;
  inputRef: RefObject<HTMLInputElement>;
  id: string;
  selectedTypes: string[];
  uniqueTypeValues: string[];
  typeCounts: Map<any, any>;
  onTypeChange: (checked: boolean, value: string) => void;
}

export function LoyaltyCardTableToolbar({
  table,
  inputRef,
  id,
  selectedTypes,
  uniqueTypeValues,
  typeCounts,
  onTypeChange,
}: LoyaltyCardTableToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Filter by name or business */}
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
          placeholder="Buscar por nombre o negocio..."
          type="text"
          aria-label="Buscar por nombre o negocio"
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
      {/* Filter by type */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Filter
              className="-ms-1 me-2 opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            Tipo
            {selectedTypes.length > 0 && (
              <span className="-me-1 ms-3 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
                {selectedTypes.length}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-36 p-3" align="start">
          <div className="space-y-3">
            <div className="text-xs font-medium text-muted-foreground">Tipos</div>
            <div className="space-y-3">
              {uniqueTypeValues.map((value, i) => (
                <div key={value} className="flex items-center gap-2">
                  <Checkbox
                    id={`${id}-type-${i}`}
                    checked={selectedTypes.includes(value)}
                    onCheckedChange={(checked: boolean) => onTypeChange(checked, value)}
                  />
                  <Label
                    htmlFor={`${id}-type-${i}`}
                    className="flex grow justify-between gap-2 font-normal"
                  >
                    {getRewardsTypeLabel(value as any).label}
                    <span className="ms-2 text-xs text-muted-foreground">
                      {typeCounts.get(value)}
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
                rewardsType: "Tipo",
                totalRevenue: "Ingresos",
                customerCount: "Clientes",
                transactionCount: "Escaneos",
                createdAt: "Creación",
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
  );
}

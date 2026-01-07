import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useId, useMemo, useRef, useState } from "react";
import { Business } from "../types";
import { createColumns } from "./BusinessTableColumns";
import { BusinessTablePagination } from "./BusinessTablePagination";
import { BusinessTableSkeleton } from "./BusinessTableSkeleton";
import { BusinessTableToolbar } from "./BusinessTableToolbar";

interface BusinessTableProps {
  data: Business[];
  isLoading: boolean;
  isTestMode?: boolean;
}

export const BusinessTable = ({ data, isLoading, isTestMode = false }: BusinessTableProps) => {
  const id = useId();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [rowSelection, setRowSelection] = useState({});
  const inputRef = useRef<HTMLInputElement>(null);

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "created_at",
      desc: true,
    },
  ]);

  const columns = useMemo(() => createColumns(isTestMode), [isTestMode]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // Get unique status values
  const uniqueStatusValues = useMemo(() => {
    const statusColumn = table.getColumn("payment_status");
    if (!statusColumn) return [];
    const values = Array.from(statusColumn.getFacetedUniqueValues().keys());
    return values.sort();
  }, [table.getColumn("payment_status")?.getFacetedUniqueValues()]);

  // Get counts for each status
  const statusCounts = useMemo(() => {
    const statusColumn = table.getColumn("payment_status");
    if (!statusColumn) return new Map();
    return statusColumn.getFacetedUniqueValues();
  }, [table.getColumn("payment_status")?.getFacetedUniqueValues()]);

  const selectedStatuses = useMemo(() => {
    const filterValue = table.getColumn("payment_status")?.getFilterValue() as string[];
    return filterValue ?? [];
  }, [table.getColumn("payment_status")?.getFilterValue()]);

  const handleStatusChange = (checked: boolean, value: string) => {
    const filterValue = table.getColumn("payment_status")?.getFilterValue() as string[];
    const newFilterValue = filterValue ? [...filterValue] : [];

    if (checked) {
      newFilterValue.push(value);
    } else {
      const index = newFilterValue.indexOf(value);
      if (index > -1) {
        newFilterValue.splice(index, 1);
      }
    }

    table.getColumn("payment_status")?.setFilterValue(newFilterValue.length ? newFilterValue : undefined);
  };

  // Get unique plan values (including null for "no plan")
  const uniquePlanValues = useMemo(() => {
    const planColumn = table.getColumn("planName");
    if (!planColumn) return [];
    const facetedValues = planColumn.getFacetedUniqueValues();
    const values = Array.from(facetedValues.keys()).filter((v) => v !== null && v !== undefined) as string[];
    // Check if there are any null/undefined values (businesses without plans)
    const hasNoPlan = data.some((b) => !b.planName);
    if (hasNoPlan) {
      values.unshift("__no_plan__");
    }
    return values.sort((a, b) => {
      if (a === "__no_plan__") return -1;
      if (b === "__no_plan__") return 1;
      return a.localeCompare(b);
    });
  }, [table.getColumn("planName")?.getFacetedUniqueValues(), data]);

  // Get counts for each plan
  const planCounts = useMemo(() => {
    const planColumn = table.getColumn("planName");
    if (!planColumn) return new Map();
    const facetedValues = planColumn.getFacetedUniqueValues();
    const counts = new Map(facetedValues);
    // Count businesses without plans
    const noPlanCount = data.filter((b) => !b.planName).length;
    if (noPlanCount > 0) {
      counts.set("__no_plan__", noPlanCount);
    }
    return counts;
  }, [table.getColumn("planName")?.getFacetedUniqueValues(), data]);

  const selectedPlans = useMemo(() => {
    const filterValue = table.getColumn("planName")?.getFilterValue() as string[];
    return filterValue ?? [];
  }, [table.getColumn("planName")?.getFilterValue()]);

  const handlePlanChange = (checked: boolean, value: string) => {
    const filterValue = table.getColumn("planName")?.getFilterValue() as string[];
    const newFilterValue = filterValue ? [...filterValue] : [];

    if (checked) {
      newFilterValue.push(value);
    } else {
      const index = newFilterValue.indexOf(value);
      if (index > -1) {
        newFilterValue.splice(index, 1);
      }
    }

    table.getColumn("planName")?.setFilterValue(newFilterValue.length ? newFilterValue : undefined);
  };

  if (isLoading) {
    return <BusinessTableSkeleton />;
  }

  return (
    <div className="space-y-4">
      <BusinessTableToolbar
        table={table}
        inputRef={inputRef}
        id={id}
        isTestMode={isTestMode}
        selectedStatuses={selectedStatuses}
        uniqueStatusValues={uniqueStatusValues}
        statusCounts={statusCounts}
        onStatusChange={handleStatusChange}
        selectedPlans={selectedPlans}
        uniquePlanValues={uniquePlanValues}
        planCounts={planCounts}
        onPlanChange={handlePlanChange}
      />

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <Table className="table-fixed min-w-[1200px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-b border-gray-200 bg-gray-50">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                      className="h-12 font-semibold text-gray-700"
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <div
                          className={cn(
                            header.column.getCanSort() &&
                              "flex h-full cursor-pointer select-none items-center justify-between gap-2",
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={(e) => {
                            if (
                              header.column.getCanSort() &&
                              (e.key === "Enter" || e.key === " ")
                            ) {
                              e.preventDefault();
                              header.column.getToggleSortingHandler()?.(e);
                            }
                          }}
                          tabIndex={header.column.getCanSort() ? 0 : undefined}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: (
                              <ChevronUp
                                className="shrink-0 opacity-60"
                                size={16}
                                strokeWidth={2}
                                aria-hidden="true"
                              />
                            ),
                            desc: (
                              <ChevronDown
                                className="shrink-0 opacity-60"
                                size={16}
                                strokeWidth={2}
                                aria-hidden="true"
                              />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors data-[state=selected]:bg-blue-50/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4 last:py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
                  No se encontraron negocios.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <BusinessTablePagination table={table} id={id} />
    </div>
  );
};

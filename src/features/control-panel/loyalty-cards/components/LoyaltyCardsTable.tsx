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
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { useId, useMemo, useRef, useState } from "react";
import { LoyaltyCard } from "../types";
import { createColumns } from "./LoyaltyCardTableColumns";
import { LoyaltyCardTablePagination } from "./LoyaltyCardTablePagination";
import { LoyaltyCardTableSkeleton } from "./LoyaltyCardTableSkeleton";
import { LoyaltyCardTableToolbar } from "./LoyaltyCardTableToolbar";

interface LoyaltyCardsTableProps {
  data: LoyaltyCard[];
  isLoading: boolean;
}

export const LoyaltyCardsTable = ({ data, isLoading }: LoyaltyCardsTableProps) => {
  const id = useId();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "totalRevenue",
      desc: true, // Show highest revenue first
    },
  ]);

  const columns = useMemo(() => createColumns(), []);

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
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
    },
  });

  // Get unique type values
  const uniqueTypeValues = useMemo(() => {
    const typeColumn = table.getColumn("rewardsType");
    if (!typeColumn) return [];
    const values = Array.from(typeColumn.getFacetedUniqueValues().keys());
    return values.filter(Boolean).sort();
  }, [table.getColumn("rewardsType")?.getFacetedUniqueValues()]);

  // Get counts for each type
  const typeCounts = useMemo(() => {
    const typeColumn = table.getColumn("rewardsType");
    if (!typeColumn) return new Map();
    return typeColumn.getFacetedUniqueValues();
  }, [table.getColumn("rewardsType")?.getFacetedUniqueValues()]);

  const selectedTypes = useMemo(() => {
    const filterValue = table.getColumn("rewardsType")?.getFilterValue() as string[];
    return filterValue ?? [];
  }, [table.getColumn("rewardsType")?.getFilterValue()]);

  const handleTypeChange = (checked: boolean, value: string) => {
    const filterValue = table.getColumn("rewardsType")?.getFilterValue() as string[];
    const newFilterValue = filterValue ? [...filterValue] : [];

    if (checked) {
      newFilterValue.push(value);
    } else {
      const index = newFilterValue.indexOf(value);
      if (index > -1) {
        newFilterValue.splice(index, 1);
      }
    }

    table.getColumn("rewardsType")?.setFilterValue(newFilterValue.length ? newFilterValue : undefined);
  };

  if (isLoading) {
    return <LoyaltyCardTableSkeleton />;
  }

  return (
    <div className="space-y-4">
      <LoyaltyCardTableToolbar
        table={table}
        data={data}
        inputRef={inputRef}
        id={id}
        selectedTypes={selectedTypes}
        uniqueTypeValues={uniqueTypeValues}
        typeCounts={typeCounts}
        onTypeChange={handleTypeChange}
      />

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <Table className="table-fixed min-w-[900px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:bg-transparent border-b border-gray-200 bg-gray-50"
              >
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
                              "flex h-full cursor-pointer select-none items-center justify-between gap-2"
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
                              <ArrowUp
                                className="shrink-0 text-gray-700"
                                size={14}
                                strokeWidth={2.5}
                                aria-hidden="true"
                              />
                            ),
                            desc: (
                              <ArrowDown
                                className="shrink-0 text-gray-700"
                                size={14}
                                strokeWidth={2.5}
                                aria-hidden="true"
                              />
                            ),
                            false: (
                              <ChevronsUpDown
                                className="shrink-0 text-gray-400"
                                size={14}
                                strokeWidth={2}
                                aria-hidden="true"
                              />
                            ),
                          }[header.column.getIsSorted() as string] ?? (
                            <ChevronsUpDown
                              className="shrink-0 text-gray-400"
                              size={14}
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                          )}
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
                  className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"
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
                  No se encontraron tarjetas de fidelidad.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <LoyaltyCardTablePagination table={table} id={id} />
    </div>
  );
};

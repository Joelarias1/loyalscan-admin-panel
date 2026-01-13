import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Download, FileSpreadsheet } from "lucide-react";
import { useState, useCallback } from "react";

export interface ExportColumn<T> {
  /** Unique key for the column */
  key: string;
  /** Display label for the column */
  label: string;
  /** Function to get the value from a row */
  getValue: (row: T) => string | number | boolean | null | undefined;
  /** Whether the column is selected by default */
  defaultSelected?: boolean;
}

interface TableExportProps<T> {
  /** Data to export */
  data: T[];
  /** Column definitions for export */
  columns: ExportColumn<T>[];
  /** Filename without extension */
  filename?: string;
  /** Button variant */
  variant?: "outline" | "default" | "ghost";
  /** Disabled state */
  disabled?: boolean;
}

/**
 * Reusable table export component
 * Allows users to export all data or select specific columns
 */
export function TableExport<T>({
  data,
  columns,
  filename = "export",
  variant = "outline",
  disabled = false,
}: TableExportProps<T>) {
  const [selectedColumns, setSelectedColumns] = useState<Set<string>>(() => {
    const defaults = new Set<string>();
    columns.forEach((col) => {
      if (col.defaultSelected !== false) {
        defaults.add(col.key);
      }
    });
    return defaults;
  });
  const [isOpen, setIsOpen] = useState(false);

  const toggleColumn = useCallback((key: string) => {
    setSelectedColumns((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelectedColumns(new Set(columns.map((col) => col.key)));
  }, [columns]);

  const deselectAll = useCallback(() => {
    setSelectedColumns(new Set());
  }, []);

  const generateCSV = useCallback(
    (columnsToExport: ExportColumn<T>[]) => {
      if (columnsToExport.length === 0 || data.length === 0) return;

      // Generate header row
      const headers = columnsToExport.map((col) => `"${col.label.replace(/"/g, '""')}"`);

      // Generate data rows
      const rows = data.map((row) =>
        columnsToExport.map((col) => {
          const value = col.getValue(row);
          if (value === null || value === undefined) return '""';
          if (typeof value === "boolean") return value ? '"Sí"' : '"No"';
          if (typeof value === "number") return value.toString();
          // Escape quotes and wrap in quotes
          return `"${String(value).replace(/"/g, '""')}"`;
        })
      );

      // Combine header and rows
      const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

      // Add BOM for Excel UTF-8 compatibility
      const BOM = "\uFEFF";
      const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });

      // Create download link
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `${filename}_${new Date().toISOString().split("T")[0]}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsOpen(false);
    },
    [data, filename]
  );

  const exportAll = useCallback(() => {
    generateCSV(columns);
  }, [columns, generateCSV]);

  const exportSelected = useCallback(() => {
    const columnsToExport = columns.filter((col) => selectedColumns.has(col.key));
    generateCSV(columnsToExport);
  }, [columns, selectedColumns, generateCSV]);

  const selectedCount = selectedColumns.size;
  const allSelected = selectedCount === columns.length;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant={variant} disabled={disabled || data.length === 0}>
          <Download className="-ms-1 me-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
          Exportar
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" align="end">
        <div className="p-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-sm">Exportar CSV</span>
            </div>
            <span className="text-xs text-muted-foreground">{data.length} filas</span>
          </div>
        </div>

        <div className="p-3">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground">Columnas</span>
            <div className="flex gap-2">
              <button
                onClick={selectAll}
                className="text-xs text-primary hover:underline"
                disabled={allSelected}
              >
                Todas
              </button>
              <span className="text-xs text-muted-foreground">|</span>
              <button
                onClick={deselectAll}
                className="text-xs text-primary hover:underline"
                disabled={selectedCount === 0}
              >
                Ninguna
              </button>
            </div>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {columns.map((col) => (
              <div key={col.key} className="flex items-center gap-2">
                <Checkbox
                  id={`export-col-${col.key}`}
                  checked={selectedColumns.has(col.key)}
                  onCheckedChange={() => toggleColumn(col.key)}
                />
                <Label
                  htmlFor={`export-col-${col.key}`}
                  className="text-sm font-normal cursor-pointer flex-1"
                >
                  {col.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="p-3 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={exportAll}
            disabled={data.length === 0}
          >
            Exportar todo
          </Button>
          <Button
            size="sm"
            className="flex-1"
            onClick={exportSelected}
            disabled={selectedCount === 0 || data.length === 0}
          >
            Exportar ({selectedCount})
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

**LoyalScan Admin Suite** is a Vite + React admin dashboard for managing LoyalScan businesses, trials, and loyalty cards. Built with TypeScript, shadcn/ui, and Supabase.

**IMPORTANT:** All UI text must be in Spanish.

### MCP Database Access

When using the Supabase MCP server for database operations:
- **Project ID**: `qhkkihhxhpkojsocaiau`

## Development Commands

```bash
# Install dependencies (use Yarn)
yarn install

# Development server (port 8080)
yarn dev

# Production build
yarn build

# Linting
yarn lint
```

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 18 + Vite 5 |
| Language | TypeScript 5.8 |
| Styling | Tailwind CSS 3.4 |
| Components | shadcn/ui (Radix UI) |
| Data Fetching | React Query v5 |
| State | Zustand 5 |
| Forms | React Hook Form + Zod |
| Tables | TanStack React Table |
| Animations | Motion (Framer Motion) |
| Icons | Lucide React, @untitledui/icons-react |
| Toasts | Sonner |
| Database | Supabase |
| Routing | React Router v6 |

## Project Structure

```
src/
├── features/control-panel/     # MAIN - Feature modules
│   ├── business/               # Business management
│   │   ├── components/         # Table, Toolbar, Columns, Skeleton
│   │   ├── hooks/              # useBusinesses, useBusinessStats
│   │   ├── pages/              # Businesses.tsx
│   │   ├── types.ts
│   │   ├── utils.ts
│   │   └── export-columns.ts
│   ├── trials/                 # Trial management
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── ...
│   └── loyalty-cards/          # Loyalty cards management
│       └── ...
├── components/
│   ├── ui/                     # shadcn/ui components (50+)
│   ├── DashboardLayout.tsx     # Main layout with sidebar
│   ├── AppSidebar.tsx          # Navigation sidebar
│   ├── ProtectedRoute.tsx      # Auth guard
│   └── TableExport.tsx         # CSV export utility
├── hooks/                      # Shared hooks
├── store/                      # Zustand stores
├── integrations/supabase/      # Supabase client & types
├── lib/utils.ts                # cn() utility
└── index.css                   # Global styles & CSS variables
```

## Design System

### Color Palette (Light Mode Only)

```css
/* Primary colors */
--primary: 217 91% 60%;        /* Blue - brand color */
--background: 0 0% 96%;        /* Light gray background */
--card: 0 0% 100%;             /* White cards */
--destructive: 0 84% 60%;      /* Red for destructive actions */

/* Grays */
--muted: 210 40% 96.1%;
--muted-foreground: 215.4 16.3% 46.9%;
--border: 214.3 31.8% 91.4%;
```

### Typography

- Font: Geist (primary)
- Sizes: Follow Tailwind defaults (text-xs through text-3xl)

### Spacing & Radius

- Border radius: 0.5rem (8px) - `rounded-md` / `rounded-lg`
- Consistent spacing: 4, 6, 8 units for padding

## Key Patterns

### 1. Data Fetching (CRITICAL)

**ALWAYS use React Query, NEVER raw fetch + useEffect + useState**

```typescript
// GET data
export const useTrials = (mode: "live" | "test" = "live") => {
  return useQuery({
    queryKey: ["trials", mode],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("trial_tracking")
        .select(`...`)
      if (error) throw error;
      return data;
    },
  });
};

// Mutations with cache invalidation
export const useConvertTrial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ businessId }) => { /* ... */ },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trials"] });
      queryClient.invalidateQueries({ queryKey: ["trial-stats"] });
    },
  });
};
```

### 2. Feature Module Structure

Each feature in `features/control-panel/` follows this pattern:

```
feature/
├── components/
│   ├── FeatureTable.tsx           # Main table component
│   ├── FeatureTableColumns.tsx    # Column definitions
│   ├── FeatureTableToolbar.tsx    # Search, filters, actions
│   ├── FeatureTablePagination.tsx # Pagination controls
│   └── FeatureTableSkeleton.tsx   # Loading skeleton
├── hooks/
│   ├── useFeatureData.ts          # Main data hook
│   └── useFeatureStats.ts         # Stats hook
├── pages/
│   └── Feature.tsx                # Page component
├── types.ts                       # TypeScript interfaces
├── utils.ts                       # Utility functions
└── export-columns.ts              # CSV export config
```

### 3. Tables (TanStack React Table)

```typescript
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

// Column definition
export const createColumns = (options?: Options): ColumnDef<Type>[] => [
  {
    header: "Nombre",
    accessorKey: "name",
    cell: ({ row }) => <span>{row.getValue("name")}</span>,
    size: 200,
    enableSorting: true,
  },
];

// Table setup
const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  state: { sorting, pagination, columnFilters },
});
```

### 4. Buttons

Use shadcn/ui Button with variants:

```typescript
import { Button } from "@/components/ui/button";

// Primary action
<Button variant="default">Guardar</Button>

// Secondary action
<Button variant="outline">Cancelar</Button>

// Destructive action
<Button variant="destructive">Eliminar</Button>

// Ghost (minimal)
<Button variant="ghost" size="sm">Acción</Button>

// Custom styling
<Button
  variant="ghost"
  size="sm"
  className="text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100"
>
  Acción sutil
</Button>
```

### 5. Modals (Dialog)

```typescript
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle>Título del Modal</DialogTitle>
      <DialogDescription>Descripción opcional</DialogDescription>
    </DialogHeader>

    <div className="space-y-4">
      {/* Content */}
    </div>

    <DialogFooter>
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        Cancelar
      </Button>
      <Button onClick={handleSave}>Guardar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### 6. Toast Notifications

```typescript
import { toast } from "sonner";

// Success
toast.success("Operación exitosa", {
  description: "Los cambios se guardaron correctamente.",
  duration: 4000,
});

// Error
toast.error("Error al guardar", {
  description: error.message,
});
```

### 7. Skeleton Loaders

Skeletons must match the final component structure:

```typescript
export const TableSkeleton = () => (
  <div className="space-y-4">
    {/* Toolbar skeleton */}
    <div className="flex gap-4">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-10 w-32" />
    </div>

    {/* Table skeleton */}
    <div className="border rounded-lg">
      <div className="h-12 bg-gray-50 border-b" /> {/* Header */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-16 border-b flex items-center px-4 gap-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  </div>
);
```

### 8. State Management (Zustand)

```typescript
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarState {
  isOpen: boolean;
  toggle: () => void;
}

export const useSidebarState = create<SidebarState>()(
  persist(
    (set) => ({
      isOpen: true,
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    { name: "sidebar-state" }
  )
);
```

### 9. Class Merging

Always use `cn()` for conditional classes:

```typescript
import { cn } from "@/lib/utils";

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  variant === "primary" && "primary-classes"
)} />
```

### 10. Authentication

```typescript
import { useAuth } from "@/features/auth/hooks/useAuth";

const { user, session, loading, isSuperadmin, signIn, signOut } = useAuth();

// Protected routes check isSuperadmin
<ProtectedRoute>
  <DashboardLayout />
</ProtectedRoute>
```

## Table Styling Reference

```typescript
// Header
<TableHead className="h-12 font-semibold text-gray-700 bg-gray-50">

// Row
<TableRow className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors">

// Cell
<TableCell className="py-4">

// Empty state
<TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
  No se encontraron resultados.
</TableCell>
```

## Badge Variants

```typescript
// Status badges
<Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-300">
  Activo
</Badge>

<Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-300">
  Pendiente
</Badge>

<Badge variant="outline" className="bg-rose-100 text-rose-800 border-rose-300">
  Expirado
</Badge>

<Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
  Por cobrar
</Badge>

<Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
  Advertencia
</Badge>
```

## Critical Rules

### DO

- Use React Query for ALL data fetching
- Use Zustand for persistent client state
- Use shadcn/ui components
- Organize by features in `features/control-panel/`
- Implement skeleton loaders matching final structure
- Use `cn()` for class merging
- Use Sonner for toasts
- Format text in Spanish
- Use TanStack React Table for complex tables
- Invalidate related queries after mutations

### DON'T

- Use `useEffect` + `fetch` + `useState` for server data
- Use inline SVG icons (use lucide-react or @untitledui/icons-react)
- Use dark mode (light only design)
- Use Context API for frequently changing state
- Skip skeleton loaders for async content
- Forget to invalidate queries after mutations

## Supabase Queries

```typescript
import { supabase } from "@/integrations/supabase/client";

// Simple query
const { data, error } = await supabase
  .from("business")
  .select("*")
  .eq("status", "active");

// With relations (LEFT JOIN)
const { data, error } = await supabase
  .from("trial_tracking")
  .select(`
    id,
    trial_type,
    status,
    business:business_id (
      id,
      name,
      email
    )
  `)
  .order("created_at", { ascending: false });
```

## File Naming Conventions

- Components: `PascalCase.tsx` (e.g., `TrialTable.tsx`)
- Hooks: `camelCase.ts` prefixed with `use` (e.g., `useTrials.ts`)
- Utils: `camelCase.ts` or `kebab-case.ts`
- Types: `types.ts` in feature folder
- Pages: `PascalCase.tsx` (e.g., `Trials.tsx`)

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `Index.tsx` | Dashboard home |
| `/auth` | `Auth.tsx` | Login page |
| `/businesses` | `Businesses.tsx` | Business management |
| `/trials` | `Trials.tsx` | Trial management |
| `/loyalty-cards` | `LoyaltyCards.tsx` | Loyalty cards |

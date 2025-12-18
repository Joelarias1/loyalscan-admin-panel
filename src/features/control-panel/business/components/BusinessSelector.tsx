import * as React from "react";
import { Check, ChevronsUpDown, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useBusinesses } from "../hooks/useBusinesses";
import { useBusinessStore } from "@/store/useBusinessStore";
import { useSidebar } from "@/components/ui/sidebar";

export function BusinessSelector() {
  const [open, setOpen] = React.useState(false);
  const { data: businesses, isLoading } = useBusinesses();
  const { activeBusinessId, setActiveBusinessId } = useBusinessStore();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const selectedBusiness = businesses?.find(
    (business) => business.id === activeBusinessId
  );

  if (collapsed) {
    return (
      <div className="flex items-center justify-center p-2">
        <Store className="h-5 w-5 text-muted-foreground" />
      </div>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-white border-border/50 hover:bg-accent/50 transition-colors"
          disabled={isLoading}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <Store className="h-4 w-4 shrink-0 text-primary" />
            <span className="truncate">
              {selectedBusiness ? selectedBusiness.name : "Seleccionar negocio..."}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[calc(var(--radix-popover-trigger-width))] p-0">
        <Command>
          <CommandInput placeholder="Buscar negocio..." />
          <CommandList>
            <CommandEmpty>No se encontró el negocio.</CommandEmpty>
            <CommandGroup>
              {businesses?.map((business) => (
                <CommandItem
                  key={business.id}
                  value={business.id}
                  onSelect={(currentValue) => {
                    setActiveBusinessId(currentValue === activeBusinessId ? null : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      activeBusinessId === business.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {business.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

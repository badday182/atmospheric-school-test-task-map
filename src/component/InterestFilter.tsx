import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface InterestFilterProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
  // totalCount: number;
}

/**
 * Input component for filtering users by interest
 * Uses internal debounce for smooth typing experience
 */
export function InterestFilter({
  value,
  onChange,
  resultCount,
}: InterestFilterProps) {
  const [inputValue, setInputValue] = useState(value);
  const isLoading = inputValue !== value;

  // Debounce: update parent state after 300ms of no typing
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, onChange]);

  // Sync with external value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleClear = () => {
    setInputValue("");
    onChange("");
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Filter by interest (e.g., music, gaming...)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="pl-10 pr-10"
        />
        {inputValue && (
          <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {isLoading && <Spinner className="h-4 w-4" />}
            <span className="text-sm text-muted-foreground">
              {/* Showing {resultCount} of {totalCount} users */}
              Showing {resultCount} users
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={handleClear}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

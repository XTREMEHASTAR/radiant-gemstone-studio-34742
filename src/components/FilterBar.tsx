import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface FilterBarProps {
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onPriceRangeChange: (value: [number, number]) => void;
  priceRange: [number, number];
  maxPrice: number;
}

export const FilterBar = ({
  onSearchChange,
  onSortChange,
  onPriceRangeChange,
  priceRange,
  maxPrice,
}: FilterBarProps) => {
  const [search, setSearch] = useState("");
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(priceRange);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange(value);
  };

  const handlePriceChange = (value: number[]) => {
    const range: [number, number] = [value[0], value[1]];
    setLocalPriceRange(range);
    onPriceRangeChange(range);
  };

  return (
    <div className="bg-card rounded-xl p-4 shadow-sm border border-border/50 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jewelry..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Sort */}
        <Select onValueChange={onSortChange}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="name">Name: A to Z</SelectItem>
          </SelectContent>
        </Select>

        {/* Mobile Filter Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:hidden gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Refine your search</SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <Label>Price Range</Label>
              <div className="pt-6 pb-4">
                <Slider
                  min={0}
                  max={maxPrice}
                  step={1000}
                  value={[localPriceRange[0], localPriceRange[1]]}
                  onValueChange={handlePriceChange}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>₹{localPriceRange[0].toLocaleString()}</span>
                  <span>₹{localPriceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Price Filter */}
        <div className="hidden md:block w-[250px]">
          <Label className="text-sm mb-2 block">Price Range</Label>
          <div className="pt-2">
            <Slider
              min={0}
              max={maxPrice}
              step={1000}
              value={[localPriceRange[0], localPriceRange[1]]}
              onValueChange={handlePriceChange}
              className="w-full"
            />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>₹{localPriceRange[0].toLocaleString()}</span>
              <span>₹{localPriceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {search && (
        <div className="flex gap-2 mt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
            Search: {search}
            <button onClick={() => handleSearchChange("")}>
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

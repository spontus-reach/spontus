"use client";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEAL_TYPES } from "@/lib/constants";

export type ListingFilterState = {
  sport: string;
  geography: string;
  offerType: string;
  hideApplied: boolean;
};

type Props = {
  filters: ListingFilterState;
  onChange: (filters: ListingFilterState) => void;
  onClear: () => void;
};

export const DEFAULT_FILTERS: ListingFilterState = {
  sport: "",
  geography: "",
  offerType: "",
  hideApplied: false,
};

export function ListingFilters({ filters, onChange, onClear }: Props) {
  const hasFilters =
    filters.sport ||
    filters.geography ||
    filters.offerType ||
    filters.hideApplied;

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="min-w-[140px]">
        <label className="mb-1 block text-xs" style={{ color: "#6b6960" }}>
          Sport
        </label>
        <Select
          value={filters.sport || "all"}
          onValueChange={(v) =>
            onChange({ ...filters, sport: v === "all" ? "" : (v ?? "") })
          }
        >
          <SelectTrigger className="h-9 text-xs">
            <SelectValue placeholder="All sports" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All sports</SelectItem>
            <SelectItem value="Triathlon">Triathlon</SelectItem>
            <SelectItem value="Soccer">Soccer</SelectItem>
            <SelectItem value="Rugby">Rugby</SelectItem>
            <SelectItem value="Swim">Swim</SelectItem>
            <SelectItem value="Cycling">Cycling</SelectItem>
            <SelectItem value="Running">Running</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-[140px]">
        <label className="mb-1 block text-xs" style={{ color: "#6b6960" }}>
          Geography
        </label>
        <Input
          className="h-9 text-xs"
          placeholder="Any location"
          value={filters.geography}
          onChange={(e) => onChange({ ...filters, geography: e.target.value })}
        />
      </div>

      <div className="min-w-[180px]">
        <label className="mb-1 block text-xs" style={{ color: "#6b6960" }}>
          Offer type
        </label>
        <Select
          value={filters.offerType || "all"}
          onValueChange={(v) =>
            onChange({ ...filters, offerType: v === "all" ? "" : (v ?? "") })
          }
        >
          <SelectTrigger className="h-9 text-xs">
            <SelectValue placeholder="Any offer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any offer</SelectItem>
            {DEAL_TYPES.map((dt) => (
              <SelectItem key={dt} value={dt}>
                {dt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <label className="flex cursor-pointer items-center gap-2 pb-1 text-xs" style={{ color: "#6b6960" }}>
        <Checkbox
          checked={filters.hideApplied}
          onCheckedChange={(v) =>
            onChange({ ...filters, hideApplied: !!v })
          }
        />
        Hide applied
      </label>

      {hasFilters && (
        <button
          onClick={onClear}
          className="pb-1 text-xs underline"
          style={{ color: "#1a3a6e" }}
        >
          Clear filters
        </button>
      )}
    </div>
  );
}

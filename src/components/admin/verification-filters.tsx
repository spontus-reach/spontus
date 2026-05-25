"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { VerificationEntityType } from "@/lib/types";

export type VerificationFilterState = {
  entityType: VerificationEntityType | "all";
  status: string;
  search: string;
};

export const DEFAULT_VER_FILTERS: VerificationFilterState = {
  entityType: "all",
  status: "submitted_for_verification",
  search: "",
};

type Props = {
  filters: VerificationFilterState;
  onChange: (filters: VerificationFilterState) => void;
  onClear: () => void;
};

export function VerificationFilters({ filters, onChange, onClear }: Props) {
  const hasFilters = filters.status || filters.search || filters.entityType !== "all";

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="min-w-[120px]">
        <label className="mb-1 block text-xs" style={{ color: "#6b6960" }}>
          Type
        </label>
        <Select
          value={filters.entityType}
          onValueChange={(v) =>
            onChange({
              ...filters,
              entityType: (v ?? "all") as VerificationEntityType | "all",
            })
          }
        >
          <SelectTrigger className="h-9 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="team">Teams</SelectItem>
            <SelectItem value="sponsor">Sponsors</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-[160px]">
        <label className="mb-1 block text-xs" style={{ color: "#6b6960" }}>
          Status
        </label>
        <Select
          value={filters.status || "all"}
          onValueChange={(v) =>
            onChange({ ...filters, status: v === "all" ? "" : (v ?? "") })
          }
        >
          <SelectTrigger className="h-9 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="submitted_for_verification">
              Submitted
            </SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="needs_changes">Needs changes</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-[200px]">
        <label className="mb-1 block text-xs" style={{ color: "#6b6960" }}>
          Search
        </label>
        <Input
          className="h-9 text-xs"
          placeholder="Name, university, sport..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
        />
      </div>

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

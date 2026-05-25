"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type ApplicantFilterState = {
  status: string;
  sport: string;
  search: string;
};

export const DEFAULT_APPLICANT_FILTERS: ApplicantFilterState = {
  status: "",
  sport: "",
  search: "",
};

type Props = {
  filters: ApplicantFilterState;
  onChange: (filters: ApplicantFilterState) => void;
  onClear: () => void;
};

export function ApplicantFilters({ filters, onChange, onClear }: Props) {
  const hasFilters = filters.status || filters.sport || filters.search;

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="min-w-[140px]">
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
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="under_review">Under Review</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="declined">Declined</SelectItem>
          </SelectContent>
        </Select>
      </div>

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
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-[180px]">
        <label className="mb-1 block text-xs" style={{ color: "#6b6960" }}>
          Search
        </label>
        <Input
          className="h-9 text-xs"
          placeholder="Team name or university"
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

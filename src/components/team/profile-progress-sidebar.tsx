"use client";

import { Check, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export type BuilderSection = {
  id: string;
  label: string;
};

export const BUILDER_SECTIONS: BuilderSection[] = [
  { id: "basics", label: "Basics" },
  { id: "social", label: "Social & reach" },
  { id: "competition", label: "Competition & events" },
  { id: "assets", label: "Sponsorship asset menu" },
  { id: "hosted", label: "Hosted events" },
  { id: "looking", label: "What we're looking for" },
  { id: "media", label: "Photos & media" },
];

type Props = {
  activeSection: string;
  completedSections: Record<string, boolean>;
  completeness: number;
  onNavigate: (sectionId: string) => void;
};

export function ProfileProgressSidebar({
  activeSection,
  completedSections,
  completeness,
  onNavigate,
}: Props) {
  return (
    <aside className="space-y-4">
      <Card className="border-border bg-card p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Profile completeness</span>
          <span className="font-semibold">{completeness}%</span>
        </div>
        <Progress value={completeness} className="mt-3 h-2" />
      </Card>

      <Card className="border-border bg-card p-2">
        <nav className="flex flex-col">
          {BUILDER_SECTIONS.map((s) => {
            const isActive = activeSection === s.id;
            const isDone = completedSections[s.id];

            return (
              <button
                key={s.id}
                onClick={() => onNavigate(s.id)}
                className={`flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                      isDone
                        ? "border-spontus-green bg-spontus-green text-background"
                        : "border-border"
                    }`}
                  >
                    {isDone && <Check className="h-3 w-3" />}
                  </span>
                  {s.label}
                </span>
                {isActive && <ChevronRight className="h-4 w-4" />}
              </button>
            );
          })}
        </nav>
      </Card>
    </aside>
  );
}

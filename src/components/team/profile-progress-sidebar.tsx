"use client";

import { Check, ChevronRight, Users, Share2, Calendar, Package, Eye, Image } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export type BuilderSection = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

export const BUILDER_SECTIONS: BuilderSection[] = [
  { id: "basics", label: "Basics", icon: Users },
  { id: "social", label: "Social & reach", icon: Share2 },
  { id: "competition", label: "Competition & events", icon: Calendar },
  { id: "assets", label: "Sponsorship asset menu", icon: Package },
  { id: "hosted", label: "Hosted events", icon: Calendar },
  { id: "looking", label: "What we're looking for", icon: Eye },
  { id: "media", label: "Photos & media", icon: Image },
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
        <div className="mt-3">
          <Progress value={completeness} className="h-2.5" />
        </div>
      </Card>

      <Card className="border-border bg-card p-2">
        <nav className="flex flex-col space-y-1">
          {BUILDER_SECTIONS.map((s) => {
            const isActive = activeSection === s.id;
            const isDone = completedSections[s.id];

            return (
              <button
                key={s.id}
                onClick={() => onNavigate(s.id)}
                className={`flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-accent/90 text-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md ${
                    isDone
                      ? "border-spontus-green bg-spontus-green/20"
                      : "border-border/50"
                  }">
                    {isDone ? (
                      <Check className="h-3.5 w-3.5 text-spontus-green" />
                    ) : (
                      <s.icon className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                    )}
                  </div>
                  <div className="flex-1 space-x-2">
                    <span className="font-medium">{s.label}</span>
                    {isDone && (
                      <span className="text-xs text-spontus-green">Done</span>
                    )}
                  </div>
                </div>
                {isActive && (
                  <ChevronRight className="h-4 w-4 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </nav>
      </Card>
    </aside>
  );
}

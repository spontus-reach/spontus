"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/team/form-field";
import { optionalInteger } from "@/lib/form-values";
import { Plus, X } from "lucide-react";
import type { TeamProfileDraft, TeamEvent } from "@/lib/types";

type Props = {
  data: Pick<TeamProfileDraft, "league" | "competitionSummary" | "season" | "events">;
  onUpdate: (patch: Partial<TeamProfileDraft>) => void;
};

export function CompetitionEventsForm({ data, onUpdate }: Props) {
  const events = data.events ?? [];

  function addEvent() {
    const newEvent: TeamEvent = {
      id: `evt-${Date.now()}`,
      name: "",
      eventType: "competition",
      startsOn: "",
      location: "",
    };
    onUpdate({ events: [...events, newEvent] });
  }

  function updateEvent(id: string, patch: Partial<TeamEvent>) {
    onUpdate({
      events: events.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    });
  }

  function removeEvent(id: string) {
    onUpdate({ events: events.filter((e) => e.id !== id) });
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="League / conference">
          <Input
            value={data.league ?? ""}
            onChange={(e) => onUpdate({ league: e.target.value })}
            placeholder="USA Triathlon Collegiate"
          />
        </Field>
        <Field label="Season">
          <Input
            value={data.season ?? ""}
            onChange={(e) => onUpdate({ season: e.target.value })}
            placeholder="Year-round"
          />
        </Field>
      </div>
      <Field label="Competition summary">
        <Textarea
          rows={3}
          value={data.competitionSummary ?? ""}
          onChange={(e) => onUpdate({ competitionSummary: e.target.value })}
          placeholder="West Regional Championships (April), USAT Collegiate Nationals (April)..."
        />
      </Field>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <Label className="text-sm">Events</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addEvent}
            className="gap-1"
          >
            <Plus className="h-3 w-3" /> Add event
          </Button>
        </div>
        {events.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No events added yet. Add your competitions and matches.
          </p>
        )}
        <div className="space-y-3">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="rounded-lg border border-border bg-card p-3"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground uppercase">
                  Competition
                </span>
                <button
                  type="button"
                  onClick={() => removeEvent(evt.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="grid gap-2 md:grid-cols-2">
                <Input
                  placeholder="Event name"
                  value={evt.name}
                  onChange={(e) =>
                    updateEvent(evt.id, { name: e.target.value })
                  }
                />
                <Input
                  type="date"
                  value={evt.startsOn ?? ""}
                  onChange={(e) =>
                    updateEvent(evt.id, { startsOn: e.target.value })
                  }
                />
                <Input
                  placeholder="Location"
                  value={evt.location ?? ""}
                  onChange={(e) =>
                    updateEvent(evt.id, { location: e.target.value })
                  }
                />
                <Input
                  type="number"
                  placeholder="Expected attendance"
                  value={evt.expectedAttendance ?? ""}
                  onChange={(e) =>
                    updateEvent(evt.id, {
                      expectedAttendance: optionalInteger(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

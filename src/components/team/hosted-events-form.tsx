"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/forms/form-field";
import { optionalInteger } from "@/lib/form-values";
import { Plus, X } from "lucide-react";
import type { TeamProfileDraft, TeamEvent } from "@/lib/types";

type Props = {
  data: Pick<TeamProfileDraft, "hostedEvents">;
  onUpdate: (patch: Partial<TeamProfileDraft>) => void;
};

export function HostedEventsForm({ data, onUpdate }: Props) {
  const events = data.hostedEvents ?? [];
  const hasEvents = events.length > 0;

  function addEvent() {
    const newEvent: TeamEvent = {
      id: `hosted-${Date.now()}`,
      name: "",
      eventType: "hosted_event",
      startsOn: "",
      location: "",
    };
    onUpdate({ hostedEvents: [...events, newEvent] });
  }

  function updateEvent(id: string, patch: Partial<TeamEvent>) {
    onUpdate({
      hostedEvents: events.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    });
  }

  function removeEvent(id: string) {
    onUpdate({ hostedEvents: events.filter((e) => e.id !== id) });
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Teams that host events are more valuable to sponsors. If your team hosts
        a race, tournament, or showcase, add it here.
      </p>

      {!hasEvents && (
        <Button
          type="button"
          variant="outline"
          onClick={addEvent}
          className="gap-1"
        >
          <Plus className="h-3.5 w-3.5" /> Add a hosted event
        </Button>
      )}

      {events.map((evt) => (
        <div
          key={evt.id}
          className="rounded-lg border border-border bg-card p-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase">
              Hosted event
            </span>
            <button
              type="button"
              onClick={() => removeEvent(evt.id)}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Event name">
              <Input
                value={evt.name}
                onChange={(e) =>
                  updateEvent(evt.id, { name: e.target.value })
                }
                placeholder="March Triathlon Series"
              />
            </Field>
            <Field label="Date">
              <Input
                type="date"
                value={evt.startsOn ?? ""}
                onChange={(e) =>
                  updateEvent(evt.id, { startsOn: e.target.value })
                }
              />
            </Field>
            <Field label="Location">
              <Input
                value={evt.location ?? ""}
                onChange={(e) =>
                  updateEvent(evt.id, { location: e.target.value })
                }
                placeholder="San Luis Obispo, CA"
              />
            </Field>
            <Field label="Expected attendance">
              <Input
                type="number"
                value={evt.expectedAttendance ?? ""}
                onChange={(e) =>
                  updateEvent(evt.id, {
                    expectedAttendance: optionalInteger(e.target.value),
                  })
                }
                placeholder="500"
              />
            </Field>
          </div>
          <Field label="Description / pitch">
            <Textarea
              rows={3}
              value={evt.notes ?? ""}
              onChange={(e) =>
                updateEvent(evt.id, { notes: e.target.value })
              }
              placeholder="Sprint + Olympic distances. Packet pickup, finish-line booths, podium awards..."
            />
          </Field>
        </div>
      ))}

      {hasEvents && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addEvent}
          className="gap-1"
        >
          <Plus className="h-3 w-3" /> Add another event
        </Button>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/forms/form-field";
import { ImageIcon, ImagePlus, Camera, X } from "lucide-react";
import type { TeamProfileDraft } from "@/lib/types";

type Props = {
  data: Pick<TeamProfileDraft, "photo">;
  onUpdate: (patch: Partial<TeamProfileDraft>) => void;
};

export function MediaUploadForm({ data, onUpdate }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(data.photo ?? null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a storage service
      // For now, we'll create a local URL preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        onUpdate({ photo: result });
        setPreviewUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    onUpdate({ photo: url });
    setPreviewUrl(url);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Upload 3-6 photos that show your team&apos;s vibe and scale. You can
        either provide URLs or upload images directly.
      </p>

      <Field label="Team photo URL or upload">
        <div className="flex gap-3">
          <Input
            value={data.photo ?? ""}
            onChange={handleUrlChange}
            placeholder="https://images.unsplash.com/..."
            className="flex-1"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <label
            htmlFor="undefined"
            onClick={(e) => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "image/*";
              input.onChange = handleImageChange;
              input.click();
            }}
            className="flex h-9 items-center justify-center rounded-md border border-input bg-transparent px-3 text-sm font-medium placeholder:text-muted-foreground hover:bg-accent/50 hover:text-accent"
          >
            Upload
          </label>
        </div>
      </Field>

      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6].map((i) => {
          const isHovered = hoverIndex === i;
          const showOverlay =
            i <= 3 && (previewUrl || isHovered); // Show overlay for first 3 slots if we have a preview or hovering

          return (
            <div
              key={i}
              className="relative flex aspect-square items-center justify-center rounded-lg border border-dashed border-border text-muted-foreground cursor-pointer hover:border-accent/50 hover:text-accent transition-colors"
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {showOverlay && previewUrl ? (
                <img
                  src={previewUrl}
                  alt={`Preview ${i}`}
                  className="absolute inset-0 object-cover rounded-lg opacity-80"
                />
              ) : null}
              <div className="relative z-10 flex flex-col items-center gap-1">
                {showOverlay && previewUrl ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdate({ photo: "" });
                      setPreviewUrl(null);
                    }}
                    className="absolute top-1 right-1 rounded-full p-1 text-red-500 hover:text-red-700 bg-white/80 backdrop-blur"
                    aria-label="Remove image"
                  >
                    <X className="h-3 w-3" />
                  </button>
                ) : (
                  <ImagePlus className="h-5 w-5 text-muted-foreground hover:text-accent" />
                )}
                <span className: Team onboarding flow optimization in src/components/team/
2. Team listing creation and editing interfaces
3. Application submission process improvements
4. Team profile page enhancements
span className="text-[10px]">{!${
                  showOverlay && previewUrl
                } && `Photo ${i}`}</span>
              </div>
            </div>
          );
        })}
      </div>

      {previewUrl ? (
        <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <ImageIcon className="h-4 w-4" />
          Preview:{(previewUrl.length > 50 ? `${previewUrl.substring(0, 50)}...` : previewUrl)}
        </p>
      ) : (
        <p className="text-xs text-muted-foreground">
          Teams with 5+ photos get 3x more sponsor interest. <span className="font-medium">Real file upload
            coming in a future slice.</span>
        </p>
      )}
    </div>
  );
}

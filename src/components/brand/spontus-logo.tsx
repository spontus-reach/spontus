import Link from "next/link";
import { cn } from "@/lib/utils";

export type SpontusLogoVariant = "lockup" | "mark" | "mark-square";

const ASSETS: Record<
  SpontusLogoVariant,
  { src: string; width: number; height: number; alt: string }
> = {
  lockup: {
    src: "/brand/spontus-lockup.svg",
    width: 320,
    height: 56,
    alt: "Spontus",
  },
  mark: {
    src: "/brand/spontus-mark.svg",
    width: 200,
    height: 280,
    alt: "Spontus",
  },
  "mark-square": {
    src: "/brand/spontus-mark-square.svg",
    width: 320,
    height: 320,
    alt: "Spontus",
  },
};

type SpontusLogoProps = {
  variant?: SpontusLogoVariant;
  /** Render height in px; width scales from asset aspect ratio. */
  height?: number;
  className?: string;
  href?: string | null;
  label?: string;
};

export function SpontusLogo({
  variant = "lockup",
  height = 28,
  className,
  href = "/",
  label = "Spontus home",
}: SpontusLogoProps) {
  const asset = ASSETS[variant];
  const width = Math.round((height / asset.height) * asset.width);

  const image = (
    // eslint-disable-next-line @next/next/no-img-element -- brand SVG; no raster optimization needed
    <img
      src={asset.src}
      alt={asset.alt}
      width={width}
      height={height}
      className={cn("block h-auto max-w-full", className)}
      style={{ height, width: "auto" }}
    />
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex shrink-0 items-center"
        aria-label={label}
      >
        {image}
      </Link>
    );
  }

  return image;
}

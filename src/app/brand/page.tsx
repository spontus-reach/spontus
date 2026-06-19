import { SpontusLogo, type SpontusLogoVariant } from "@/components/brand/spontus-logo";

const VARIANTS: { variant: SpontusLogoVariant; label: string; height: number }[] = [
  { variant: "lockup", label: "Lockup (nav / footer)", height: 32 },
  { variant: "mark", label: "Mark", height: 48 },
  { variant: "mark-square", label: "Mark square (favicon / app icon)", height: 64 },
];

/** Local preview of brand SVG assets — not linked in public nav. */
export default function BrandPreviewPage() {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-16">
      <h1 className="text-2xl font-semibold text-[#1a1a18]">Brand logos</h1>
      <p className="mt-2 text-sm text-[#6b6960]">
        Assets from <code className="text-[#1a1a18]">public/brand/</code>. The lockup
        is wired into the top nav, footer, and browse gate.
      </p>

      <div className="mt-10 space-y-8">
        {VARIANTS.map(({ variant, label, height }) => (
          <section
            key={variant}
            className="rounded-xl border border-[#d5d3cd] bg-white p-8"
          >
            <h2 className="text-sm font-medium text-[#1a1a18]">{label}</h2>
            <p className="mt-1 text-xs text-[#6b6960]">
              <code>{variant}</code> · height {height}px
            </p>
            <div className="mt-6 flex flex-wrap items-end gap-8">
              <div>
                <p className="mb-2 text-xs uppercase tracking-wide text-[#8a8880]">
                  Light
                </p>
                <SpontusLogo variant={variant} height={height} href={null} />
              </div>
              <div className="rounded-lg bg-[#1a1a18] p-6">
                <p className="mb-2 text-xs uppercase tracking-wide text-[#8a8880]">
                  Dark
                </p>
                <SpontusLogo variant={variant} height={height} href={null} />
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

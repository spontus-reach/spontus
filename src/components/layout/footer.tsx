import Link from "next/link";

export function Footer() {
  return (
    <footer style={{ borderTop: "0.5px solid #d5d3cd", marginTop: 64 }}>
      <div
        className="mx-auto max-w-[1120px] px-6 py-12"
        style={{ fontSize: 13, fontWeight: 400, color: "#6b6960" }}
      >
        <div className="grid gap-10 md:grid-cols-2">
          {/* Brand column */}
          <div>
            <div
              className="flex items-center gap-2"
              style={{ fontSize: 16, fontWeight: 600, color: "#1a1a18" }}
            >
              <span>Spontus</span>
            </div>
            <p className="mt-3" style={{ lineHeight: 1.6, maxWidth: 280 }}>
              The sponsorship marketplace for college club sports. Connecting
              verified teams with brands that want to reach them.
            </p>
          </div>

          {/* Nav column */}
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#8a8880",
              }}
            >
              Product
            </div>
            <div className="mt-4 flex flex-col gap-2.5">
              <Link href="/for-teams" className="transition-colors hover:text-[#1a1a18]">
                For Teams
              </Link>
              <Link href="/for-brands" className="transition-colors hover:text-[#1a1a18]">
                For Sponsors
              </Link>
              <Link href="/browse" className="transition-colors hover:text-[#1a1a18]">
                Browse Listings
              </Link>
            </div>
          </div>
        </div>

        <div
          className="mt-10 pt-6"
          style={{ borderTop: "0.5px solid #d5d3cd", fontSize: 12 }}
        >
          <span>&copy; {new Date().getFullYear()} Spontus</span>
        </div>
      </div>
    </footer>
  );
}

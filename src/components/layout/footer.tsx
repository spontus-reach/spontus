import Link from "next/link";

export function Footer() {
  return (
    <footer style={{ borderTop: "0.5px solid #d5d3cd", marginTop: 64 }}>
      <div
        className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-3 px-6"
        style={{ height: 64, fontSize: 12, fontWeight: 400, color: "#6b6960" }}
      >
        <span>&copy; 2026 Spontus</span>
        <div className="flex gap-6">
          <Link href="/" className="hover:text-[#1a1a18]">
            Home
          </Link>
          <Link href="/signup/team" className="hover:text-[#1a1a18]">
            For Teams
          </Link>
          <span className="cursor-not-allowed opacity-50">For Sponsors</span>
        </div>
      </div>
    </footer>
  );
}

export function PastSponsorsSection({ sponsors }: { sponsors: string[] }) {
  if (sponsors.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {sponsors.map((name) => (
        <span
          key={name}
          className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium"
          style={{
            border: "0.5px solid #d5d3cd",
            background: "#f0efeb",
            color: "#1a1a18",
          }}
        >
          {name}
        </span>
      ))}
    </div>
  );
}

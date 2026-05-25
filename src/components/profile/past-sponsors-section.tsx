export function PastSponsorsSection({ sponsors }: { sponsors: string[] }) {
  if (sponsors.length === 0) return null;

  return (
    <div className="grid grid-cols-3 gap-2">
      {sponsors.map((name) => (
        <div
          key={name}
          className="flex aspect-square items-center justify-center rounded-md text-xs"
          style={{
            border: "0.5px solid #d5d3cd",
            background: "#f0efeb",
            color: "#6b6960",
          }}
        >
          {name}
        </div>
      ))}
    </div>
  );
}

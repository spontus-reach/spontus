import { ApplicationsProvider } from "@/components/team/applications-provider";

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApplicationsProvider>{children}</ApplicationsProvider>;
}

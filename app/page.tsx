import { ArchiveView } from "@/components/archive-view";
import { ISSUES } from "@/lib/newsletter";

export default function Home() {
  return <ArchiveView issues={ISSUES} />;
}

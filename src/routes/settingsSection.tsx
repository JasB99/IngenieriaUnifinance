import { createFileRoute } from "@tanstack/react-router";
import Settings from "../components/ui/Settings";
export const Route = createFileRoute("/settingsSection")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Settings />;
}

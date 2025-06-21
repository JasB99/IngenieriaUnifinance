import { createFileRoute } from "@tanstack/react-router";
import ProfilePage from "../components/pages/ProfilePage";
export const Route = createFileRoute("/profileSection")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProfilePage />;
}

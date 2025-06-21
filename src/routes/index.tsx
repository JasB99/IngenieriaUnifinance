import { createFileRoute } from "@tanstack/react-router";

import InitialPage from "../components/pages/InitialPage";
export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <InitialPage />;
}

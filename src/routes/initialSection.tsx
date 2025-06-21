import { createFileRoute } from "@tanstack/react-router";
import MainPage from "../components/pages/MainPage";
export const Route = createFileRoute("/initialSection")({
  component: RouteComponent,
});

function RouteComponent() {
  return <MainPage />;
}

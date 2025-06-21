import { createFileRoute } from "@tanstack/react-router";
import RegisterPage from "../components/pages/RegisterPage";
export const Route = createFileRoute("/registerSection")({
  component: RouteComponent,
});

function RouteComponent() {
  return <RegisterPage />;
}

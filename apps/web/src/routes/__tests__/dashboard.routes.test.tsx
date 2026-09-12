import { expect, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import DashboardRoutes from "@/routes/dashboard.routes";

test("renders DashboardPage at root of dashboard module", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <DashboardRoutes />
    </MemoryRouter>,
  );

  expect(
    screen.getByRole("heading", { name: "Dashboard" }),
  ).toBeInTheDocument();
});

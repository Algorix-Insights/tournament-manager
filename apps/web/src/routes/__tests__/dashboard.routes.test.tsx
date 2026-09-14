import { expect, test } from "@jest/globals";
import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import DashboardRoutes from "@/routes/dashboard.routes";
import { renderWithQuery } from "@/tests/query-test-utils";

test("renders DashboardPage at root of dashboard module", () => {
  renderWithQuery(
    <MemoryRouter initialEntries={["/"]}>
      <DashboardRoutes />
    </MemoryRouter>,
  );

  expect(
    screen.getByRole("heading", { name: "Dashboard" }),
  ).toBeInTheDocument();
});

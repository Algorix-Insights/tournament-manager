import { expect, test } from "@jest/globals";
import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ScoresRoutes from "@/routes/scores.routes";
import { renderWithQuery } from "@/tests/query-test-utils";

test("renders ScoresPage at root of scores module", () => {
  renderWithQuery(
    <MemoryRouter initialEntries={["/"]}>
      <ScoresRoutes />
    </MemoryRouter>,
  );

  expect(screen.getByRole("heading", { name: "Clasificación" })).toBeInTheDocument();
});

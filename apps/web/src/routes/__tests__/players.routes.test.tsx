import { expect, test } from "@jest/globals";
import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import PlayersRoutes from "@/routes/players.routes";
import { renderWithQuery } from "@/tests/query-test-utils";

test("renders PlayersPage at root of players module", () => {
  renderWithQuery(
    <MemoryRouter initialEntries={["/"]}>
      <PlayersRoutes />
    </MemoryRouter>,
  );

  expect(screen.getByRole("heading", { name: "Jugadores" })).toBeInTheDocument();
});

import { expect, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import PlayersRoutes from "@/routes/players.routes";

test("renders PlayersPage at root of players module", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <PlayersRoutes />
    </MemoryRouter>,
  );

  expect(screen.getByRole("heading", { name: "Jugadores" })).toBeInTheDocument();
});

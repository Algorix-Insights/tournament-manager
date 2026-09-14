import { expect, jest, test } from "@jest/globals";
import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import api from "@/core/api/axios";
import GamesRoutes from "@/routes/games.routes";
import { renderWithQuery } from "@/tests/query-test-utils";

test("renders GamesPage at root of games module", () => {
  jest.spyOn(api, "get").mockResolvedValue({
    data: { data: [], totalRecords: 0 },
  });

  renderWithQuery(
    <MemoryRouter initialEntries={["/"]}>
      <GamesRoutes />
    </MemoryRouter>,
  );

  expect(screen.getByRole("heading", { name: "Videojuegos" })).toBeInTheDocument();
});

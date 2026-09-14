import { expect, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ScoresRoutes from "@/routes/scores.routes";

test("renders ScoresPage at root of scores module", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <ScoresRoutes />
    </MemoryRouter>,
  );

  expect(screen.getByRole("heading", { name: "Clasificacion" })).toBeInTheDocument();
});

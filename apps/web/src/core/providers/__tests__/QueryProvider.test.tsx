import { expect, test, describe } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import QueryProvider from "@/core/providers/QueryProvider";
import { createTestQueryClient } from "@/tests/query-test-utils";

function ConsumerComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ["test-key"],
    queryFn: async () => "tanstack query working",
  });

  if (isLoading) return <div>Loading consumer...</div>;
  return <div>{data}</div>;
}

describe("QueryProvider", () => {
  test("provides QueryClient context to child components", async () => {
    const testClient = createTestQueryClient();
    render(
      <QueryProvider client={testClient}>
        <ConsumerComponent />
      </QueryProvider>,
    );

    expect(
      await screen.findByText("tanstack query working"),
    ).toBeInTheDocument();
  });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
export function sql() {
  return {
    query: {
      products: {
        findMany: () => [{ id: 1 }],
      },
    },
    select: (cols: string) => ({
      from: (table: string) => [{ id: 1 }],
    }),
  }
}

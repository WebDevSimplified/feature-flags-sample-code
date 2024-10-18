import { canViewFeature } from "@/lib/featureFlags"
import { getUser } from "@/lib/getUser"
import { sql } from "@/lib/sql"

export function getProducts() {
  const products = sql().select("*").from("products")

  if (canViewFeature("TEST_NEW_PRODUCTS_QUERY", getUser())) {
    const altProducts = sql().query.products.findMany()

    console.assert(
      products.length === altProducts.length &&
        products.every(product => {
          return altProducts.find(alt => alt.id === product.id)
        })
    )
  }

  return products
}

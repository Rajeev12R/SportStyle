import { MOCK_PRODUCTS } from "@/lib/constants"

// New Category Component
const CategorySection = () => {
  const categories = Array.from(
    new Set(MOCK_PRODUCTS.map((product) => product.category))
  )

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
    </div>
  )
}

const HomePage = () => {
  return (
    <div>
      {/* Other sections of the homepage */}
      <CategorySection />
      {/* Other sections of the homepage */}
    </div>
  )
}

export default HomePage

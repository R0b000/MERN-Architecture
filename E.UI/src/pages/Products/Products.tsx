import useProductsLogic from './Products.logic';

const Products = () => {
  const { products, loading, error, refetch } = useProductsLogic();

  if (loading) {
    return (
      <div className="-columns items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="-columns min-h-screen p-6">
      <div className="-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary-700">Products</h1>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
        >
          Refresh
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="-row flex-wrap gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm min-w-[200px]"
          >
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-primary-600 font-bold">${product.price}</p>
            <span className="text-xs text-gray-500">{product.category}</span>
          </div>
        ))}
      </div>

      {products.length === 0 && !loading && (
        <p className="text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default Products;

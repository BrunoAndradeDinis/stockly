import { cachedGetProducts } from "@/app/_data-access/product/get-products";

const ProductList = async () => {
  const dataObject = await cachedGetProducts();

  return (
    <ul>
      {dataObject.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
};

export default ProductList;

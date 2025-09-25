import { ReactNode } from "react";

const ProductsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <h1> Products Layout</h1>
      {children}
    </>
  );
};

export default ProductsLayout;

import { getProducts } from "../_data-access/product/get-products";
import { ComboboxOption } from "../_components/ui/combobox";
import UpsertSaleButton from "./_components/create-sale-button";
import { DataTable } from "../_components/ui/data-table";
import { saleTableColumns } from "./_components/table-columns";
import { getSales } from "../_data-access/sales/get-sales";
import {
  Header,
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
  HeaderRight,
} from "../_components/header";

const SalesPage = async () => {
  const sales = await getSales();
  const products = await getProducts();
  const productOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: product.id,
  }));

  const tableData = sales.map((sale) => ({
    ...sale,
    products,
    productOptions,
  }));

  return (
    <div className="m-4 space-y-8 rounded-lg bg-white p-4 overflow-auto md:m-8 md:p-8">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Gestão de Vendas</HeaderSubtitle>
          <HeaderTitle>Vendas</HeaderTitle>
        </HeaderLeft>
        <HeaderRight>
          <UpsertSaleButton
            products={products}
            productOptions={productOptions}
          />
        </HeaderRight>
      </Header>
      <DataTable columns={saleTableColumns} data={tableData} />
    </div>
  );
};

export default SalesPage;

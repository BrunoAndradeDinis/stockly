import { PlusIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { DataTable } from "../_components/ui/data-table";
import { productsTableColumns } from "./_components/table-columns";
// import { getProduct } from "../_data-access/product/get-product";

const Produtos = async () => {
  const dataObject = await getProduct(); // chamar o banco num component não é o ideal, misturar o código com a conexão com o banco
  const products = JSON.parse(JSON.stringify(dataObject))
  // const dataObject = await fetch("http://localhost:3000/api/products");
  // const products = await dataObject.json()
  return (
    <div className="mx-8 my-8 w-full space-y-8 rounded-lg bg-white p-8">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">
            Gestão de produtos
          </span>
          <h2 className="text-xl font-semibold">Produtos</h2>
        </div>
        <Button>
          <PlusIcon size={20} />
          Novo produto
        </Button>
      </div>
      <DataTable
        columns={productsTableColumns}
        data={products}
      />
    </div>
  );
};

export default Produtos;

// criar uma rota /products e essa rota vai trazer os produtos, fazer o que faz no get-products porém numa rota-api
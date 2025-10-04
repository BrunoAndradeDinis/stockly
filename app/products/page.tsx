import { PlusIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { productsTableColumns } from "./_components/table-columns";

const Produtos = async () => {
  const products = await db.product.findMany({});
  return (
    <div className="mx-8 my-8 w-full rounded-lg bg-white space-y-8 p-8">
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
      <DataTable columns={productsTableColumns} data={products} />
    </div>
  );
};

export default Produtos;

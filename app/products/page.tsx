import { DataTable } from "../_components/ui/data-table";
import { productsTableColumns } from "./_components/table-columns";
import { cachedGetProducts } from "../_data-access/product/get-product";
import CreateProductButton from "./_components/create-product-button";

// import ProductList from "./_components/product-list";

// deixar a pagina dinamica
// export const dynamic = "force-dynamic"; // 1º - essa é uma forma, usando o ssr, 2º forma para deixar a página dinamica é fazer um fetch com {cache: "no-cache"} 3º cookies() ou headers() 4º se a página receber parametros ela se torna dinâmica por padrão

export const revalidate = 10; // no caso esse revalida a página completa a cada 10 segundos

const Produtos = async () => {
  const dataObject = await cachedGetProducts(); // chamar o banco num component não é o ideal, misturar o código com a conexão com o banco
  const products = JSON.parse(JSON.stringify(dataObject));

  // const dataObject = await fetch("http://localhost:3000/api/products", {
  //   method: "GET",
  // cache: "no-cache", // assim, o cache não fica salvo
  // next: {
  //  revalidate: 5, // assim ele vai criar a pagina static porém vai atualizar a cada 5 segundos para ter uma atualização do cache no nível de requisição
  // },
  //});

  // const { randomNumber: randomNumber2 } = await (
  // await fetch("http://localhost:3000/api/products", {
  // next:{
  //   revalidate: 15 // mas tem como a gente alterar
  // }
  // cache: "no-cache"
  //}) // aplica a mesma atualização. E isso funciona somente com fetch, se usar um axios não da rock
  // ).json();
  // const { products, randomNumber } = await dataObject.json();
  return (
    <div className="mx-8 my-8 w-full space-y-8 rounded-lg bg-white p-8">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">
            Gestão de produtos
          </span>
          <h2 className="text-xl font-semibold">Produtos</h2>
        </div>
        {/* <Button>
          <PlusIcon size={20} />
          Novo produto
          <Dialog></Dialog>
        </Button> */}
        <CreateProductButton />
      </div>
      {/* <ProductList></ProductList> */}
      <DataTable columns={productsTableColumns} data={products} />
    </div>
  );
};

export default Produtos;

// criar uma rota /products e essa rota vai trazer os produtos, fazer o que faz no get-products porém numa rota-api

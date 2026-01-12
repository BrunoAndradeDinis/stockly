/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import ProductTableDropdownMenu from "./table-dropdown-menu";
import { ProductsDTO } from "@/app/_data-access/product/get-products";
import ProductStatusBadge from "@/app/_components/product-status-badge";

export const productsTableColumns: ColumnDef<ProductsDTO>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor unitário",
    cell: ({row: {original: product}}) => {
      const price = product.price;
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(price));
    },
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row: {original: product}}) => (
       <ProductStatusBadge status={product.status} />
      ),
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({row: {original: product}}) => <ProductTableDropdownMenu product={product} />,
  },
];

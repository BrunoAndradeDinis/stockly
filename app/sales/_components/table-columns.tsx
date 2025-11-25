"use client";

import { SalesDTO } from "@/app/_data-access/sales/get-sales";
import { formatCurrency } from "@/app/_helpers/currency";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";

export const saleTableColumns: ColumnDef<SalesDTO>[] = [
  {
    accessorKey: "productNames",
    header: "Produtos",
  },
  {
    accessorKey: "totalProducts",
    header: "Quantidade de Produtos",
  },
  {
    header: "Valor Total",
    cell: ({
      row: {
        original: { totalAmount },
      },
    }) => formatCurrency(totalAmount),
  },
  {
    header: "Data",
    cell: ({
      row: {
        original: { date },
      },
    }) => new Date(date).toLocaleDateString("pt-BR"),
  },
  {
    header: "Ações",
    cell: () => (
      <span>
        <MoreHorizontalIcon size={16} />
      </span>
    ),
  },
];

"use client";

import { deleteSale } from "@/app/_actions/sale/delete-sale";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
// import { Sale } from "@prisma/client";
import {
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import UpsertSheetContent from "./upsert-sheet-content";
import { useState } from "react";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { ProductsDTO } from "@/app/_data-access/product/get-products";
import { SalesDTO } from "@/app/_data-access/sales/get-sales";

interface SalesTableDropdownMenuProps {
  sale: Pick<SalesDTO, "id" | "saleProducts">;
  productOptions: ComboboxOption[];
  products: ProductsDTO[];
}

const SalesTableDropdownMenu = ({
  sale,
  products,
  productOptions,
}: SalesTableDropdownMenuProps) => {
  const [upsertSheetIsOpen, setUpsertSheetIsOpen] = useState(false);

  const onClickCopy = (productId: string) => {
    navigator.clipboard.writeText(productId);
    toast.success("Código copiado!");
  };
  const { execute } = useAction(deleteSale, {
    onSuccess: () => {
      toast.success("Venda deletada com sucesso!");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Erro ao deletar a venda!");
    },
  });

  const onClickDelete = () => execute({ id: sale.id });

  return (
    <Sheet open={upsertSheetIsOpen} onOpenChange={setUpsertSheetIsOpen}>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontalIcon size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-1"
              onClick={() => onClickCopy(sale.id)}
            >
              <ClipboardCopyIcon size={16} />
              Copiar ID
            </DropdownMenuItem>

            <SheetTrigger asChild>
              <DropdownMenuItem className="gap-1">
                <EditIcon size={16} />
                Editar
              </DropdownMenuItem>
            </SheetTrigger>

            <AlertDialogTrigger>
              <DropdownMenuItem className="gap-1">
                <TrashIcon size={16} />
                Deletar
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a excluir esta venda. Essa ação não pode ser
              desfeita. Deseja continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-none bg-gray-100">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={onClickDelete}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <UpsertSheetContent
        saleId={sale.id}
        productOptions={productOptions}
        products={products}
        setSheetIsOpen={setUpsertSheetIsOpen}
        defaultSelectedProducts={sale.saleProducts.map((saleProduct) => ({
          id: saleProduct.productId,
          quantity: saleProduct.quantity,
          price: saleProduct.unitPrice,
          name: saleProduct.productName,
        }))}
      />
    </Sheet>
  );
};

export default SalesTableDropdownMenu;

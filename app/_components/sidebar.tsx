"use client";

import { LayoutGridIcon, Package, ShoppingBasket } from "lucide-react";
import SidebarButton from "./ui/sidebar-button";

const SideBar = () => {
  return (
    <>
      <div className="w-64 bg-white">
        {/* Imagem */}
        <div className="px-8 py-6">
          <h1 className="text-2xl font-bold">Stockly</h1>
        </div>
        {/* Botões */}
        <div className="flex flex-col gap-2 p-2">
          <SidebarButton href="/">
            <LayoutGridIcon size={20} />
            Dashboard
          </SidebarButton>
          <SidebarButton href="/products">
            <Package size={20} />
            Produtos
          </SidebarButton>
          <SidebarButton href="/sales">
            <ShoppingBasket size={20} />
            Vendas
          </SidebarButton>
        </div>
      </div>
    </>
  );
};

export default SideBar;

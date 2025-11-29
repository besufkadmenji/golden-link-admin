import { create } from "zustand";
import { GetProductsParams } from "@/types/products/product.params";

interface FilterState {
  filters: GetProductsParams;
  setFilter: (filters: Partial<GetProductsParams>) => void;
  resetFilters: () => void;
}

const initialFilters: GetProductsParams = {
  page: 1,
  limit: 20,
  search: "",
  status: undefined,
  sortBy: "createdAt",
  sortOrder: "desc",
  mainCategoryId: "",
  subcategoryId: "",
  productStatus: undefined,
  maxBaseline: null,
  minBaseline: null,
};

export const useFilter = create<FilterState>((set) => ({
  filters: initialFilters,
  setFilter: (filters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...filters,
      },
    })),
  resetFilters: () =>
    set(() => ({
      filters: initialFilters,
    })),
}));

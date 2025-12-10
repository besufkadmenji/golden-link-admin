export interface Client {
  id: number;
  name: string;
  isActive: boolean;
  createdAt: string;
}

export interface ClientDetail extends Client {
  logoPath: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ClientsData {
  clients: Client[];
  pagination: Pagination;
}

export interface GetClientsParams {
  search?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}

export interface CreateClientDto {
  name: string;
  isActive: boolean;
  clientLogo?: File;
}

export interface UpdateClientDto {
  name?: string;
  isActive?: boolean;
  clientLogo?: File;
}

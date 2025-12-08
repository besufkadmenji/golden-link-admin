
export interface ApiResponse<TData> {
  status: "success" | "error";
  statusCode: number;
  message: string;
  data: TData;
}



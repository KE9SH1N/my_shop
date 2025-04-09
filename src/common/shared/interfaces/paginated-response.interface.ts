export interface PaginatedResponse<T> {
  statusCode: number;
  message: string;
  data: T[];
  pagination: {
    total_data: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

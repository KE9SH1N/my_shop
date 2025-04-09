import { PaginatedResponse } from '../interfaces/paginated-response.interface';

export function paginateResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
  message = 'Data retrieved successfully',
): PaginatedResponse<T> {
  return {
    statusCode: 200,
    message,
    data,
    pagination: {
      total_data: total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

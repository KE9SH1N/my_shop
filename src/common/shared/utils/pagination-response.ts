// import { PaginatedResponse } from '../interfaces/paginated-response.interface';

// export function paginateResponse<T>(
//   data: T[],
//   total: number,
//   page: number,
//   limit: number,
//   message = 'Data retrieved successfully',
// ): PaginatedResponse<T> {
//   return {
//     statusCode: 200,
//     message,
//     data,
//     pagination: {
//       total_data: total,
//       page,
//       limit,
//       totalPages: Math.ceil(total / limit),
//     },
//   };
// }

// src/common/dto/paginated-response.dto.ts
export class PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };

  constructor(data: T[], total: number, page: number, limit: number) {
    this.data = data;
    this.meta = {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}

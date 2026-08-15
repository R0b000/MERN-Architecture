import type { SearchQueryPayload, PaginationQuery } from 'shared';

export class MongoQueryBuilder {
  static buildFilter(payload: SearchQueryPayload): Record<string, any> {
    const query: Record<string, any> = {};
    if (!payload.filters || payload.filters.length === 0) return query;

    payload.filters.forEach(({ field, operator, value }: any) => {
      switch (operator) {
        case 'eq': query[field] = value; break;
        case 'ne': query[field] = { $ne: value }; break;
        case 'gt': query[field] = { $gt: value }; break;
        case 'gte': query[field] = { $gte: value }; break;
        case 'lt': query[field] = { $lt: value }; break;
        case 'lte': query[field] = { $lte: value }; break;
        case 'in': query[field] = { $in: Array.isArray(value) ? value : [value] }; break;
        case 'contains': query[field] = { $regex: value, $options: 'i' }; break;
      }
    });
    return query;
  }

  static buildPagination(payload: PaginationQuery) {
    return {
      skip: (payload.page - 1) * payload.limit,
      limit: payload.limit,
      sort: payload.sortBy ? { [payload.sortBy]: payload.sortOrder === 'desc' ? -1 : 1 } : {},
    };
  }
}

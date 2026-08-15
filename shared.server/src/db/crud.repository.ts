import { MongoQueryBuilder } from '../query/mongo-query-builder';
import type { SearchQueryPayload, PaginationQuery } from 'shared';
import type { Model, Document } from 'mongoose';

export class CrudRepository<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    return await this.model.create(data);
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id);
  }

  async findAll(payload?: SearchQueryPayload): Promise<T[]> {
    const filter = MongoQueryBuilder.buildFilter(payload || {});
    const pagination = MongoQueryBuilder.buildPagination({
      page: payload?.page || 1,
      limit: payload?.limit || 10,
      sortBy: payload?.sortBy,
      sortOrder: payload?.sortOrder,
    });
    return await this.model.find(filter).sort(pagination.sort as any).skip(pagination.skip).limit(pagination.limit);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id);
    return !!result;
  }
}

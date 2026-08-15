export class RedisCache {
  private redis: any;
  private inMemoryCache: Map<string, any> = new Map();
  private enabled: boolean;

  constructor(enabled: boolean = false) {
    this.enabled = enabled;
    if (this.enabled) {
      const redisModule = require('redis');
      this.redis = redisModule.createClient({ url: process.env.REDIS_URL });
      this.redis.connect();
    }
  }

  async get<T>(key: string): Promise<T | null> {
    if (this.enabled && this.redis) {
      const data = await this.redis.get(key);
      return data ? JSON.parse(data) : null;
    }
    return this.inMemoryCache.get(key) || null;
  }

  async set<T>(key: string, value: T, ttl: number = 3600): Promise<void> {
    if (this.enabled && this.redis) {
      await this.redis.setEx(key, ttl, JSON.stringify(value));
    } else {
      this.inMemoryCache.set(key, value);
      setTimeout(() => this.inMemoryCache.delete(key), ttl * 1000);
    }
  }

  async del(key: string): Promise<void> {
    if (this.enabled && this.redis) {
      await this.redis.del(key);
    } else {
      this.inMemoryCache.delete(key);
    }
  }
}

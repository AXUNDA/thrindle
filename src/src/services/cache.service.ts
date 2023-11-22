import NodeCache from "node-cache";
const Cache = new NodeCache();

export default {
  async set(key: string, value: any, ttl: number) {
    return await Cache.set(key, value, ttl);
  },
  async get(key: string) {
    return await Cache.get(key);
  },
};

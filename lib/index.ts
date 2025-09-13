import debug, { type Debugger } from "debug";
import { LRUCache } from "lru-cache";

let cache = new LRUCache<string, Debugger>({
    max: 1000
});
function Debug(namespace: string, ...args: Parameters<Debugger>): ReturnType<Debugger> {
    return addDebugger(namespace)(...args);
}

export function addDebugger(namespace: string): Debugger {
    const d = cache.get(namespace) ?? debug(namespace);
    cache.set(namespace, d);
    return d;
}

export function removeDebugger(namespace: string): boolean {
    return cache.delete(namespace);
}

export function clearDebuggers(): void {
    cache.clear();
}

export function getCache(): LRUCache<string, Debugger> {
    return cache;
}

export function setCache(newCache: LRUCache<string, Debugger>): void {
    cache = newCache;
}

export default Debug;

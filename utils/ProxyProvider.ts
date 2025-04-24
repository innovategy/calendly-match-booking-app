// ProxyProvider: Provides a random proxy from a list and handles retry logic

// Example real proxies from a public proxy list (Elite/Anonymous HTTP proxies)
import { fetchPublicProxies } from './fetchProxies';

let PROXY_LIST = [
  'http://8.213.195.191:18080', // Thailand
  'http://43.135.150.45:13001', // US
  'http://138.201.159.200:8118', // Germany
  'http://38.180.2.107:3128', // Bulgaria
  'http://83.168.72.172:8081', // Poland
  'http://138.68.235.51:80', // US
];

// Automatically update proxy list at runtime
export async function updateProxyList(max = 20) {
  try {
    const proxies = await fetchPublicProxies(max);
    if (proxies.length) {
      PROXY_LIST = proxies;
      console.log(`[ProxyProvider] Proxy list updated with ${proxies.length} proxies.`);
    } else {
      console.warn('[ProxyProvider] No proxies fetched, using static fallback list.');
    }
  } catch (err) {
    console.warn('[ProxyProvider] Failed to fetch proxy list, using static fallback list.', err instanceof Error ? err.message : err);
  }
}
// Immediately update on module load
updateProxyList().catch(() => {});

export function getRandomProxy(exclude: string[] = []): string {
  const available = PROXY_LIST.filter(p => !exclude.includes(p));
  if (available.length === 0) throw new Error('No proxies available');
  return available[Math.floor(Math.random() * available.length)];
}

import { HttpsProxyAgent } from 'https-proxy-agent';

export async function proxyFetch(
  url: string,
  options: any = {},
  maxRetries = 3
): Promise<Response> {
  let tries = 0;
  let used: string[] = [];
  let lastError: any = null;
  while (tries < maxRetries) {
    let proxy: string;
    try {
      proxy = getRandomProxy(used);
      console.log(`[ProxyProvider] Attempt ${tries + 1}: Using proxy ${proxy}`);
      const agent = new HttpsProxyAgent(proxy);
      const resp = await fetch(url, { ...options, agent });
      if (!resp.ok) throw new Error('Proxy fetch failed: ' + resp.statusText);
      return resp;
    } catch (err) {
      console.warn(`[ProxyProvider] Proxy failed (${proxy}):`, err instanceof Error ? err.message : err);
      used.push(proxy!);
      lastError = err;
      tries++;
    }
  }
  console.error('[ProxyProvider] All proxies failed. Last error:', lastError?.message || lastError);
  throw new Error('All proxies failed: ' + (lastError?.message || lastError));
}

// Usage Example:
// const resp = await proxyFetch('https://calendly.com/api/booking/event_types/lookup?...');
// const data = await resp.json();

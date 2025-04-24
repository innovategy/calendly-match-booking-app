// fetchProxies.ts
// Utility to fetch a fresh proxy list from a public proxy API (plain text, IP:PORT per line)

import fetch from 'node-fetch';

const PUBLIC_PROXY_URL = 'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt'; // One proxy per line

export async function fetchPublicProxies(max: number = 20): Promise<string[]> {
  const resp = await fetch(PUBLIC_PROXY_URL);
  if (!resp.ok) throw new Error('Failed to fetch proxy list');
  const text = await resp.text();
  // Filter and limit to the first N proxies
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && /^\d+\.\d+\.\d+\.\d+:\d+$/.test(line))
    .slice(0, max)
    .map(ipport => 'http://' + ipport);
}

// Usage:
// const proxies = await fetchPublicProxies(10);
// console.log(proxies);

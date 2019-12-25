import fetch from 'node-fetch';
import * as HttpsProxyAgent from 'https-proxy-agent';

const proxyUrl = 'http://localhost:8001';
const agent = new HttpsProxyAgent(proxyUrl);

export const fetchWithProxy = async (url: string = '') => {
  const config = { agent };
  const data = await fetch(url, config);

  return data;
};

export const fetchWithoutProxy = async (url: string = '') => await fetch(url);

import axios from 'axios';
import type { AxiosResponse, Method } from 'axios';
import { v4 as uuid } from 'uuid';
import { createHmac } from 'crypto';

export default class NiceHash {
  private API_KEY: string;
  private API_SECRET_KEY: string;
  private ORGANIZATION_ID: string;
  
  constructor (apiKey: string, apiSecret: string, organizationId: string) {
    this.API_KEY = apiKey;
    this.API_SECRET_KEY = apiSecret;
    this.ORGANIZATION_ID = organizationId;
  }
  
  private async axios (url: string, method: Method): Promise<AxiosResponse> {
    const timestamp: number = Date.now();
    const nonce: string = uuid();
    const requestId: string = uuid();
    const hmac = this.hmacSHA256(timestamp, nonce, method, url);
    
    return await axios[method.toLowerCase()](url, {
      baseURL: 'https://api2.nicehash.com',
      url,
      method,
      headers: {
        'X-Time': timestamp,
        'X-Nonce': nonce,
        'X-Organization-Id': this.ORGANIZATION_ID,
        'X-Request-Id': requestId,
        'X-Auth': `${this.API_KEY}:${hmac}`
      },
    });
  }

  private hmacSHA256 (time: number, nonce: string, method: Method, endpoint: string, query?: string): string {
    const data = `${this.API_KEY}\0${time}\0${nonce}\0\0${this.ORGANIZATION_ID}\0\0${method}\0${endpoint}\0${query ?? ''}`;
  
    return createHmac('sha256', this.API_SECRET_KEY).update(data).digest('hex');
  }
  
  public async getRigs (): Promise<AxiosResponse> {
    return await this.axios('/main/api/v2/mining/rigs2', 'GET');
  }
  
  // Will be remove soon
  public getStaticRigs (): { data: { totalProfitability: number, miningRigs: { name: string, rigId: string, minerStatus: string, devices: { temperature: number }[] }[] } } {
    return {
      data: {
        totalProfitability: 0.00000235,
        miningRigs: [
          {
            name: 'Rig1-2060',
            rigId: 'azertyuiop',
            minerStatus: 'MINING',
            devices: [ { temperature: 55 }, { temperature: 56 }, { temperature: 61 } ]
          },
          {
            name: 'Rig2-2080ti1',
            rigId: 'qsdfghjklm',
            minerStatus: 'MINING',
            devices: [ { temperature: 45 }, { temperature: 47 }, { temperature: 64 }, { temperature: 68 } ]
          }
        ]
      }
    }
  }
}

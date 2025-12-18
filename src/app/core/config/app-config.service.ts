import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface AppConfig {
  apiBaseUrl: string;
  environment: string;
}

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private config!: AppConfig;

  constructor(private http: HttpClient) {}

  load(): Promise<void> {
    return firstValueFrom(
      this.http.get<AppConfig>('/assets/config/app-config.json')
    ).then(config => {
      this.config = config;
    });
  }

  get apiBaseUrl(): string {
    return this.config.apiBaseUrl;
  }

  get environment(): string {
    return this.config.environment;
  }
}

// src/services/ConfigService.ts

class ConfigService {
    private static BASE_URL: string = 'http://192.168.1.46:3307';
  
    // Optional: Add methods to update or retrieve configuration properties dynamically
    public static getBaseUrl(): string {
      return this.BASE_URL;
    }
  
    public static setBaseUrl(url: string): void {
      this.BASE_URL = url;
    }
  }
  
  export default ConfigService;
  
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Inicializamos un endpoint de tipo GET que llama al método getHello de appService
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from '@/app.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiQuery({ type: Number, name: 'limit', required: false })
  @ApiQuery({ type: Number, name: 'page', required: false })
  @ApiQuery({ type: String, name: 'discord_username', required: false })
  @ApiQuery({ type: String, name: 'patreon_username', required: false })
  getHello(@Query('id') id?: string): string {
    console.log('id', id);
    return this.appService.getHello(id);
  }
}

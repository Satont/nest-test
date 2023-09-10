import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from '@/app.service';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

class Req {
  @IsString()
  @IsOptional()
  id?: string;
}

@Controller('/users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Test' })
  @ApiQuery({ type: Number, name: 'limit', required: false })
  @ApiQuery({ type: Number, name: 'page', required: false })
  @ApiQuery({ type: String, name: 'discord_username', required: false })
  @ApiQuery({ type: String, name: 'patreon_username', required: false })
  @ApiResponse({ status: 200, type: String })
  async getHello(@Query() q: Req) {
    const result = await this.appService.getHello(q.id);

    return result;
  }
}

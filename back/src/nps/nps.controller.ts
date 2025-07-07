import { Controller, Get, Post, Body } from '@nestjs/common';
import { NpsService } from './nps.service';
import { Nps } from './nps.entity';

@Controller('nps')
export class NpsController {
  constructor(private readonly npsService: NpsService) {}

  @Post()
  async create(@Body() data: Partial<Nps>) {
    await this.npsService.create(data);
    return { message: 'Dados recebidos', data };
  }

  @Get()
  findAll() {
    return this.npsService.findAll();
  }
}

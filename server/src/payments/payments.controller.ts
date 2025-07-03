import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('stats')
  getStats() {
    return this.paymentsService.getStats();
  }

  @Get()
  getAll(@Query() query: any) {
    return this.paymentsService.findAll(query);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.paymentsService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.paymentsService.create(body);
  }
}


import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@ApiTags('Schedules (Lịch thu gom)')
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo lịch thu gom cho một Thôn (Seed Data)' })
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.create(createScheduleDto);
  }

  @Get('today')
  @ApiOperation({ summary: 'Xem lịch thu gom hôm nay của thôn/xóm' })
  @ApiQuery({ name: 'village', example: 'Thôn Đông', description: 'Tên thôn xóm' })
  getToday(@Query('village') village: string) {
    return this.schedulesService.getTodaySchedule(village);
  }
}
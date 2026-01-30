import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@ApiTags('Schedules (Lịch thu gom)')
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo lịch thu gom cho một Thôn (Seed Data)' })
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.create(createScheduleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả lịch (Admin Dashboard)' })
  findAll() {
    return this.schedulesService.findAll();
  }

  @Get('today')
  @ApiOperation({ summary: 'Xem lịch thu gom hôm nay của thôn/xóm' })
  @ApiQuery({ name: 'village', example: 'Thôn Đông', description: 'Tên thôn xóm' })
  getToday(@Query('village') village: string) {
    return this.schedulesService.getTodaySchedule(village);
  }

  @Get('detail')
  @ApiOperation({ summary: 'Lấy chi tiết toàn bộ lịch của một thôn' })
  @ApiQuery({ name: 'village', example: 'Thôn Đông' })
  getFullByVillage(@Query('village') village: string) {
    return this.schedulesService.getFullByVillage(village);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật lịch thu gom (Thôn/Xã/Giờ)' })
  @ApiParam({ 
    name: 'id', 
    description: 'ID của lịch cần sửa', 
    example: '697b3eb165dd8e0bb9889ae4' 
  })
  update(@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto) {
    return this.schedulesService.update(id, updateScheduleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa lịch thu gom của một thôn' })
  @ApiParam({ 
    name: 'id', 
    description: 'ID của lịch cần xóa', 
    required: true 
  })
  remove(@Param('id') id: string) {
    return this.schedulesService.remove(id);
  }
}
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@ApiTags('Locations (Điểm thu gom)')
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo điểm thu gom mới (Seed Data)' })
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả điểm thu gom (cho Map)' })
  findAll() {
    return this.locationsService.findAll();
  }

  @Get('nearest')
  @ApiOperation({ summary: 'Tìm điểm thu gom gần nhất (Bán kính 5km)' })
  @ApiQuery({ name: 'lat', type: Number, example: 21.028511, description: 'Vĩ độ người dùng' })
  @ApiQuery({ name: 'long', type: Number, example: 105.854444, description: 'Kinh độ người dùng' })
  findNearest(
    @Query('lat') lat: number,
    @Query('long') long: number
  ) {
    return this.locationsService.findNearest(Number(lat), Number(long));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin điểm thu gom' })
  @ApiParam({ 
    name: 'id', 
    description: 'ID của điểm thu gom', 
    example: '697b3eb165dd8e0bb9889ae4' 
  })
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationsService.update(id, updateLocationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa điểm thu gom' })
  @ApiParam({ 
    name: 'id', 
    description: 'ID của điểm thu gom cần xóa', 
    required: true 
  })
  remove(@Param('id') id: string) {
    return this.locationsService.remove(id);
  }
}
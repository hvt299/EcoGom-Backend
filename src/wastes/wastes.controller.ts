import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { WastesService } from './wastes.service';
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';
import { CreateWasteDto } from './dto/create-waste.dto';
import { UpdateWasteDto } from './dto/update-waste.dto';

@ApiTags('Wastes (Quản lý Rác)')
@Controller('wastes')
export class WastesController {
  constructor(private readonly wastesService: WastesService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo loại rác mới (Seed Data)' })
  create(@Body() createWasteDto: CreateWasteDto) { 
    return this.wastesService.create(createWasteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Tra cứu rác / Lấy danh sách' })
  @ApiQuery({ 
    name: 'keyword', 
    required: false, 
    description: 'Nhập tên rác (VD: vỏ lon, giấy vụn...)' 
  })
  findAll(@Query('keyword') keyword: string) {
    return this.wastesService.findAll(keyword);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin rác' })
  @ApiParam({ name: 'id', description: 'ID rác cần sửa' })
  update(@Param('id') id: string, @Body() updateWasteDto: UpdateWasteDto) {
    return this.wastesService.update(id, updateWasteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa loại rác vĩnh viễn (Admin Only)' })
  @ApiParam({ 
    name: 'id', 
    required: true, 
    description: 'ID của loại rác cần xóa', 
    example: '697b3eb165dd8e0bb9889ae4' 
  })
  remove(@Param('id') id: string) {
    return this.wastesService.remove(id);
  }
}
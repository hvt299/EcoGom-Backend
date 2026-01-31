import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { WasteCategory } from '../schemas/waste.schema';

class ProcessingStepDto {
  @ApiProperty({ example: 1, description: 'Thứ tự bước' })
  step_order: number;

  @ApiProperty({ example: 'Rửa sạch bên trong', description: 'Nội dung hướng dẫn' })
  content: string;
}

export class CreateWasteDto {
  @ApiProperty({ example: 'Vỏ lon nhôm', description: 'Tên chính của loại rác' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: ['lon bia', 'lon nước ngọt'], description: 'Các tên gọi địa phương' })
  local_names: string[];

  @ApiProperty({ enum: WasteCategory, example: WasteCategory.RECYCLE, description: 'Phân loại rác theo Luật Bảo vệ môi trường 2020 (3 nhóm)' })
  @IsEnum(WasteCategory, { message: 'Category phải thuộc 3 nhóm quy định' })
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 'kg', description: 'Đơn vị tính (kg, cái, chiếc...)' })
  @IsString()
  @IsNotEmpty()
  unit: string;

  @ApiProperty({ example: 30000, description: 'Giá tham khảo (VNĐ)' })
  @IsNumber()
  @IsOptional()
  estimated_price: number;

  @ApiProperty({ example: [], description: 'Danh sách link ảnh minh họa' })
  images: string[];

  @ApiProperty({ type: [ProcessingStepDto], description: 'Các bước xử lý rác' })
  processing_steps: ProcessingStepDto[];

  @ApiProperty({ example: true, description: 'Trạng thái kích hoạt' })
  is_active: boolean;
}
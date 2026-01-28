import { ApiProperty } from '@nestjs/swagger';

class ProcessingStepDto {
  @ApiProperty({ example: 1, description: 'Thứ tự bước' })
  step_order: number;

  @ApiProperty({ example: 'Rửa sạch bên trong', description: 'Nội dung hướng dẫn' })
  content: string;
}

export class CreateWasteDto {
  @ApiProperty({ example: 'Vỏ lon nhôm', description: 'Tên chính của loại rác' })
  name: string;

  @ApiProperty({ example: ['lon bia', 'lon nước ngọt'], description: 'Các tên gọi địa phương' })
  local_names: string[];

  @ApiProperty({ example: 'Tái chế', description: 'Phân loại rác' })
  category: string;

  @ApiProperty({ example: '30.000 đ/kg', description: 'Giá tham khảo' })
  estimated_price: string;

  @ApiProperty({ example: [], description: 'Danh sách link ảnh minh họa' })
  images: string[];

  @ApiProperty({ type: [ProcessingStepDto], description: 'Các bước xử lý rác' })
  processing_steps: ProcessingStepDto[];

  @ApiProperty({ example: true, description: 'Trạng thái kích hoạt' })
  is_active: boolean;
}
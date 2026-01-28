import { ApiProperty } from '@nestjs/swagger';

class GeoJsonDto {
  @ApiProperty({ example: 'Point', default: 'Point' })
  type: string;

  @ApiProperty({ 
    example: [108.2022, 16.0544], 
    description: 'Mảng tọa độ: [Kinh độ (Long), Vĩ độ (Lat)]' 
  })
  coordinates: number[];
}

export class CreateLocationDto {
  @ApiProperty({ example: 'Vựa ve chai Cô Ba', description: 'Tên điểm thu gom' })
  name: string;

  @ApiProperty({ example: 'SCRAP_DEALER', description: 'Loại: SCRAP_DEALER, PUBLIC_BIN...' })
  type: string;

  @ApiProperty({ example: 'Đối diện cổng chùa', description: 'Chỉ dẫn địa chỉ' })
  address_hint: string;

  @ApiProperty({ example: '0905123456', description: 'Số điện thoại liên hệ' })
  phone_number: string;

  @ApiProperty({ type: GeoJsonDto, description: 'Tọa độ bản đồ' })
  location: GeoJsonDto;

  @ApiProperty({ example: ['Giấy', 'Nhựa', 'Lon bia'], description: 'Các loại rác nhận thu mua' })
  accepted_items: string[];
}
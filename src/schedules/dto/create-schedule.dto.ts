import { ApiProperty } from '@nestjs/swagger';

class StandardScheduleDto {
  @ApiProperty({ example: 2, description: 'Thứ trong tuần (0=CN, 2=Thứ 3)' })
  day_of_week: number;

  @ApiProperty({ example: '16:00 - 17:00', description: 'Khung giờ' })
  time_slot: string;

  @ApiProperty({ example: 'Hữu cơ', description: 'Loại rác' })
  waste_type: string;
}

class SpecialEventDto {
  @ApiProperty({ example: 'Nghỉ Tết Nguyên Đán', description: 'Tên sự kiện' })
  name: string;

  @ApiProperty({ example: '2026-02-15', description: 'Ngày bắt đầu (YYYY-MM-DD)' })
  start_date: Date;

  @ApiProperty({ example: '2026-02-20', description: 'Ngày kết thúc' })
  end_date: Date;

  @ApiProperty({ example: true, description: 'Có hủy thu gom không?' })
  is_cancelled: boolean;

  @ApiProperty({ example: '', description: 'Giờ thay thế (nếu có)' })
  alternate_time: string;

  @ApiProperty({ example: 'Bà con giữ rác tại nhà', description: 'Ghi chú' })
  note: string;
}

export class CreateScheduleDto {
  @ApiProperty({ example: 'Thôn Đông', description: 'Tên Thôn/Xóm' })
  village_name: string;

  @ApiProperty({ example: 'Xã Hòa Tiến', description: 'Tên Xã/Phường' })
  ward: string;

  @ApiProperty({ type: [StandardScheduleDto], description: 'Danh sách lịch cố định' })
  standard_schedule: StandardScheduleDto[];

  @ApiProperty({ type: [SpecialEventDto], description: 'Danh sách sự kiện đặc biệt' })
  special_events: SpecialEventDto[];
}
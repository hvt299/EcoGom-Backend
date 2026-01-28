import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CollectionSchedule } from './schemas/schedule.schema';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectModel(CollectionSchedule.name) private scheduleModel: Model<CollectionSchedule>,
  ) {}

  async create(createScheduleDto: CreateScheduleDto) {
    const createdSchedule = new this.scheduleModel(createScheduleDto);
    return createdSchedule.save();
  }

  async getTodaySchedule(villageName: string) {
    const scheduleDoc = await this.scheduleModel.findOne({ village_name: villageName }).exec();
    
    if (!scheduleDoc) {
      throw new NotFoundException(`Không tìm thấy lịch của ${villageName}`);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const specialEvent = scheduleDoc.special_events.find(event => {
      const start = new Date(event.start_date);
      const end = new Date(event.end_date);
      return today >= start && today <= end;
    });

    if (specialEvent) {
      return {
        type: 'SPECIAL',
        message: specialEvent.name,
        is_cancelled: specialEvent.is_cancelled,
        time: specialEvent.alternate_time || null,
        note: specialEvent.note,
        waste_type: 'Theo hướng dẫn đặc biệt'
      };
    }

    const currentDayOfWeek = today.getDay();
    
    const standard = scheduleDoc.standard_schedule.find(
      s => s.day_of_week === currentDayOfWeek
    );

    if (standard) {
      return {
        type: 'STANDARD',
        message: 'Lịch thu gom định kỳ',
        is_cancelled: false,
        time: standard.time_slot,
        waste_type: standard.waste_type,
        note: null
      };
    }

    return {
      type: 'NONE',
      message: 'Hôm nay không có lịch thu gom',
      is_cancelled: false
    };
  }
}
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { CollectionSchedule, CollectionScheduleSchema } from './schemas/schedule.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: CollectionSchedule.name, schema: CollectionScheduleSchema }])],
  controllers: [SchedulesController],
  providers: [SchedulesService],
})
export class SchedulesModule {}

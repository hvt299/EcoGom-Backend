import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Waste, WasteSchema } from 'src/wastes/schemas/waste.schema';
import { Location, LocationSchema } from 'src/locations/schemas/location.schema';
import { CollectionSchedule, CollectionScheduleSchema } from 'src/schedules/schemas/schedule.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Waste.name, schema: WasteSchema },
      { name: Location.name, schema: LocationSchema },
      { name: CollectionSchedule.name, schema: CollectionScheduleSchema },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Waste, WasteSchema } from 'src/wastes/schemas/waste.schema';
import { Location, LocationSchema } from 'src/locations/schemas/location.schema';
import { CollectionSchedule, CollectionScheduleSchema } from 'src/schedules/schemas/schedule.schema';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Waste.name, schema: WasteSchema },
      { name: Location.name, schema: LocationSchema },
      { name: CollectionSchedule.name, schema: CollectionScheduleSchema },
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || "JWT_SECRET",
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
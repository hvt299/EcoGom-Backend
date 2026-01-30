import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Waste } from 'src/wastes/schemas/waste.schema';
import { Location } from 'src/locations/schemas/location.schema';
import { CollectionSchedule } from 'src/schedules/schemas/schedule.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Waste.name) private wasteModel: Model<Waste>,
    @InjectModel(Location.name) private locationModel: Model<Location>,
    @InjectModel(CollectionSchedule.name) private scheduleModel: Model<CollectionSchedule>,
  ) {}

  login(body: { passcode: string }) {
    const ADMIN_SECRET = process.env.ADMIN_SECRET || "Admin"; 
    
    if (body.passcode === ADMIN_SECRET) {
      return { success: true, token: "fake-jwt-token-ecogom-2026", message: "Login success" };
    }
    throw new UnauthorizedException("Mã bí mật không đúng!");
  }

  async getStats() {
    const [wasteCount, locationCount, scheduleCount] = await Promise.all([
      this.wasteModel.countDocuments(),
      this.locationModel.countDocuments(),
      this.scheduleModel.countDocuments(),
    ]);

    return {
      wasteCount,
      locationCount,
      scheduleCount,
      views: Math.floor(Math.random() * (5000 - 1000) + 1000),
      lastUpdated: new Date()
    };
  }
}
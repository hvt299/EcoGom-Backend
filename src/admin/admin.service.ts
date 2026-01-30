import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Waste } from 'src/wastes/schemas/waste.schema';
import { Location } from 'src/locations/schemas/location.schema';
import { CollectionSchedule } from 'src/schedules/schemas/schedule.schema';
import { User } from './schemas/user.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Waste.name) private wasteModel: Model<Waste>,
    @InjectModel(Location.name) private locationModel: Model<Location>,
    @InjectModel(CollectionSchedule.name) private scheduleModel: Model<CollectionSchedule>,
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async createAdmin(body: any) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    
    try {
      const newUser = new this.userModel({
        username: body.username,
        password: hashedPassword
      });
      return await newUser.save();
    } catch (e) {
      throw new Error("Username đã tồn tại");
    }
  }

  async login(body: { passcode: string }) {
    const user = await this.userModel.findOne({ username: 'admin' });
    const ADMIN_SECRET = process.env.ADMIN_SECRET || "Admin"; 

    if (!user && body.passcode === ADMIN_SECRET) {
      return { 
        success: true,
        message: "Login Dev Mode",
        access_token: this.jwtService.sign({ username: 'dev_admin', sub: 'dev' })
      };
    }

    if (!user) throw new UnauthorizedException("Tài khoản không tồn tại!");

    const isMatch = await bcrypt.compare(body.passcode, user.password);
    if (!isMatch) throw new UnauthorizedException("Mật khẩu sai rồi!");

    const payload = { username: user.username, sub: user._id };

    return {
      success: true,
      message: "Đăng nhập thành công!",
      access_token: this.jwtService.sign(payload),
    };
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
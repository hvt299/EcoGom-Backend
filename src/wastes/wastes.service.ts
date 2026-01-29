import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Waste } from './schemas/waste.schema';
import { CreateWasteDto } from './dto/create-waste.dto';

@Injectable()
export class WastesService {
  constructor(@InjectModel(Waste.name) private wasteModel: Model<Waste>) {}

  async create(createWasteDto: CreateWasteDto): Promise<Waste> {
    const createdWaste = new this.wasteModel(createWasteDto);
    return createdWaste.save();
  }

  async findAll(keyword?: string): Promise<Waste[]> {
    if (keyword) {
      return this.wasteModel.find({
        $or: [
          { name: { $regex: keyword, $options: 'i' } },
          { local_names: { $regex: keyword, $options: 'i' } },
        ],
      }).exec();
    }
    return this.wasteModel.find().exec();
  }

  async remove(id: string): Promise<any> {
    return this.wasteModel.findByIdAndDelete(id).exec();
  }
}
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location } from './schemas/location.schema';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationsService {
  constructor(@InjectModel(Location.name) private locationModel: Model<Location>) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const createdLocation = new this.locationModel(createLocationDto);
    return createdLocation.save();
  }

  async findAll(): Promise<Location[]> {
    return this.locationModel.find().exec();
  }

  async findNearest(lat: number, long: number): Promise<Location[]> {
    return this.locationModel.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [long, lat],
          },
          $maxDistance: 5000,
        },
      },
    }).exec();
  }

  async update(id: string, attrs: Partial<Location>): Promise<Location | null> {
    return this.locationModel.findByIdAndUpdate(id, attrs, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.locationModel.findByIdAndDelete(id).exec();
  }
}
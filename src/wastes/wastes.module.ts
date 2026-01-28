import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WastesService } from './wastes.service';
import { WastesController } from './wastes.controller';
import { Waste, WasteSchema } from './schemas/waste.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Waste.name, schema: WasteSchema }])],
  controllers: [WastesController],
  providers: [WastesService],
})
export class WastesModule {}

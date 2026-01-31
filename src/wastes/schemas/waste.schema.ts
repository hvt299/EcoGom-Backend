import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum WasteCategory {
  RECYCLE = 'Chất thải rắn có khả năng tái sử dụng, tái chế',
  FOOD = 'Chất thải thực phẩm',
  OTHER = 'Chất thải rắn sinh hoạt khác',
}

export class ProcessingStep {
  @Prop()
  step_order: number;

  @Prop()
  content: string;
}

@Schema({ timestamps: true })
export class Waste extends Document {
  @Prop({ required: true })
  name: string;

  @Prop([String])
  local_names: string[];

  @Prop({ 
    required: true,
    enum: WasteCategory,
    type: String
  })
  category: string;

  @Prop({ default: 'kg', required: true })
  unit: string;

  @Prop({ default: 0 })
  estimated_price: number;

  @Prop([String])
  images: string[];

  @Prop([ProcessingStep])
  processing_steps: ProcessingStep[];

  @Prop({ default: true })
  is_active: boolean;
}

export const WasteSchema = SchemaFactory.createForClass(Waste);
WasteSchema.index({ name: 'text', local_names: 'text' });
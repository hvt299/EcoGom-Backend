import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  @Prop()
  category: string;

  @Prop()
  estimated_price: string;

  @Prop([String])
  images: string[];

  @Prop([ProcessingStep])
  processing_steps: ProcessingStep[];

  @Prop({ default: true })
  is_active: boolean;
}

export const WasteSchema = SchemaFactory.createForClass(Waste);
WasteSchema.index({ name: 'text', local_names: 'text' });
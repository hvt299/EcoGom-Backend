import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class StandardSchedule {
  @Prop()
  day_of_week: number;

  @Prop()
  time_slot: string;

  @Prop()
  waste_type: string;
}

export class SpecialEvent {
  @Prop()
  name: string;

  @Prop()
  start_date: Date;

  @Prop()
  end_date: Date;

  @Prop()
  is_cancelled: boolean;

  @Prop()
  alternate_time: string;

  @Prop()
  note: string;
}

@Schema({ timestamps: true })
export class CollectionSchedule extends Document {
  @Prop({ required: true, index: true })
  village_name: string;

  @Prop()
  ward: string;

  @Prop([StandardSchedule])
  standard_schedule: StandardSchedule[];

  @Prop([SpecialEvent])
  special_events: SpecialEvent[];
}

export const CollectionScheduleSchema = SchemaFactory.createForClass(CollectionSchedule);
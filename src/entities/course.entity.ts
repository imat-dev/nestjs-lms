import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Course {
  @Prop()
  seqNo: number;

  @Prop({ required: true, unique: true, message: 'Name must be unique' })
  url: string;

  @Prop()
  iconUrl: string;

  @Prop()
  courseListIcon: string;

  @Prop({ required: true})
  description: string;

  @Prop()
  longDescription?: string;

  @Prop()
  category: string;

  @Prop()
  lessonsCount: number;

  @Prop()
  promo: boolean;
}

//mongoose schema
export const CourseSchema = SchemaFactory.createForClass(Course)


// export const CourseSchema = new mongoose.Schema({
//   seqNo: { type: Number, required: true },
//   url: { type: String, required: true },
//   iconUrl: String,
//   courseListIcon: String,
//   description: String,
//   longDescription: String,
//   category: String,
//   lessonsCount: Number,
//   promo: Boolean,
// });
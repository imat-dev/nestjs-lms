import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document  } from 'mongoose';

@Schema()
export class Lesson extends Document {
  @Prop({ required: true})
  description: string;

  @Prop({ required: true})
  duration: string;

  @Prop({ required: true})
  seqNo: string;

  @Prop({ required: true}) // change this
  course: string;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);

// import * as mongoose from 'mongoose';

// export const LessonSchema = new mongoose.Schema({
//     description: String,
//     duration: String,
//     seqNo: Number,
//     course: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Course'
//     },
// })

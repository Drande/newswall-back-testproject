import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { NewsTypes } from "../enums/news-types.enum";

@Schema({ _id: false, validateBeforeSave: true })
class SlideshowNoticeData {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  imageUrl: string;
}
const SlideshowNoticeDataSchema = SchemaFactory.createForClass(SlideshowNoticeData);

@Schema()
export class SlideshowNew {
  type: NewsTypes;
  title: string;
  text: string;
  tags: string[];

  @Prop({
    type: [SlideshowNoticeDataSchema],
    isRequired: true,
    validate: {
      validator: (v: unknown) => Array.isArray(v) && v.length > 0,
      message: (props) => `${props.value} Requires at least one valid element.`
    }
  })
  slides: SlideshowNoticeData[];
}

export const SlideshowNewSchema = SchemaFactory.createForClass(SlideshowNew);
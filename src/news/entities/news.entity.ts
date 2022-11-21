import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { NewsTypes } from "../enums/news-types.enum";

@Schema({ timestamps: true, discriminatorKey: 'type', validateBeforeSave: true })
export class News {
  
  @Prop()
  title: string;

  @Prop()
  text: string;

  @Prop()
  tags: string[];

  @Prop({
    type: String,
    required: true,
    enum: NewsTypes,
  })
  type: string;
  imageUrl?: string;
  slides?: { imageUrl: string, title: string }[];
  
}

export const NewsSchema = SchemaFactory.createForClass(News);
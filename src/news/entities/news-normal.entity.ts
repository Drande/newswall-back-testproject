import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { NewsTypes } from "../enums/news-types.enum";

@Schema({ _id: false, validateBeforeSave: true })
export class NormalNew {
  type: NewsTypes;
  title: string;
  text: string;
  tags: string[];

  @Prop({ type: String, required: true, minLength: 1 })
  imageUrl: string;
}

export const NormalNewSchema = SchemaFactory.createForClass(NormalNew);
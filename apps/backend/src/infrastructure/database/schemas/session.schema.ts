import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Question } from "../../../domain/value-objects/question.vo";

export type SessionDocument = Session & Document;

@Schema()
export class Session {
  @Prop({ required: true })
  id: string;

  @Prop({ type: [{ text: String }], required: true })
  questions: Question[];

  @Prop({ type: [String], required: true })
  answers: string[];

  @Prop({ required: true })
  currentQuestionIndex: number;

  @Prop({ required: true })
  startTime: Date;

  @Prop()
  endTime?: Date;
}

export const SessionSchema = SchemaFactory.createForClass(Session);

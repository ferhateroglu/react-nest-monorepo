// src/infrastructure/database/schemas/session.schema.ts

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type SessionDocument = Session & Document;

@Schema()
export class Session {
  @Prop({ required: true })
  id: string;

  @Prop({ type: [{ text: String }], required: true })
  questions: { text: string }[];

  @Prop({ type: [String], default: [] })
  answers: string[];

  @Prop({ required: true, default: 0 })
  currentQuestionIndex: number;

  @Prop({ required: true })
  startTime: Date;

  @Prop()
  endTime?: Date;
}

export const SessionSchema = SchemaFactory.createForClass(Session);

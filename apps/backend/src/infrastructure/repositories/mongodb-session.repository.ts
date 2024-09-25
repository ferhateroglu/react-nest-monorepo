import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ISessionRepository } from "../../domain/repositories/session.repository.interface";
import { Session as SessionEntity } from "../../domain/entities/session.entity";
import { Session } from "../database/schemas/session.schema";
import { Question } from "../../domain/value-objects/question.vo";

@Injectable()
export class MongoDbSessionRepository implements ISessionRepository {
  constructor(@InjectModel(Session.name) private sessionModel: Model<Session>) {}

  async create(session: SessionEntity): Promise<SessionEntity> {
    const createdSession = new this.sessionModel(session.toJSON());
    const savedSession = await createdSession.save();
    return this.mapToEntity(savedSession);
  }

  async findById(id: string): Promise<SessionEntity | null> {
    const session = await this.sessionModel.findById(id).exec();
    return session ? this.mapToEntity(session) : null;
  }

  async update(session: SessionEntity): Promise<SessionEntity> {
    const updatedSession = await this.sessionModel
      .findByIdAndUpdate(session.id, session.toJSON(), { new: true })
      .exec();
    return this.mapToEntity(updatedSession);
  }

  private mapToEntity(document: Session): SessionEntity {
    return new SessionEntity(
      document.id,
      document.questions.map((q) => new Question(q.text)),
      document.answers,
      document.currentQuestionIndex,
      document.startTime,
      document.endTime,
    );
  }
}

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, SortOrder } from "mongoose";
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

  async findAll(
    skip?: number,
    limit?: number,
  ): Promise<{
    sessions: SessionEntity[];
    meta: {
      totalCount: number;
      totalPages: number;
      currentPage: number;
      limit: number;
    };
  }> {
    const sort: { [key: string]: SortOrder } = { startTime: -1 };
    const [sessions, totalCount] = await Promise.all([
      this.sessionModel.find().sort(sort).skip(skip).limit(limit).exec(),
      this.sessionModel.countDocuments().exec(),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      sessions: sessions.map((session) => this.mapToEntity(session)),
      meta: {
        totalCount,
        totalPages,
        currentPage: Math.floor(skip / limit) + 1,
        limit,
      },
    };
  }

  async update(session: SessionEntity): Promise<SessionEntity> {
    const updatedSession = await this.sessionModel
      .findByIdAndUpdate(session.id, session.toJSON(), { new: true })
      .exec();
    return this.mapToEntity(updatedSession);
  }

  async countDocuments(): Promise<number> {
    return this.sessionModel.countDocuments().exec();
  }

  private mapToEntity(document: Session): SessionEntity {
    return new SessionEntity(
      document.questions.map((q) => new Question(q.text)),
      document.answers,
      document.currentQuestionIndex,
      document.startTime,
      document.endTime,
      document._id,
    );
  }
}

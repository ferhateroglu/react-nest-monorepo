import { Session } from "../entities/session.entity";

export interface ISessionRepository {
  create(session: Session): Promise<Session>;
  findById(id: string): Promise<Session | null>;
  findAll(
    skip?: number,
    limit?: number,
  ): Promise<{
    sessions: Session[];
    meta: {
      totalCount: number;
      totalPages: number;
      currentPage: number;
      limit: number;
    };
  }>;
  update(session: Session): Promise<Session>;
  countDocuments(): Promise<number>;
}

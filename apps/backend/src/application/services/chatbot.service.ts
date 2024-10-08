import { Injectable, Inject } from "@nestjs/common";
import { ISessionRepository } from "@domain/repositories/session.repository.interface";
import { Session } from "@domain/entities/session.entity";
import { Question } from "@domain/value-objects/question.vo";

@Injectable()
export class ChatbotService {
  private readonly questions: Question[] = [
    new Question("What is your favorite breed of cat, and why?"),
    new Question("How do you think cats communicate with their owners?"),
    new Question("Have you ever owned a cat? If so, what was their name and personality like?"),
    new Question("Why do you think cats love to sleep in small, cozy places?"),
    new Question("What's the funniest or strangest behavior you've ever seen a cat do?"),
    new Question("Do you prefer cats or kittens, and what's the reason for your preference?"),
    new Question("Why do you think cats are known for being independent animals?"),
    new Question("How do you think cats manage to land on their feet when they fall?"),
    new Question("What's your favorite fact or myth about cats?"),
    new Question("How would you describe the relationship between humans and cats in three words?"),
  ];

  constructor(
    @Inject("ISessionRepository")
    private readonly sessionRepository: ISessionRepository,
  ) {}
  async createSession(): Promise<Session> {
    const session = new Session(this.questions, [], 0, new Date());
    return this.sessionRepository.create(session);
  }

  async getSession(sessionId: string): Promise<Session | null> {
    return this.sessionRepository.findById(sessionId);
  }

  async getSessions(
    page: number = 1,
    limit: number = 20,
  ): Promise<{
    sessions: Session[];
    meta: { totalCount: number; totalPages: number; currentPage: number; limit: number };
  }> {
    const skip = (page - 1) * limit;
    return this.sessionRepository.findAll(skip, limit);
  }

  async getNextQuestion(sessionId: string): Promise<Question | null> {
    const session = await this.sessionRepository.findById(sessionId);
    if (!session) {
      throw new Error("Session not found");
    }
    return session.getCurrentQuestion();
  }

  async answerQuestion(sessionId: string, answer: string): Promise<void> {
    const session = await this.sessionRepository.findById(sessionId);
    if (!session) {
      throw new Error("Session not found");
    }
    session.answerCurrentQuestion(answer);
    await this.sessionRepository.update(session);
  }

  async isSessionCompleted(sessionId: string): Promise<boolean> {
    const session = await this.sessionRepository.findById(sessionId);
    if (!session) {
      throw new Error("Session not found");
    }
    return session.isCompleted();
  }

  async _getSessionsCount(): Promise<number> {
    return this.sessionRepository.countDocuments();
  }
}

import { Controller, Post, Get, Body, Param, Query } from "@nestjs/common";
import { ChatbotService } from "../../application/services/chatbot.service";
import { CreateSessionDto } from "../../application/dtos/create-session.dto";
import { AnswerQuestionDto } from "../../application/dtos/answer-question.dto";
import { Session } from "../../domain/entities/session.entity";

@Controller("chatbot")
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Get("sessions")
  async getSessions(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 20,
  ): Promise<{
    sessions: Session[];
    meta: { totalCount: number; totalPages: number; currentPage: number; limit: number };
  }> {
    const sessions = await this.chatbotService.getSessions(page, limit);
    return sessions;
  }

  @Post("sessions")
  async createSession(): Promise<{ sessionId: string }> {
    const session = await this.chatbotService.createSession();
    return { sessionId: session.id };
  }

  @Get("sessions/:sessionId")
  async getSession(@Param("sessionId") sessionId: string): Promise<{ session: Session }> {
    const session = await this.chatbotService.getSession(sessionId);
    return { session };
  }

  @Get("sessions/:sessionId/next-question")
  async getNextQuestion(@Param("sessionId") sessionId: string): Promise<{ question: string | null }> {
    try {
      const question = await this.chatbotService.getNextQuestion(sessionId);
      return { question: question ? question.text : null };
    } catch (error) {
      return { question: null };
    }
  }

  @Post("sessions/:sessionId/answers")
  async answerQuestion(
    @Param("sessionId") sessionId: string,
    @Body() answerQuestionDto: AnswerQuestionDto,
  ): Promise<void> {
    await this.chatbotService.answerQuestion(sessionId, answerQuestionDto.answer);
  }

  @Get("sessions/:sessionId/status")
  async getSessionStatus(@Param("sessionId") sessionId: string): Promise<{ completed: boolean }> {
    const completed = await this.chatbotService.isSessionCompleted(sessionId);
    return { completed };
  }
}

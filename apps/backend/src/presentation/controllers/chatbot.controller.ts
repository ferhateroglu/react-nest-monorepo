import { Controller, Post, Get, Body, Param } from "@nestjs/common";
import { ChatbotService } from "../../application/services/chatbot.service";
import { CreateSessionDto } from "../../application/dtos/create-session.dto";
import { AnswerQuestionDto } from "../../application/dtos/answer-question.dto";

@Controller("chatbot")
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post("sessions")
  async createSession(): Promise<{ sessionId: string }> {
    const session = await this.chatbotService.createSession();
    return { sessionId: session.id };
  }

  @Get("sessions/:sessionId/questions")
  async getNextQuestion(@Param("sessionId") sessionId: string): Promise<{ question: string | null }> {
    const question = await this.chatbotService.getNextQuestion(sessionId);
    return { question: question ? question.text : null };
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

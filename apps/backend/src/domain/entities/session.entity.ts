import { Question } from "../value-objects/question.vo";

export class Session {
  constructor(
    public readonly id: string,
    public readonly questions: Question[],
    public readonly answers: string[],
    public currentQuestionIndex: number,
    public readonly startTime: Date,
    public endTime?: Date,
  ) {}

  public answerCurrentQuestion(answer: string): void {
    if (this.isCompleted()) {
      throw new Error("All questions have been answered");
    }
    this.answers.push(answer);
    this.currentQuestionIndex++;
    if (this.isCompleted()) {
      this.endTime = new Date();
    }
  }

  public getCurrentQuestion(): Question | null {
    return this.isCompleted() ? null : this.questions[this.currentQuestionIndex];
  }

  public isCompleted(): boolean {
    return this.currentQuestionIndex >= this.questions.length;
  }

  public toJSON() {
    return {
      id: this.id,
      questions: this.questions,
      answers: this.answers,
      currentQuestionIndex: this.currentQuestionIndex,
      startTime: this.startTime,
      endTime: this.endTime,
    };
  }
}

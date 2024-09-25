export class Question {
  constructor(public readonly text: string) {}

  public toJSON() {
    return { text: this.text };
  }
}

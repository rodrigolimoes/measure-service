import { GenerativeModel } from "@google/generative-ai";

export interface Service {
  analyze: ({ image: string }) => Promise<number>;
}

export class MeasuresService {
  constructor(private geminiModel: GenerativeModel) {}

  analyze = async ({ image }) => {
    const result = await this.geminiModel.generateContent([
      {
        inlineData: {
          data: image,
          mimeType: "image/jpeg",
        },
      },
      {
        text: "Analyze this water/gas meter reading from the image and return the meter value",
      },
    ]);

    return Number(
      result.response
        .text()
        .match(/(\d+(\.\d+)?)/g)
        ?.join(" ")
    );
  };
}

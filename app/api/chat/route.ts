import { convertToCoreMessages, Message, streamText } from "ai";
import { z } from "zod";

import {
  CoreMessage,
  CoreUserMessage,
  ImagePart,
  LanguageModel,
  TextPart,
} from "ai";
import { createOpenAI, openai } from "@ai-sdk/openai";
// import { auth } from "@/app/(auth)/auth";
// import { deleteChatById, getChatById, saveChat } from "@/db/queries";

export async function POST(request: Request) {
  const {
    id,
    messages,
    data,
  }: { id: string; messages: Array<Message>; data: any } = await request.json();

  console.log("markdown----", data?.markdown);

  // const session = await auth();

  // if (!session) {
  //   return new Response("Unauthorized", { status: 401 });
  // }

  const coreMessages = convertToCoreMessages(messages);
  const updatedMessages = coreMessages.map((msg, index) =>
    index === 0 ? { ...msg, content: msg.content + data?.markdown || "" } : msg
  );

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    system:
      "you are a friendly assistant! keep your responses concise and helpful.",
    messages: updatedMessages,
    maxSteps: 5,
    // tools: {
    //   getWeather: {
    //     description: "Get the current weather at a location",
    //     parameters: z.object({
    //       latitude: z.number(),
    //       longitude: z.number(),
    //     }),
    //     execute: async ({ latitude, longitude }) => {
    //       const response = await fetch(
    //         `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&daily=sunrise,sunset&timezone=auto`
    //       );

    //       const weatherData = await response.json();
    //       return weatherData;
    //     },
    //   },
    // },
    // onFinish: async ({ responseMessages }) => {
    //   if (session.user && session.user.id) {
    //     try {
    //       await saveChat({
    //         id,
    //         messages: [...coreMessages, ...responseMessages],
    //         userId: session.user.id,
    //       });
    //     } catch (error) {
    //       console.error("Failed to save chat");
    //     }
    //   }
    // },
    // experimental_telemetry: {
    //   isEnabled: true,
    //   functionId: "stream-text",
    // },
  });

  return result.toDataStreamResponse({});
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Not Found", { status: 404 });
  }

  const session = await auth();

  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const chat = await getChatById({ id });

    if (chat.userId !== session.user.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    await deleteChatById({ id });

    return new Response("Chat deleted", { status: 200 });
  } catch (error) {
    return new Response("An error occurred while processing your request", {
      status: 500,
    });
  }
}

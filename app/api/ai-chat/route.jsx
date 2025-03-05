import { chatSession } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt } = await req.json();
  try {
    const result = await chatSession.sendMessage(prompt);
    const AiResponse = result.response.text();
    return NextResponse.json({result:AiResponse})

  } catch (e) {
    console.log("something went wrong in Ai");
    return NextResponse.json({ error: e });
  }
}

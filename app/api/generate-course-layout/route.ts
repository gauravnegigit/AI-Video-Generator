"use server";
import { NextRequest, NextResponse } from 'next/server';
import { Course_config_prompt } from '@/data/Prompt';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

export async function POST(request: NextRequest) {

    const { userInput, courseId, type } = await request.json();

    const llm = new ChatGoogleGenerativeAI({
      model: 'gemini-2.5-flash',
      temperature: 0,
      apiKey: process.env.GOOGLE_API_KEY,
    });

    const prompt = ChatPromptTemplate.fromMessages([
      ['system', Course_config_prompt],
      ['human', 'Course topic is: {userInput}'],
    ]);

    const formattedPrompt = await prompt.formatMessages({
      userInput,
    });

    const response = await llm.invoke(formattedPrompt);

    const rawOutput = response.content as string;
    const JSONResult = JSON.parse(rawOutput);

    // Save to DB

    return NextResponse.json(JSONResult );
  
}
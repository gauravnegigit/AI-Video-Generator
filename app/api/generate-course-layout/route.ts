"use server";
import { NextRequest, NextResponse } from 'next/server';
import { Course_config_prompt } from '@/data/Prompt';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { coursesTable , CourseSchema } from '@/config/schema';
import { db } from '../../../config/dbConnect'; 
import { currentUser } from '@clerk/nextjs/server';
import { json } from 'stream/consumers';
import {z} from "zod";

export async function POST(request: NextRequest) {
  const { userInput, courseId, type } = await request.json();
  const user = await currentUser()

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

  const new_llm = llm.withStructuredOutput(CourseSchema);

  const response = await new_llm.invoke(formattedPrompt);

  // Save to DB
  const courseResult = await db.insert(coursesTable).values({
    courseId: courseId ,
    courseName: response.courseName , 
    userInput: userInput ,
    type: type , 
    courseLayout: response.courseLayout , 
    userId: user?.primaryEmailAddress?.emailAddress || ""
  }).returning()

  return NextResponse.json(courseResult[0]);
  
}
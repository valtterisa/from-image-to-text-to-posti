import OpenAI from "openai";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text, filename } = await req.json();

    const client = new OpenAI({
      apiKey: process.env["OPENAI_API_KEY"]
    });

    // Create a structured prompt that specifies the exact properties you want to extract
    const systemPrompt = {
      role: 'system',
      content: `Extract the following properties from the input text and return them in JSON format:
      - name: [Extract the name of individual]
      - mobile: [Extract the clients mobile number]
      - address1: [Extract clients street address]
      - zipcode: [Extract clients zipcode]
      - city: [Extract the clients city which he/she lives in]
      - country: [Extract the country where user lives as ISO 3166-1 alpha-2 two-letter country code]
      
      Return only valid JSON without any additional text or explanation.
      
      Example output format:
      {
        name: "Ricky Receiver",
        mobile: +358441234567,
        address1: "Keskuskatu 3",
        zipcode: "00104",
        city: "Helsinki",
        country: "FI"
      }`
    };


    // add correct chat type
    const userPrompt: any = {
      role: 'user',
      content: text,
      name: "null" // is this necessary? Even the full user prompt??
    };

    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages: [systemPrompt, userPrompt],
      model: 'gpt-4o-mini',
      response_format: { type: "json_object" }, // Ensures JSON response
      temperature: 0.7
    };

    const chatCompletion = await client.chat.completions.create(params);
    const result = chatCompletion.choices[0].message.content;

    const parsedResult = JSON.parse(result || '{}');

    return NextResponse.json(parsedResult);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
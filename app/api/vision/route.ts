// app/api/vision/route.ts
import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import type { ChatCompletionContentPart } from 'openai/resources/index';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!
});

const systemPrompt = {
    role: 'system' as const,
    content: `Extract the following properties from the input text and return them in JSON format:
  - name: [Extract the name of individual]
  - mobile: [Extract the clients mobile number]
  - address1: [Extract clients street address]
  - zipcode: [Extract clients zipcode]
  - city: [Extract the clients city which he/she lives in]
  - country: [Extract the country where user lives as ISO 3166-1 alpha-2 two-letter country code]
  Return only valid JSON without any additional text or explanation.`
};

export async function POST(request: Request) {
    try {
        const { imageUrl } = await request.json();


        if (!imageUrl) {
            return NextResponse.json(
                { error: 'No image URL provided' },
                { status: 400 }
            );
        }

        const userMessageContent: ChatCompletionContentPart[] = [
            {
                type: 'text',
                text: 'Extract the required information from this image.'
            },
            {
                type: 'image_url',
                image_url: { url: imageUrl }
            }
        ];

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                systemPrompt,
                {
                    role: "user",
                    content: userMessageContent
                }
            ],
            max_tokens: 500,
            response_format: { type: "json_object" }
            // OpenAI vision docs
            // messages: [
            //     {
            //         role: "user",
            //         content: [
            //             { type: "text", text: "What's in this image?" },
            //             {
            //                 type: "image_url",
            //                 image_url: {
            //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
            //                 },
            //             },
            //         ],
            //     },
            // ],
        });

        const content = response.choices[0]?.message?.content;

        if (!content) {
            throw new Error('No content in OpenAI response');
        }

        const extractedData = JSON.parse(content) as ExtractedData;

        return NextResponse.json({
            success: true,
            data: extractedData
        });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Failed to process image' },
            { status: 500 }
        );
    }
}

interface ExtractedData {
    name: string;
    mobile: string;
    address1: string;
    zipcode: string;
    city: string;
    country: string;
}
import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import settings from '@/app/data/settings.json';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
    try {
        const { message, conversationHistory } = await request.json();

        // Get custom instructions directly from imported settings
        const customInstructions = settings.chat.customInstructions;

        // Prepare the messages array for the API
        const messages = [
            // System message with custom instructions
            {
                role: 'system',
                content: customInstructions
            },
            // Previous conversation history
            ...conversationHistory,
            // Current user message
            {
                role: 'user',
                content: message
            }
        ];

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: messages,
            temperature: 0.7,
            max_tokens: 400,
        });

        const aiResponse = completion.choices[0].message.content || 
            "I apologize, but I couldn't generate a response.";

        return NextResponse.json({ message: aiResponse });
    } catch (error) {
        console.error('OpenAI API error:', error);
        return NextResponse.json(
            { message: "An error occurred while processing your request." },
            { status: 500 }
        );
    }
} 
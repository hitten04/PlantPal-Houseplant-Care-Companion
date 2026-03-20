# PlantPal - Houseplant Care Companion 🌱

A purpose-built chatbot for houseplant enthusiasts, designed to help you care for your green friends with expert advice on watering, lighting, troubleshooting, and more.

## Why Houseplants?

I chose houseplants as the topic because:
- It's a practical, everyday use case that provides real value
- The domain is specific enough to feel specialized but broad enough to be useful
- It allows for a warm, encouraging personality that matches the nurturing nature of plant care
- The visual design opportunities (botanical colors, organic shapes) make it perfect for showcasing frontend thinking

## Features

- **Conversational AI**: Powered by Google Gemini 1.5 Pro with plant care expertise
- **Smart Suggestions**: Quick-start prompts for common questions
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Real-time Streaming**: Responses stream in naturally
- **Thoughtful UX**: Loading states, error handling, and empty states designed with care
- **Botanical Theme**: Green color palette and plant-inspired UI elements

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom botanical color palette
- **AI**: Google Gemini 2.5 flash 
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your Google Gemini API key:
   ```
   GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
   ```
   
   Get your API key from: https://makersuite.google.com/app/apikey

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Deployment

Deploy to Vercel with one click:
1. Push to GitHub
2. Import to Vercel
3. Add `GOOGLE_GENERATIVE_AI_API_KEY` environment variable
4. Deploy

## Frontend Thinking Highlights

- **First Impression**: Clean, inviting interface with clear purpose
- **Empty State**: Welcoming message with suggested questions to get started
- **Loading States**: Animated spinner with "PlantPal is thinking..." message
- **Error Handling**: Friendly error messages that don't break the experience
- **Visual Hierarchy**: Chat bubbles, colors, and spacing guide the eye naturally
- **Accessibility**: Semantic HTML, proper contrast ratios, keyboard navigation
- **Mobile-First**: Responsive design that works on any device

## License

MIT

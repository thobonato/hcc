# Human Chemical Co.

A web application for chemistry analysis featuring interactive 2D/3D molecular visualizations and AI-assisted chemical information.

## Features

- **Interactive Molecule Visualization**: View chemical structures in both 2D and 3D, with fullscreen support
- **AI Chat Interface**: Get information and insights about chemical compounds
- **Comprehensive Chemical Data**: Access chemical properties, endpoint information, and citations
- **User Authentication**: Google OAuth login with personalized settings
- **Chat History**: Save and search through previous conversations

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, Framer Motion
- **Visualization**: 3Dmol.js, SmilesDrawer
- **Backend**: Supabase, OpenAI API
- **Authentication**: Google OAuth via Supabase

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Supabase account
- OpenAI API key
- Google OAuth credentials

### Installation

1. Clone the repository
```bash
git clone https://github.com/thobonato/hcc.git
cd hcc
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
```bash
touch .env.local

# in .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

4. Run dev server
```bash
npm run dev
# or
yarn dev
```

5. Open http://localhost:3000 in your browser

### Database Setup
The application uses Supabase with the following tables:

- user_settings: Store user preferences
- chat_sessions: Store chat history metadata
- chat_messages: Store individual chat messages

License
This project is licensed under the MIT License - see the LICENSE file for details.

### Acknowledgements
- Built with [Next.js](https://nextjs.org/)
- 3D visualization powered by [3Dmol.js](https://github.com/3dmol)
- 2D structure rendering by [SmilesDrawer](https://github.com/reymond-group/smilesDrawer)

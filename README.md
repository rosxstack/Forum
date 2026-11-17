# Our Forum (Next.js + Supabase)

A simple no-login forum for three members: Christy, Roshan and Rose.

## Setup
1. Create a free project at https://supabase.com
2. In the SQL Editor, run everything in `schema.sql`
3. Copy `.env.example` to `.env.local` and fill in your Project URL and anon key
   (Supabase: Project Settings -> API)
4. Install and run:

       npm install
       npm run dev

   Open http://localhost:3000

## Deploy free
1. Push to GitHub
2. Import the repo at https://vercel.com (Hobby plan)
3. Add the two environment variables from `.env.example`
4. Deploy

# Supabase Authentication Setup Guide

This guide will help you set up Supabase authentication for the AnimeVerse e-commerce application.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Fill in your project details:
   - **Name**: Your project name (e.g., "animeverse")
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to your users
5. Click "Create new project" and wait for it to be set up (takes 1-2 minutes)

## Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** (gear icon in the sidebar)
2. Click on **API** in the settings menu
3. You'll find:
   - **Project URL**: Copy this value
   - **anon/public key**: Copy this value (this is safe to use in client-side code)

## Step 3: Configure Environment Variables

1. In the root of your project, create a `.env` file (if it doesn't exist)
2. Add the following variables:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace `your_project_url_here` and `your_anon_key_here` with the values from Step 2.

**Example:**
```env
VITE_SUPABASE_URL=https://wxdyggipqqjdhxytxxcj.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4ZHlnZ2lwcXFqZGh4eXR4eGNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3MDU5MzcsImV4cCI6MjA4MTI4MTkzN30.addyp8Lrs4mAPUgEinG0a7bs7QeKAkZ9xVArWLS92hQ.example
```

## Step 4: Configure Authentication Settings

1. In your Supabase dashboard, go to **Authentication** → **Settings**
2. Under **Auth Providers**, ensure **Email** is enabled
3. Configure email settings:
   - **Enable Email Signup**: ON
   - **Confirm email**: OFF (for development) or ON (for production)
   - **Secure email change**: ON (recommended)

## Step 5: Set Up Database Schema (Optional)

If you want to store additional user information:

1. Go to **SQL Editor** in your Supabase dashboard
2. Run this SQL to create a profiles table:

```sql
-- Create a table for public profiles
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Create policy to allow users to view their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Create policy to allow users to update their own profile
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Create policy to allow users to insert their own profile
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);
```

## Step 6: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/auth` in your browser
3. Try creating a new account
4. Check your Supabase dashboard → **Authentication** → **Users** to see if the user was created
5. Try logging in with the credentials you just created

## Troubleshooting

### "Invalid API key" error
- Make sure your `.env` file is in the root directory
- Restart your development server after creating/updating `.env`
- Verify the keys are correct (no extra spaces or quotes)

### "Email already registered" error
- This is normal if you try to sign up with an existing email
- Use a different email or try logging in instead

### Users not appearing in database
- Check the **Authentication** → **Users** section in Supabase dashboard
- Verify email confirmation is disabled for testing (or check your email for confirmation link)

### Protected routes not working
- Make sure you've restarted the dev server after adding environment variables
- Check browser console for any errors
- Verify the Supabase client is initialized correctly

## Security Notes

- Never commit your `.env` file to version control
- The `.env.example` file is safe to commit (it doesn't contain real keys)
- The `anon` key is safe for client-side use (it's public by design)
- For production, consider enabling email confirmation
- Set up proper Row Level Security (RLS) policies for any custom tables

## Next Steps

- Customize user profiles
- Add social authentication (Google, GitHub, etc.)
- Set up email templates
- Configure password reset functionality
- Add user roles and permissions

For more information, visit the [Supabase Documentation](https://supabase.com/docs).






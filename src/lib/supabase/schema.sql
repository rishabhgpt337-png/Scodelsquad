-- RAAHI DATABASE SCHEMA (PostgreSQL / Supabase)

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (extends Supabase Auth)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Trips table
create table if not exists public.trips (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  destination text not null,
  state text not null,
  arrival_date date not null,
  departure_date date not null,
  duration_days integer not null,
  budget_range text not null,
  group_size integer default 1,
  pace text check (pace in ('relaxing', 'balanced', 'packed')),
  selected_activities jsonb default '[]'::jsonb,
  status text default 'planned' check (status in ('planned', 'booked', 'completed', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS (Row Level Security)
alter table public.profiles enable row level security;
alter table public.trips enable row level security;

-- Policies for profiles
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Policies for trips
create policy "Users can view own trips"
  on public.trips for select
  using (auth.uid() = user_id or user_id is null);

create policy "Users can insert trips"
  on public.trips for insert
  with check (auth.uid() = user_id or user_id is null);

create policy "Users can update own trips"
  on public.trips for update
  using (auth.uid() = user_id);

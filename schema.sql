-- Run this in Supabase: SQL Editor -> New query -> Run
drop table if exists replies;
drop table if exists threads;

create table threads (
  id bigint generated always as identity primary key,
  title text not null check (char_length(title) between 3 and 150),
  body text not null check (char_length(body) <= 5000),
  author text not null check (author in ('Christy', 'Roshan', 'Rose')),
  created_at timestamptz default now()
);

create table replies (
  id bigint generated always as identity primary key,
  thread_id bigint not null references threads(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 5000),
  author text not null check (author in ('Christy', 'Roshan', 'Rose')),
  created_at timestamptz default now()
);

alter table threads enable row level security;
alter table replies enable row level security;

create policy "read threads" on threads for select to anon using (true);
create policy "read replies" on replies for select to anon using (true);
create policy "insert threads" on threads for insert to anon with check (true);
create policy "insert replies" on replies for insert to anon with check (true);

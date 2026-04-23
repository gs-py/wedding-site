-- =============================================================
-- Wedding site schema — run the whole file in Supabase SQL editor.
-- Safe to re-run: uses IF NOT EXISTS / DROP IF EXISTS.
-- =============================================================

-- Extensions ----------------------------------------------------
create extension if not exists "pgcrypto";

-- Tables --------------------------------------------------------

create table if not exists photos (
  id uuid primary key default gen_random_uuid(),
  guest_name   text not null,
  guest_id     text not null,
  image_url    text not null,
  storage_path text not null,
  hearts_count int default 0,
  uploaded_at  timestamptz default now()
);

create table if not exists hearts (
  id uuid primary key default gen_random_uuid(),
  photo_id uuid references photos(id) on delete cascade,
  guest_id text not null,
  created_at timestamptz default now(),
  unique (photo_id, guest_id)
);

create table if not exists wishes (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null,
  message    text not null check (char_length(message) <= 500),
  created_at timestamptz default now()
);

-- Indexes -------------------------------------------------------
create index if not exists idx_photos_uploaded_at on photos (uploaded_at desc);
create index if not exists idx_photos_hearts      on photos (hearts_count desc);
create index if not exists idx_photos_guest_id    on photos (guest_id);
create index if not exists idx_hearts_photo       on hearts (photo_id);
create index if not exists idx_wishes_created     on wishes (created_at desc);

-- Hearts counter trigger ---------------------------------------
create or replace function update_hearts_count()
returns trigger as $$
begin
  if tg_op = 'INSERT' then
    update photos set hearts_count = hearts_count + 1 where id = new.photo_id;
  elsif tg_op = 'DELETE' then
    update photos set hearts_count = greatest(0, hearts_count - 1) where id = old.photo_id;
  end if;
  return null;
end;
$$ language plpgsql;

drop trigger if exists hearts_count_trigger on hearts;
create trigger hearts_count_trigger
after insert or delete on hearts
for each row execute function update_hearts_count();

-- =============================================================
-- Row-level security
-- =============================================================

alter table photos enable row level security;
alter table hearts enable row level security;
alter table wishes enable row level security;

-- PHOTOS
drop policy if exists "Public read photos"    on photos;
drop policy if exists "Public insert photos"  on photos;
drop policy if exists "Admin delete photos"   on photos;
create policy "Public read photos"   on photos for select using (true);
create policy "Public insert photos" on photos for insert with check (true);
create policy "Admin delete photos"  on photos for delete using (auth.role() = 'authenticated');

-- HEARTS
drop policy if exists "Public read hearts"        on hearts;
drop policy if exists "Public insert hearts"      on hearts;
drop policy if exists "Public delete own hearts"  on hearts;
create policy "Public read hearts"       on hearts for select using (true);
create policy "Public insert hearts"     on hearts for insert with check (true);
create policy "Public delete own hearts" on hearts for delete using (true);

-- WISHES
drop policy if exists "Public read wishes"   on wishes;
drop policy if exists "Public insert wishes" on wishes;
drop policy if exists "Admin delete wishes"  on wishes;
create policy "Public read wishes"   on wishes for select using (true);
create policy "Public insert wishes" on wishes for insert with check (true);
create policy "Admin delete wishes"  on wishes for delete using (auth.role() = 'authenticated');

-- =============================================================
-- Storage: buckets + policies
-- Run after creating the buckets in the Storage UI, OR use the
-- insert statements below to create them here.
-- =============================================================

-- Create buckets (public). Ignore errors if they already exist.
insert into storage.buckets (id, name, public)
values ('wedding-photos', 'wedding-photos', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('couple-photos', 'couple-photos', true)
on conflict (id) do nothing;

-- wedding-photos: anyone can read & upload, only authenticated can delete
drop policy if exists "wedding-photos read"   on storage.objects;
drop policy if exists "wedding-photos insert" on storage.objects;
drop policy if exists "wedding-photos delete" on storage.objects;

create policy "wedding-photos read" on storage.objects
  for select using (bucket_id = 'wedding-photos');

create policy "wedding-photos insert" on storage.objects
  for insert with check (bucket_id = 'wedding-photos');

create policy "wedding-photos delete" on storage.objects
  for delete using (bucket_id = 'wedding-photos' and auth.role() = 'authenticated');

-- couple-photos: anyone can read, only authenticated (admin) can write
drop policy if exists "couple-photos read"   on storage.objects;
drop policy if exists "couple-photos insert" on storage.objects;
drop policy if exists "couple-photos update" on storage.objects;
drop policy if exists "couple-photos delete" on storage.objects;

create policy "couple-photos read" on storage.objects
  for select using (bucket_id = 'couple-photos');

create policy "couple-photos insert" on storage.objects
  for insert with check (bucket_id = 'couple-photos' and auth.role() = 'authenticated');

create policy "couple-photos update" on storage.objects
  for update using (bucket_id = 'couple-photos' and auth.role() = 'authenticated');

create policy "couple-photos delete" on storage.objects
  for delete using (bucket_id = 'couple-photos' and auth.role() = 'authenticated');

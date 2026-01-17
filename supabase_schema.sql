create table public.customers (
  guid uuid not null primary key,
  company text,
  name text,
  position text,
  phone text,
  email text,
  address text,
  fax text,
  tagline text,
  banner_headline text,
  description text,
  profile_image text,
  banner_image text,
  page_title text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.products (
  id text not null,
  customer_guid uuid references public.customers(guid) on delete cascade,
  name text,
  "desc" text,
  badge text,
  badge_color text,
  img text,
  spec_title text,
  spec_description text,
  spec_efficiency text,
  spec_material text,
  spec_usage text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (customer_guid, id)
);

alter table public.customers enable row level security;
create policy "Allow public read access" on public.customers for select using (true);

alter table public.products enable row level security;
create policy "Allow public read access" on public.products for select using (true);

create policy "Allow insert for everyone" on public.customers for insert with check (true);
create policy "Allow insert for everyone" on public.products for insert with check (true);

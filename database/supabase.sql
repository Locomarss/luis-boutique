create table if not exists public.lb_catalog (
  id text primary key,
  payload jsonb not null,
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.lb_catalog enable row level security;

drop policy if exists "public read catalog" on public.lb_catalog;
create policy "public read catalog"
on public.lb_catalog
for select
to anon
using (true);

drop policy if exists "public write catalog" on public.lb_catalog;
create policy "public write catalog"
on public.lb_catalog
for all
to anon
using (true)
with check (true);

insert into public.lb_catalog (id, payload)
values ('catalog', '{}'::jsonb)
on conflict (id) do nothing;

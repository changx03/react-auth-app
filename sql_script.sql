create extension if not exists "uuid-ossp";

-- do not use "user" as table name!
create table appuser (
	userid uuid primary key default uuid_generate_v1(),
	username varchar not null,
	firstname varchar not null,
	surname varchar not null,
	email varchar not null,
	passwordhash varchar not null
);

alter table appuser ADD CONSTRAINT unique_email UNIQUE (email);
alter table appuser ADD CONSTRAINT unique_surname UNIQUE (surname);

create unique index appuser_idx_username on appuser (username);
create unique index appuser_idx_email on appuser (email);

grant select, INSERT, UPDATE, DELETE on appuser to appserver;

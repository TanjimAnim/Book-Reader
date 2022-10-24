-- Table: public.accounts

-- DROP TABLE IF EXISTS public.accounts;

CREATE TABLE IF NOT EXISTS public.accounts
(
    user_id integer NOT NULL DEFAULT nextval('accounts_id_seq'::regclass),
    username text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default",
    token text COLLATE pg_catalog."default",
    CONSTRAINT user_pk PRIMARY KEY (user_id),
    CONSTRAINT user_uk_email UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.accounts
    OWNER to postgres;
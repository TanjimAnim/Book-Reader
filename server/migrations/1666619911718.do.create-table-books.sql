-- Table: public.books

-- DROP TABLE IF EXISTS public.books;

CREATE TABLE IF NOT EXISTS public.books
(
    book_id integer NOT NULL DEFAULT nextval('books_book_id_seq'::regclass),
    book_name character varying COLLATE pg_catalog."default",
    book_author character varying COLLATE pg_catalog."default",
    book_slug character varying COLLATE pg_catalog."default",
    book_summary character varying COLLATE pg_catalog."default",
    year integer,
    user_id integer,
    favorite boolean DEFAULT false,
    CONSTRAINT books_pk PRIMARY KEY (book_id),
    CONSTRAINT book_fk_user_id FOREIGN KEY (user_id)
        REFERENCES public.accounts (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.books
    OWNER to postgres;
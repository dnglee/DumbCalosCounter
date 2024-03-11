--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: dbo; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA dbo;


ALTER SCHEMA dbo OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: tbl_foods; Type: TABLE; Schema: dbo; Owner: postgres
--

CREATE TABLE dbo.tbl_foods (
    fd_id integer NOT NULL,
    name character varying(300),
    calories integer,
    protein integer,
    carbs integer,
    fats integer
);


ALTER TABLE dbo.tbl_foods OWNER TO postgres;

--
-- Name: tbl_foods_fd_id_seq; Type: SEQUENCE; Schema: dbo; Owner: postgres
--

CREATE SEQUENCE dbo.tbl_foods_fd_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE dbo.tbl_foods_fd_id_seq OWNER TO postgres;

--
-- Name: tbl_foods_fd_id_seq; Type: SEQUENCE OWNED BY; Schema: dbo; Owner: postgres
--

ALTER SEQUENCE dbo.tbl_foods_fd_id_seq OWNED BY dbo.tbl_foods.fd_id;


--
-- Name: tbl_foods fd_id; Type: DEFAULT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY dbo.tbl_foods ALTER COLUMN fd_id SET DEFAULT nextval('dbo.tbl_foods_fd_id_seq'::regclass);


--
-- Data for Name: tbl_foods; Type: TABLE DATA; Schema: dbo; Owner: postgres
--

COPY dbo.tbl_foods (fd_id, name, calories, protein, carbs, fats) FROM stdin;
1	SqlFoods	230	100	10	0
\.


--
-- Name: tbl_foods_fd_id_seq; Type: SEQUENCE SET; Schema: dbo; Owner: postgres
--

SELECT pg_catalog.setval('dbo.tbl_foods_fd_id_seq', 1, true);


--
-- Name: tbl_foods tbl_foods_pkey; Type: CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY dbo.tbl_foods
    ADD CONSTRAINT tbl_foods_pkey PRIMARY KEY (fd_id);


--
-- PostgreSQL database dump complete
--


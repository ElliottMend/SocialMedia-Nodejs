--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.1

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    comment_id integer NOT NULL,
    body text NOT NULL,
    date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    user_id integer NOT NULL,
    post_id integer
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: comments_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_comment_id_seq OWNER TO postgres;

--
-- Name: comments_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_comment_id_seq OWNED BY public.comments.comment_id;


--
-- Name: follows; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.follows (
    follower_user_id integer,
    following_user_id integer
);


ALTER TABLE public.follows OWNER TO postgres;

--
-- Name: likes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.likes (
    post_id integer,
    user_id integer
);


ALTER TABLE public.likes OWNER TO postgres;

--
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    message_id integer NOT NULL,
    room_id integer,
    body character varying(200) NOT NULL,
    message_timestamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    user_id integer
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- Name: message_message_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.message_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.message_message_id_seq OWNER TO postgres;

--
-- Name: message_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.message_message_id_seq OWNED BY public.messages.message_id;


--
-- Name: message_rooms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.message_rooms (
    room_id integer NOT NULL,
    host_id integer
);


ALTER TABLE public.message_rooms OWNER TO postgres;

--
-- Name: message_room_room_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.message_room_room_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.message_room_room_id_seq OWNER TO postgres;

--
-- Name: message_room_room_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.message_room_room_id_seq OWNED BY public.message_rooms.room_id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    user_id integer NOT NULL,
    likes integer DEFAULT 0 NOT NULL,
    date timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    body character varying(144) NOT NULL,
    post_id integer NOT NULL
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- Name: posts_post_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.posts_post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_post_id_seq OWNER TO postgres;

--
-- Name: posts_post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.posts_post_id_seq OWNED BY public.posts.post_id;


--
-- Name: user_accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_accounts (
    user_id integer NOT NULL,
    username character varying(60) NOT NULL,
    password character varying(100) NOT NULL,
    email character varying(50) NOT NULL,
    location character varying(50) DEFAULT 'Austin, Texas'::character varying,
    latlng jsonb DEFAULT '{"lat":30.2672, "lng": -97.7431}'::json
);


ALTER TABLE public.user_accounts OWNER TO postgres;

--
-- Name: user_message_rooms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_message_rooms (
    room_id integer,
    user_id integer
);


ALTER TABLE public.user_message_rooms OWNER TO postgres;

--
-- Name: user_profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_profiles (
    photo text DEFAULT 'data:image/png;base64,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'::text,
    bio character varying(200) DEFAULT ''::character varying,
    followers integer DEFAULT 0,
    following integer DEFAULT 0,
    user_id integer
);


ALTER TABLE public.user_profiles OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.user_accounts.user_id;


--
-- Name: comments comment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN comment_id SET DEFAULT nextval('public.comments_comment_id_seq'::regclass);


--
-- Name: message_rooms room_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message_rooms ALTER COLUMN room_id SET DEFAULT nextval('public.message_room_room_id_seq'::regclass);


--
-- Name: messages message_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages ALTER COLUMN message_id SET DEFAULT nextval('public.message_message_id_seq'::regclass);


--
-- Name: posts post_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts ALTER COLUMN post_id SET DEFAULT nextval('public.posts_post_id_seq'::regclass);


--
-- Name: user_accounts user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_accounts ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (comment_id);


--
-- Name: messages message_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT message_pkey PRIMARY KEY (message_id);


--
-- Name: message_rooms message_room_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message_rooms
    ADD CONSTRAINT message_room_pkey PRIMARY KEY (room_id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (post_id);


--
-- Name: user_accounts users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_accounts
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: user_accounts users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_accounts
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: comments comments_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(post_id) ON DELETE CASCADE;


--
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_accounts(user_id);


--
-- Name: follows follows_user_follower_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT follows_user_follower_id_fkey FOREIGN KEY (follower_user_id) REFERENCES public.user_accounts(user_id);


--
-- Name: follows follows_user_following_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT follows_user_following_id_fkey FOREIGN KEY (following_user_id) REFERENCES public.user_accounts(user_id);


--
-- Name: likes likes_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(post_id);


--
-- Name: likes likes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_accounts(user_id);


--
-- Name: message_rooms message_room_host_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message_rooms
    ADD CONSTRAINT message_room_host_id_fkey FOREIGN KEY (host_id) REFERENCES public.user_accounts(user_id);


--
-- Name: messages message_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT message_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.message_rooms(room_id);


--
-- Name: messages message_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT message_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_accounts(user_id);


--
-- Name: posts posts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_accounts(user_id);


--
-- Name: user_message_rooms user_message_room_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_message_rooms
    ADD CONSTRAINT user_message_room_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.message_rooms(room_id);


--
-- Name: user_message_rooms user_message_room_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_message_rooms
    ADD CONSTRAINT user_message_room_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_accounts(user_id);


--
-- Name: user_profiles user_profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_accounts(user_id);


--
-- PostgreSQL database dump complete
--

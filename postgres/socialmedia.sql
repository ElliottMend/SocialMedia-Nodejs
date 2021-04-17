--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.1

-- Started on 2021-04-17 15:25:38 CDT

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
-- TOC entry 3 (class 2615 OID 225654)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 200 (class 1259 OID 226012)
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
-- TOC entry 201 (class 1259 OID 226019)
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
-- TOC entry 3367 (class 0 OID 0)
-- Dependencies: 201
-- Name: comments_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_comment_id_seq OWNED BY public.comments.comment_id;


--
-- TOC entry 202 (class 1259 OID 226021)
-- Name: follows; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.follows (
    follower_user_id integer,
    following_user_id integer
);


ALTER TABLE public.follows OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 226024)
-- Name: likes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.likes (
    post_id integer,
    user_id integer
);


ALTER TABLE public.likes OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 226027)
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    message_id integer NOT NULL,
    body character varying(200) NOT NULL,
    message_timestamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    user_id integer,
    room_id text
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 226034)
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
-- TOC entry 3368 (class 0 OID 0)
-- Dependencies: 205
-- Name: message_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.message_message_id_seq OWNED BY public.messages.message_id;


--
-- TOC entry 206 (class 1259 OID 226036)
-- Name: message_rooms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.message_rooms (
    room_id text NOT NULL,
    host_id integer,
    room_name text NOT NULL,
    named boolean DEFAULT false
);


ALTER TABLE public.message_rooms OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 226043)
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
-- TOC entry 3369 (class 0 OID 0)
-- Dependencies: 207
-- Name: message_room_room_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.message_room_room_id_seq OWNED BY public.message_rooms.room_id;


--
-- TOC entry 208 (class 1259 OID 226045)
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    notification_id integer NOT NULL,
    sending_user integer,
    receiving_user integer,
    type character varying(50) NOT NULL,
    date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    seen boolean DEFAULT false,
    notification_message text
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 226053)
-- Name: notifications_notification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notifications_notification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notifications_notification_id_seq OWNER TO postgres;

--
-- TOC entry 3370 (class 0 OID 0)
-- Dependencies: 209
-- Name: notifications_notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notifications_notification_id_seq OWNED BY public.notifications.notification_id;


--
-- TOC entry 210 (class 1259 OID 226055)
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
-- TOC entry 211 (class 1259 OID 226060)
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
-- TOC entry 3371 (class 0 OID 0)
-- Dependencies: 211
-- Name: posts_post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.posts_post_id_seq OWNED BY public.posts.post_id;


--
-- TOC entry 212 (class 1259 OID 226062)
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
-- TOC entry 213 (class 1259 OID 226070)
-- Name: user_message_rooms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_message_rooms (
    user_id integer,
    room_id text
);


ALTER TABLE public.user_message_rooms OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 226076)
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
-- TOC entry 215 (class 1259 OID 226087)
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
-- TOC entry 3372 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.user_accounts.user_id;


--
-- TOC entry 3169 (class 2604 OID 226089)
-- Name: comments comment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN comment_id SET DEFAULT nextval('public.comments_comment_id_seq'::regclass);


--
-- TOC entry 3173 (class 2604 OID 226090)
-- Name: message_rooms room_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message_rooms ALTER COLUMN room_id SET DEFAULT nextval('public.message_room_room_id_seq'::regclass);


--
-- TOC entry 3171 (class 2604 OID 226091)
-- Name: messages message_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages ALTER COLUMN message_id SET DEFAULT nextval('public.message_message_id_seq'::regclass);


--
-- TOC entry 3176 (class 2604 OID 226092)
-- Name: notifications notification_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications ALTER COLUMN notification_id SET DEFAULT nextval('public.notifications_notification_id_seq'::regclass);


--
-- TOC entry 3179 (class 2604 OID 226093)
-- Name: posts post_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts ALTER COLUMN post_id SET DEFAULT nextval('public.posts_post_id_seq'::regclass);


--
-- TOC entry 3182 (class 2604 OID 226094)
-- Name: user_accounts user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_accounts ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 3346 (class 0 OID 226012)
-- Dependencies: 200
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (comment_id, body, date, user_id, post_id) FROM stdin;
\.


--
-- TOC entry 3348 (class 0 OID 226021)
-- Dependencies: 202
-- Data for Name: follows; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.follows (follower_user_id, following_user_id) FROM stdin;
\.


--
-- TOC entry 3349 (class 0 OID 226024)
-- Dependencies: 203
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.likes (post_id, user_id) FROM stdin;
\.


--
-- TOC entry 3352 (class 0 OID 226036)
-- Dependencies: 206
-- Data for Name: message_rooms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.message_rooms (room_id, host_id, room_name, named) FROM stdin;
a	1	b	f
\.


--
-- TOC entry 3350 (class 0 OID 226027)
-- Dependencies: 204
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messages (message_id, body, message_timestamp, user_id, room_id) FROM stdin;
1	abc	2021-04-17 13:45:11.349602	1	a
\.


--
-- TOC entry 3354 (class 0 OID 226045)
-- Dependencies: 208
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications (notification_id, sending_user, receiving_user, type, date, seen, notification_message) FROM stdin;
1	2	1	follow	2021-04-17 13:34:15.210771	f	\N
\.


--
-- TOC entry 3356 (class 0 OID 226055)
-- Dependencies: 210
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (user_id, likes, date, body, post_id) FROM stdin;
1	0	2021-04-17 13:33:38.964969	dsasa	1
\.


--
-- TOC entry 3358 (class 0 OID 226062)
-- Dependencies: 212
-- Data for Name: user_accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_accounts (user_id, username, password, email, location, latlng) FROM stdin;
1	username	password1	em@em.com	Austin, Texas	{"lat": 30.2672, "lng": -97.7431}
2	usernam	password1	efm@ema.com	Austin, Texas	{"lat": 30.2672, "lng": -97.7431}
\.


--
-- TOC entry 3359 (class 0 OID 226070)
-- Dependencies: 213
-- Data for Name: user_message_rooms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_message_rooms (user_id, room_id) FROM stdin;
\.


--
-- TOC entry 3360 (class 0 OID 226076)
-- Dependencies: 214
-- Data for Name: user_profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_profiles (photo, bio, followers, following, user_id) FROM stdin;
data:image/png;base64,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		0	0	1
data:image/png;base64,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		0	0	2
\.


--
-- TOC entry 3373 (class 0 OID 0)
-- Dependencies: 201
-- Name: comments_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_comment_id_seq', 1, false);


--
-- TOC entry 3374 (class 0 OID 0)
-- Dependencies: 205
-- Name: message_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.message_message_id_seq', 1, true);


--
-- TOC entry 3375 (class 0 OID 0)
-- Dependencies: 207
-- Name: message_room_room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.message_room_room_id_seq', 1, false);


--
-- TOC entry 3376 (class 0 OID 0)
-- Dependencies: 209
-- Name: notifications_notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notifications_notification_id_seq', 1, true);


--
-- TOC entry 3377 (class 0 OID 0)
-- Dependencies: 211
-- Name: posts_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_post_id_seq', 1, true);


--
-- TOC entry 3378 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 2, true);


--
-- TOC entry 3188 (class 2606 OID 226096)
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (comment_id);


--
-- TOC entry 3190 (class 2606 OID 226098)
-- Name: messages message_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT message_pkey PRIMARY KEY (message_id);


--
-- TOC entry 3192 (class 2606 OID 226100)
-- Name: message_rooms message_room_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message_rooms
    ADD CONSTRAINT message_room_pkey PRIMARY KEY (room_id);


--
-- TOC entry 3194 (class 2606 OID 226102)
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (notification_id);


--
-- TOC entry 3196 (class 2606 OID 226104)
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (post_id);


--
-- TOC entry 3198 (class 2606 OID 226106)
-- Name: user_accounts users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_accounts
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3200 (class 2606 OID 226108)
-- Name: user_accounts users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_accounts
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3201 (class 2606 OID 226109)
-- Name: comments comments_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(post_id) ON DELETE CASCADE;


--
-- TOC entry 3202 (class 2606 OID 226114)
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_accounts(user_id);


--
-- TOC entry 3203 (class 2606 OID 226119)
-- Name: follows follows_user_follower_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT follows_user_follower_id_fkey FOREIGN KEY (follower_user_id) REFERENCES public.user_accounts(user_id);


--
-- TOC entry 3204 (class 2606 OID 226124)
-- Name: follows follows_user_following_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT follows_user_following_id_fkey FOREIGN KEY (following_user_id) REFERENCES public.user_accounts(user_id);


--
-- TOC entry 3205 (class 2606 OID 226129)
-- Name: likes likes_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(post_id);


--
-- TOC entry 3206 (class 2606 OID 226134)
-- Name: likes likes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_accounts(user_id);


--
-- TOC entry 3209 (class 2606 OID 226139)
-- Name: message_rooms message_room_host_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message_rooms
    ADD CONSTRAINT message_room_host_id_fkey FOREIGN KEY (host_id) REFERENCES public.user_accounts(user_id);


--
-- TOC entry 3207 (class 2606 OID 226144)
-- Name: messages message_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT message_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_accounts(user_id);


--
-- TOC entry 3208 (class 2606 OID 226149)
-- Name: messages messages_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.message_rooms(room_id);


--
-- TOC entry 3210 (class 2606 OID 226154)
-- Name: notifications notifications_receiving_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_receiving_user_fkey FOREIGN KEY (receiving_user) REFERENCES public.user_accounts(user_id);


--
-- TOC entry 3211 (class 2606 OID 226159)
-- Name: notifications notifications_sending_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_sending_user_fkey FOREIGN KEY (sending_user) REFERENCES public.user_accounts(user_id);


--
-- TOC entry 3212 (class 2606 OID 226164)
-- Name: posts posts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_accounts(user_id);


--
-- TOC entry 3213 (class 2606 OID 226169)
-- Name: user_message_rooms user_message_room_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_message_rooms
    ADD CONSTRAINT user_message_room_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_accounts(user_id);


--
-- TOC entry 3214 (class 2606 OID 226174)
-- Name: user_message_rooms user_message_rooms_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_message_rooms
    ADD CONSTRAINT user_message_rooms_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.message_rooms(room_id);


--
-- TOC entry 3215 (class 2606 OID 226179)
-- Name: user_profiles user_profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_accounts(user_id) ON DELETE CASCADE;


-- Completed on 2021-04-17 15:25:38 CDT

--
-- PostgreSQL database dump complete
--


import { getCollection } from 'astro:content';

export const SITE = {
  name: 'ファンブルワールス',
  description:
    '当サイトは，ファンブルワールス（fumblewaals）の公式Webサイトです．ファンブルワールスは中野を拠点とし，ボードゲーム/カードゲームを制作しているサークルです．制作したゲームはゲームマーケットやコミックマーケットといったイベントにて頒布しております．',
  footerDescription:
    '当サイトは，ファンブルワールス（fumblewaals）の公式Webサイトです．ファンブルワールスは東京都中野区を拠点とし，ボードゲーム/カードゲームを制作しているサークルです．制作物はゲームマーケットやコミックマーケットといったイベントにて頒布しております．',
  email: 'fumblewaals@gmail.com',
  twitter: 'https://twitter.com/fumblewaals',
  twitterHandle: '@fumblewaals',
  location: 'Nakano, Tokyo',
  ogImage: '/uploads/sqImage.png',
} as const;

export const NAV = [
  { label: 'メンバー', href: '/members/' },
  { label: '作品', href: '/products/' },
  { label: 'ブログ', href: '/posts/' },
  { label: 'コンタクト', href: '/contact/' },
] as const;

/** base(BASE_PATH)を考慮した内部リンク/アセットのURL */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base + (path.startsWith('/') ? path : `/${path}`);
}

export const postPath = (permalink: string) => `/${permalink}/`;
export const productPath = (permalink: string) => `/portfolio/${permalink}/`;
export const memberPath = (permalink: string) => `/team/${permalink}/`;

export async function getPosts() {
  const posts = await getCollection('posts');
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getProducts() {
  const products = await getCollection('products');
  return products.sort((a, b) => a.data.order - b.data.order);
}

export async function getMembers() {
  const members = await getCollection('members');
  return members.sort((a, b) => a.data.order - b.data.order);
}

const jst = (opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('ja-JP', { timeZone: 'Asia/Tokyo', ...opts });

export function formatDate(d: Date) {
  const get = (opts: Intl.DateTimeFormatOptions) => jst(opts).format(d);
  return { day: get({ day: 'numeric' }), month: get({ month: 'numeric' }), year: get({ year: 'numeric' }) };
}

/** Markdown/HTML本文から一覧用の抜粋を作る */
export function excerpt(body: string | undefined, length = 100): string {
  const text = (body ?? '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > length ? `${text.slice(0, length)} …` : text;
}

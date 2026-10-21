import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    categories: z.array(z.string()).default([]),
    thumbnail: z.string().optional(),
    // 旧WordPressのURL(/YYYY/MM/DD/<slug>/)を維持するためのパス
    permalink: z.string(),
  }),
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    thumbnail: z.string(),
    gallery: z.array(z.string()).default([]),
    details: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    permalink: z.string(),
  }),
});

const members = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/members' }),
  schema: z.object({
    name: z.string(),
    order: z.number(),
    role: z.string().optional(),
    image: z.string().optional(),
    twitter: z.url().optional(),
    location: z.string().optional(),
    url: z.url().optional(),
    permalink: z.string(),
  }),
});

export const collections = { posts, products, members };

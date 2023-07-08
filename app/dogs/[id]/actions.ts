'use server';

import { kv } from '@vercel/kv'
import { revalidatePath } from 'next/cache'

export async function like(id: string) {
  await kv.incr(`likes:${id}`);
  revalidatePath(`/dogs/${id}`);
}

export async function dislike(id: string) {
  await kv.decr(`likes:${id}`);
  revalidatePath(`/dogs/${id}`);
}

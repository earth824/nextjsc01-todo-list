'use server';

import prisma from '@/libs/prisma';
import { todoSchema } from '@/libs/schemas';
import { FormState } from '@/types';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { redirect } from 'next/navigation';
import { ZodError } from 'zod';

export async function createTodo(_: FormState, formData: FormData): Promise<FormState> {
  const rawData = {
    title: formData.get('title') as string | '',
    status: formData.get('status') as 'completed' | 'pending'
  };
  try {
    await new Promise(resolve => setTimeout(() => resolve(''), 3000));
    const data = todoSchema.parse(rawData);
    await prisma.todo.create({ data });
    redirect('/todo');
  } catch (error) {
    if (isRedirectError(error)) throw error;

    if (error instanceof ZodError) {
      return { error: error.flatten().fieldErrors, message: 'validation error', data: rawData };
    }
    return { message: 'Something went wrong', data: rawData };
  }
}

export async function updateTodo(id: string, _: FormState, formData: FormData) {}

'use server';

import prisma from '@/libs/prisma';
import { todoSchema } from '@/libs/schemas';
import { FormState, TodoFormInput } from '@/types';
import { error } from 'console';
import { revalidatePath } from 'next/cache';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { redirect } from 'next/navigation';
import { ZodError } from 'zod';

// use with form action
// async function create(formData: FormData) {}
// use with useActionState
// async function create(prevState: FormState, formData: FormData) {}
// use without form action or useActionState
// async function create(...) {}

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
    console.log(error);
    if (isRedirectError(error)) throw error;

    if (error instanceof ZodError) {
      return { error: error.flatten().fieldErrors, message: 'validation error', data: rawData };
    }
    return { message: 'Something went wrong', data: rawData };
  }
}

export async function updateTodo(id: string, _: unknown, formData: FormData) {
  // Object.fromEntries([
  //   ['name', 'John'],
  //   ['age', 20]
  // ]); // { name: 'John', age: 20 }
  // const f = new FormData();
  // f.append('email', 'a@mail.co'); // FormData { email: 'a@mail.com' }
  // f.entries() // [ [ 'email', 'a@mail.com' ] ]

  try {
    const data = todoSchema.parse(Object.fromEntries(formData.entries()));
    await prisma.todo.update({ where: { id }, data });

    // return { message: 'success' };
  } catch (errer) {
    console.log(error);
    console.log('-------------------------------------------------');

    if (isRedirectError(error)) throw error;
    return { message: 'Something went wrong' };
  }
  revalidatePath('/todo');
  redirect('/todo'); // redirect Internal: thrown error
}

export async function updateTodoWithHookForm(id: string, rawData: TodoFormInput) {
  try {
    const { success, data, error } = todoSchema.safeParse({});

    if (!success) {
      return { error: error.flatten().fieldErrors, message: 'validation error' };
    }

    const existTodo = await prisma.todo.findUnique({ where: { id } });
    if (!existTodo) {
      return { message: 'Todo with this id was not found' };
    }

    await prisma.todo.update({ where: { id }, data });
    revalidatePath('/todo');
    redirect('/todo');
  } catch (error) {
    console.log(error);
    if (isRedirectError(error)) throw error;

    return { message: 'Something went wrong' };
  }
}

export async function deleteTodo(id: string) {
  try {
    const existTodo = await prisma.todo.findUnique({ where: { id } });
    if (!existTodo) {
      return { message: 'Todo with this id was not found' };
    }
    await prisma.todo.delete({ where: { id } });
    revalidatePath('/todo');
  } catch (error) {
    return { message: 'Something went wrong' };
  }
}

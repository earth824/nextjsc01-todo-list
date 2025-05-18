'use client';

import { TodoFormInput } from '@/types';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { todoSchema } from '@/libs/schemas';
import { updateTodoWithHookForm } from '@/libs/actions';
import { useTransition } from 'react';
import { Loader } from 'lucide-react';

type EditFormProps = {
  id: string;
  title: string;
  status: 'pending' | 'completed';
};

export default function EditHookForm({ id, title, status }: EditFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<TodoFormInput>({
    resolver: zodResolver(todoSchema),
    defaultValues: { title, status }
  });

  const [isPending, startTransition] = useTransition();
  // startTranstion(fn) // start ===> fn() ===> end

  const onSubmit: SubmitHandler<TodoFormInput> = data => {
    // call server function
    startTransition(async () => {
      await new Promise(resolve => setTimeout(() => resolve(''), 3000));
      const result = await updateTodoWithHookForm(id, data);
      if (result.error) {
        if (result.error.title) {
          setError('title', { message: result.error.title[0] });
        }
      }
    });
  };

  // if (isPending) {
  //   return <h1>Updating ...</h1>;
  // }

  return (
    <form className="grid gap-6 border border-gray-300 p-6 rounded-lg" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-3 py-1.5 outline-none"
          placeholder="Enter todo title"
          {...register('title')}
          // name="title"
          // onChange={e => ...}
          // onBlur={e => ...}
          // ref
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>
      <div className="flex gap-4">
        <div>
          <input type="radio" id="pending" value="pending" className="mr-1" {...register('status')} />
          <label htmlFor="pending">Pending</label>
        </div>
        <div>
          <input type="radio" id="completed" value="completed" className="mr-1" {...register('status')} />
          <label htmlFor="completed">Completed</label>
        </div>
      </div>
      <div className="flex gap-4">
        <Link href="/todo" className="bg-gray-200 rounded-md px-3 py-1.5">
          Cancle
        </Link>
        <button className="bg-gray-200 rounded-md px-3 py-1.5">
          {isPending ? (
            <>
              <Loader className="animate-spin" />
            </>
          ) : (
            'Update'
          )}
        </button>
      </div>
    </form>
  );
}

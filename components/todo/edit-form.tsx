'use client';

import { updateTodo } from '@/libs/actions';
import Link from 'next/link';
import { useActionState } from 'react';

type EditFormProps = {
  id: string;
  title: string;
  status: 'pending' | 'completed';
};

export default function EditForm({ id, title, status }: EditFormProps) {
  // updateTodo: (prev: FormState, formData:FormData) => FormState
  // func.bind

  const [state, action, isPending] = useActionState(updateTodo.bind(null, id), { message: '' });

  return (
    <form action={action} className="grid gap-6 border border-gray-300 p-6 rounded-lg">
      <div>
        <input
          name="title"
          type="text"
          className="border border-gray-300 rounded-lg px-3 py-1.5 outline-none"
          placeholder="Enter todo title"
          defaultValue={title}
        />
      </div>
      <div className="flex gap-4">
        <div>
          <input
            type="radio"
            name="status"
            id="pending"
            value="pending"
            className="mr-1"
            defaultChecked={status === 'pending'}
          />
          <label htmlFor="pending">Pending</label>
        </div>
        <div>
          <input
            type="radio"
            name="status"
            id="completed"
            value="completed"
            className="mr-1"
            defaultChecked={status === 'completed'}
          />
          <label htmlFor="completed">Completed</label>
        </div>
      </div>
      <div className="flex gap-4">
        <Link href="/todo" className="bg-gray-200 rounded-md px-3 py-1.5">
          Cancle
        </Link>
        <button className="bg-gray-200 rounded-md px-3 py-1.5">Update</button>
      </div>
    </form>
  );
}

type EditTodoPageProps = {
  params: Promise<{ todoId: string }>;
};

export default async function EditTodoPage({ params }: EditTodoPageProps) {
  const { todoId } = await params;

  return <div>Edit Todo Page</div>;
}

// /todo/:todoId
// params: Promise<{ id1:string, id2:string }>

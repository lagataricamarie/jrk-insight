// pages/todos/[userId].js
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function UserTodos() {
  const router = useRouter();
  const { userId } = router.query;
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
        const todosData = await response.json();
        setTodos(todosData);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    if (userId) {
      fetchTodos();
    }
  }, [userId]);

  return (
    <div>
      <Typography variant="h4">TODOS for User {userId}</Typography>
      {todos.map((todo) => (
        <div key={todo.id}>
          <Typography variant="body2">{todo.title}</Typography>
          {/* Add more details if needed */}
        </div>
      ))}
    </div>
  );
}

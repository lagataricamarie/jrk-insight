// pages/todos/[userId].js
import { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';

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
    <Box sx={{ backgroundColor: '#edeff5', minHeight: '100vh' }}>
    <Grid container spacing={2} sx={{ height: '100%' }} padding="25px 50px 75px">
      
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h4" fontFamily="serif " color={'black'}>JRK-PROJECT</Typography>
        <Box display="flex" alignItems="center">
          <Link href="/" passHref>
            <Button>
              Dashboard
            </Button>
          </Link>
          <Link href="/posts" passHref>
            <Button>
              Posts
            </Button>
          </Link>
          <Link href="/users" passHref>
            <Button>
              Users
            </Button>
          </Link>
        </Box>
      </Grid>
      <Grid item xs={12}>
          <Typography variant="h5" fontColor="#050315">TODOS for User {userId}</Typography>
          {todos.map((todo, index) => (
            <Box key={todo.id} mb={2}>
              <Typography variant="body2" fontFamily="georgia" color={'black'}>{index + 1}. Title: {todo.title}</Typography>
              <Typography variant="body2" fontFamily="georgia " color={'black'}>Completed: {todo.completed ? 'True' : 'False'}</Typography>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  
  );
}

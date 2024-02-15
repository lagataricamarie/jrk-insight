// pages/todos/[userId].js
import { useEffect, useState } from 'react';
import { Box, Button, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
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
    <Box sx={{ backgroundColor: '#edeff5', minHeight: '200vh' }}>
    <Grid container spacing={2} sx={{ height: '100%' }} padding="25px" >
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h3" fontFamily="serif " color={'black'}>JRK-PROJECT</Typography>
        <Box display="flex" alignItems="center">
          <Link href="/" passHref >
            <Button >
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
      </Grid>
      <Grid container style={{ height: '10vh' }} alignItems="center" justifyContent="center">
      <Grid item xs={12} style={{ maxWidth: 850 }}>
        <Typography variant="h5" fontColor="#050315" fontFamily={'calibri'}  fontWeight={'bold'} color={'black'}>TODOS for User {userId}</Typography>
        <Table style={{ borderRadius: '10px', overflow: 'hidden',  }}>
          <TableHead>
            <TableRow >
              <TableCell style={{fontWeight: 'bold', backgroundColor: '#e0e0e0', textAlign:"center"}}>NO.</TableCell>
              <TableCell style={{fontWeight: 'bold', backgroundColor: '#e0e0e0'}}>Title</TableCell>
              <TableCell style={{fontWeight: 'bold', backgroundColor: '#e0e0e0', textAlign:"center"}}>Completed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo, index) => ( 
              <TableRow key={todo.id} style={{borderRadius: '8px'}}>
                <TableCell style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold', textAlign:"center" }}>{index + 1}</TableCell>
                <TableCell style={{ backgroundColor: '#f5f5f5',   }}>{todo.title}</TableCell>
                <TableCell style={{ backgroundColor: '#f5f5f5', textColor: todo.completed ? '#dcedc8' : '#ffcdd2',  fontWeight: 'bold', textAlign:"center" }}>{todo.completed ? 'True' : 'False'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
    </Box>
  
  );
}

import { Card, CardContent, CardHeader, Grid, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import Link from 'next/link';

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => {
          setUsers(json);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    };

    fetchUsers();
  }, []);

  const fetchTodos = async (userId) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
      const todos = await response.json();
      return todos;
    } catch (error) {
      console.error('Error fetching todos:', error);
      return [];
    }
  };

  const handleViewTodos = async (userId) => {
    const todos = await fetchTodos(userId);
    // Redirect to a new page displaying all TODOS of the user
    // For simplicity, we're using the alert to display TODOS
    alert(`TODOS for user ${userId}:\n${todos.map((todo) => todo.title).join('\n')}`);
  };

  return (
    <Grid container spacing={2}>
      {users.map((user, index) => (
        <Grid item lg={12} md={6} sm={3} key={index}>
          <Card>
            <CardHeader title={user.name} subheader={`Username: ${user.username}`} />
            <CardContent>
              {/* ... (other user details) */}
              <Link href={`/todos/${user.id}`} passHref>
                <Button variant="contained" color="primary" size="small">
                  View TODOS Page
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
 
}

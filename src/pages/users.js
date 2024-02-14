import { Card, CardContent, CardHeader, Grid, Typography, Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { Person2Outlined } from "@mui/icons-material";

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
  return (
    <Box sx={{ backgroundColor: '#edeff5', minHeight: '100vh' }}>
      <Grid container spacing={2} sx={{ height: '100%' }} padding="25px 50px 75px">
        
        {/* Navigation */}
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
          <Typography variant="h4" fontFamily="serif ">JRK-PROJECT</Typography>
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
        <Grid container spacing={2}>
          {users.map((user, index) => (
            <Grid item lg={4} md={6} sm={12} key={index}>
              <Card sx={{ backgroundColor: ' #dbe1f6', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '8px', transition: '0.3s', '&:hover': { boxShadow: '0 4px 8px rgba(0,0,0,0.2)' } }}>
                <CardHeader
                  avatar={<Person2Outlined />}
                  title={user.name}
                  subheader={`UserID: ${user.id}`}
                />
                <CardContent>
                  <Link href={`/todos/${user.id}`} passHref>
                    <Button variant="contained" color="info" size="small">
                      View TODOS 
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  
  );
 
}

import { Button, Typography, Grid, Box, Paper, IconButton } from "@mui/material";
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { PostAdd, Group, Comment, PlaylistAddCheck } from '@mui/icons-material'; // Icons
import 'chart.js/auto';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [todos, setTodos] = useState([]);
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const [postsResponse, usersResponse, commentsResponse, todosResponse] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/posts'),
        fetch('https://jsonplaceholder.typicode.com/users'),
        fetch('https://jsonplaceholder.typicode.com/comments'),
        fetch('https://jsonplaceholder.typicode.com/todos'),
      ]);

      if (!postsResponse.ok || !usersResponse.ok || !commentsResponse.ok || !todosResponse.ok) {
        console.error('Error fetching data:', postsResponse.statusText, usersResponse.statusText, commentsResponse.statusText, todosResponse.statusText);
        return;
      }

      const postsData = await postsResponse.json();
      const usersData = await usersResponse.json();
      const commentsData = await commentsResponse.json();
      const todosData = await todosResponse.json();

      setPosts(postsData);
      setUsers(usersData);
      setComments(commentsData);
      setTodos(todosData);

      setChartData({ fontWeight: 'bold',
        labels: ['Posts', 'Users', 'Comments', 'Todos'],
        datasets: [
          {
            label: 'Total Count',
            data: [postsData.length, usersData.length, commentsData.length, todosData.length],
            backgroundColor: ['#a6b6eb', '#a6b6eb', '#a6b6eb', '#a6b6eb'], 
            borderColor: '#a1eabc',
            borderWidth: 3,
          },
        ],
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
  }, []);

  return (
    <Box sx={{ backgroundColor: '#edeff5', minHeight: '100vh' }}>
      <Grid container spacing={2} sx={{ height: '100%' }} padding="25px 50px 75px">
       
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
          <Typography variant="h3" fontFamily="serif " color={'black'}>JRK-INSIGHT</Typography>
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
          <Box p={2} height="100%">
            <Grid container spacing={2} sx={{ flexWrap: 'nowrap' }}>
              <Grid item xs={6}>
                <Paper elevation={3} sx={{ p: 2, display: 'flex', backgroundColor:'#d2e3f4', alignItems: 'left', width: '100%', height: '100%' }}>
                  <IconButton sx={{ mr: 4, color:'#5db330' }}>
                    <PostAdd />
                  </IconButton>
                  <Box>
                  <Typography variant="body4">Posts</Typography>
                  <Typography fontSize="30px">{posts.length}</Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper elevation={3} sx={{ p: 2, display: 'flex', backgroundColor:'#d2e3f4', alignItems: 'center', width: '100%', height: '100%' }}>
                  <IconButton sx={{ mr: 4, color:'#5db330' }}>
                    <Group />
                  </IconButton>
                  <Box>
                  <Typography variant="body4">Users</Typography>
                  <Typography fontSize="30px">{users.length}</Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper elevation={3} sx={{ p: 2, display: 'flex', backgroundColor:'#d2e3f4', alignItems: 'center', width: '100%', height: '100%' }}>
                  <IconButton sx={{ mr: 4, color:'#5db330' }}>
                    <Comment />
                  </IconButton>
                  <Box>
                  <Typography variant="body4">Comments</Typography>
                  <Typography fontSize="30px">{comments.length}</Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper elevation={3} sx={{ p: 2, display: 'flex', backgroundColor:'#d2e3f4', alignItems: 'center', width: '100%', height: '100%' }}>
                  <IconButton sx={{ mr: 4, color:'#5db330' }}>
                    <PlaylistAddCheck />
                  </IconButton>
                  <Box>
                    <Typography variant="body4">TODOS</Typography>
                    <Typography fontSize="30px">{todos.length}</Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            <Box mt={2} display="flex" justifyContent="center" height="75%">
              <Box width="75%">
                <Box height="100%" >
                  {chartData && (
                    <Bar
                      ref={chartRef}
                      data={chartData}
                      options={{
                        maintainAspectRatio: false,
                        responsive: true,
                        
                      }}
                    
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

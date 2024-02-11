import { Button, Typography, Grid, Box } from "@mui/material";
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
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

      // Update chart data
      setChartData({
        labels: ['Posts', 'Users', 'Comments', 'Todos'],
        datasets: [
          {
            label: 'Total Count',
            data: [postsData.length, usersData.length, commentsData.length, todosData.length],
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
          },
        ],
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Cleanup: Destroy the existing chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <div>
          <Typography variant="h2" >Dashboard</Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1">Total Posts: {posts.length}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">Total Users: {users.length}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">Total Comments: {comments.length}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">Total TODOS: {todos.length}</Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Link href="/posts" passHref>
                <Button component="" variant="outlined">
                  Posts
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link href="/users" passHref>
                <Button component="" variant="outlined">
                  Users
                </Button>
              </Link>
            </Grid>
          </Grid>
        </div>
      </Grid>

      <Grid item xs={6}>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" minWidth="100vh">
          {chartData && (
            <Bar
              ref={chartRef}
              data={chartData}
              options={{
                maintainAspectRatio: false,
                responsive: true,
              }}
              height={300} // set to desired height
              width={300} // set to desired width
            />
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

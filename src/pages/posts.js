import { Chat, Email } from "@mui/icons-material";
import { Box, Button, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const activeLinkStyle = {
    color: 'black'
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const json = await response.json();
        setPosts(json.map(post => ({ ...post, comments: [], showComments: false })));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleViewComments = async (postId) => {
    setPosts(prevPosts => {
      const updatedPosts = prevPosts.map(post =>
        post.id === postId ? { ...post, showComments: !post.showComments } : post
      );
      if (updatedPosts.find(post => post.id === postId && post.showComments && post.comments.length === 0)) {
        fetchComments(postId);
      }
      return updatedPosts;
    });
  };

  const fetchComments = async (postId) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
      const comments = await response.json();
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId ? { ...post, comments } : post
        )
      );
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#edeff5', minHeight: '100vh' }}>
      <Grid container spacing={2} sx={{ height: '100%' }} padding="25px 50px 75px">
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
          <Typography variant="h3" fontFamily="serif" color={'black'}>JRK-INSIGHT</Typography>
          <Box display="flex" alignItems="center">
            <Link href="/" passHref>
              <Button sx={router.pathname === '/' ? activeLinkStyle : null}>
                Dashboard
              </Button>
            </Link>
            <Link href="/posts" passHref>
              <Button sx={router.pathname === '/posts' ? activeLinkStyle : null}>
                Posts
              </Button>
            </Link>
            <Link href="/users" passHref>
              <Button sx={router.pathname === '/users' ? activeLinkStyle : null}>
                Users
              </Button>
            </Link>
          </Box>
        </Grid>
        <Grid container spacing={2}>
          {posts.map((post, index) => (
            <Grid item lg={12} md={6} sm={6} key={index}>
              <Card>
                <CardHeader title={post.title} subheader={`User ID: ${post.userId}`} />
                <CardContent>
                  <Typography variant="body2" fontFamily="times new roman">{post.body}</Typography>
                  <Typography
                    fontFamily="serif"
                    variant="body2"
                    style={{ color: 'blue', cursor: 'pointer' }}
                    onClick={() => handleViewComments(post.id)}
                  >
                    {post.showComments ? 'Hide Comments' : 'View Comments'}
                  </Typography>
                  {post.showComments && post.comments.length > 0 && (
                    <Box mt={2} p={1} bgcolor="#f0f0f0" borderRadius={4}>
                      <Typography variant="h6">Comments:</Typography>
                      {post.comments.map((comment, index) => (
                        <Box key={index} mt={1}>
                          <Typography variant="body2" fontFamily="georgia">
                            <Email /> {comment.email}
                          </Typography>
                          <Typography variant="body2" fontFamily="georgia">
                            <Chat /> {comment.body}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}

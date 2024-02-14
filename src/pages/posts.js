import { Chat, Email,} from "@mui/icons-material";
import { Box, Button, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => {
          setPosts(json);
        })
        .catch(error => {
          console.error('Error fetching posts:', error);
        });
    };

    fetchPosts();
  }, []);

  const fetchComments = async (postId) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
      const comments = await response.json();
      return comments;
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  };

  const handleViewComments = async (postId) => {
    if (selectedPost === postId) {
      setSelectedPost(null);
    } else {
      const comments = await fetchComments(postId);
      setSelectedPost(postId);
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? { ...post, comments } : post))
      );
    }
  };
  return (
    <Box sx={{ backgroundColor: '#edeff5', minHeight: '100vh' }}>
      <Grid container spacing={2} sx={{ height: '100%' }} padding="25px 50px 75px">
       
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
          <Typography variant="h4" fontFamily="serif " >JRK-PROJECT</Typography>
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
          {posts.map((post, index) => (
            <Grid item lg={12} md={6} sm={6} key={index}>
              <Card>
                <CardHeader fontFamily="times new roman" title={post.title} subheader={`User ID: ${post.userId}`} />
                <CardContent>
                  <Typography variant="body2" fontFamily="times new roman">{post.body}</Typography>
                  <Typography
                    fontFamily="serif"
                    variant="body2"
                    style={{ color: 'blue', cursor: 'pointer' }}
                    onClick={() => handleViewComments(post.id)}
                  >
                    View Comments
                  </Typography>
                  <Grid item xs={12} sm={6}>
                  {selectedPost && posts.find(post => post.id === selectedPost)?.comments && (
                    <Box>
                      <Typography variant="h6">Comments:</Typography>
                      {posts.find(post => post.id === selectedPost).comments.map((comment, index) => (
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
                </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
    
   
  );
}
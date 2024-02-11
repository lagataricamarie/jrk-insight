import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);

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

  const [expandedPostId, setExpandedPostId] = useState(null);

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
    if (expandedPostId === postId) {
      // If already expanded, hide comments
      setExpandedPostId(null);
    } else {
      // If not expanded, fetch and show comments
      const comments = await fetchComments(postId);
      setExpandedPostId(postId);
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? { ...post, comments } : post))
      );
    }
  };

  return (
    <Grid container spacing={2}>
      {posts.map((post, index) => (
        <Grid item lg={12} md={6} sm={3} key={index}>
          <Card>
            <CardHeader title={post.title} subheader={`User ID: ${post.userId}`} />
            <CardContent>
              <Typography variant="body2">{post.body}</Typography>
              <Typography
                variant="body2"
                style={{ color: 'blue', cursor: 'pointer' }}
                onClick={() => handleViewComments(post.id)}
              >
                View Comments
              </Typography>
              {expandedPostId === post.id && post.comments && (
                <div>
                  <Typography variant="subtitle2">Comments:</Typography>
                  {post.comments.map((comment, commentIndex) => (
                    <div key={commentIndex}>
                      <Typography variant="body2">Comment: {comment.body}</Typography>
                      <Typography variant="body2">Email: {comment.email}</Typography>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

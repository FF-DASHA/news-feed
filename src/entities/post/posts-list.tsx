import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Spin, Alert } from 'antd';
import { fetchPosts } from '../../entities/post/slice'; 
import { RootState, AppDispatch } from '../../store'; 

const PostsList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch(); 
  const { posts, loading, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) {
    return <Spin size="large"/>;
  }

  if (error) {
    return <Alert message="Ошибка" description={error} type="error" showIcon />;
  }

  return (
    <div>
      <h1>Список постов</h1>
      <Row gutter={[16, 16]}>
        {posts.map((post) => (
          <Col span={8} key={post.id}>
            <Card title={post.title} style={{ height: '200px' }}>
              <div style={{ 
                height: '120px', 
                overflowY: 'auto', 
                scrollbarWidth: 'thin', 
                scrollbarColor: 'black transparent' 
              }}>
                <style>
                  {`
                    /* For Chrome, Safari and Edge */
                    div::-webkit-scrollbar {
                      width: 8px;
                    }
                    div::-webkit-scrollbar-track {
                      background: transparent;
                    }
                    div::-webkit-scrollbar-thumb {
                      background-color: black;
                      border-radius: 10px;
                    }
                    div::-webkit-scrollbar-thumb:hover {
                      background: #555; /* Darker shade on hover */
                    }
                  `}
                </style>
                <p>{post.body}</p>
                <p>Теги: {post.tags.join(', ')}</p>
                <p>Эмоции: {JSON.stringify(post.emotions)}</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PostsList;

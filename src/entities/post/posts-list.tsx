import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Spin, Alert, Button } from 'antd';
import { fetchPosts } from '../../entities/post/slice';
import { RootState, AppDispatch } from '../../store';

const PostsList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { posts, loading, error, total } = useSelector((state: RootState) => state.posts);
  const [skip, setSkip] = useState(0);
  const limit = 10;

  useEffect(() => {
    dispatch(fetchPosts({ skip, limit }));
  }, [dispatch, skip]);

  const loadMorePosts = () => {
    setSkip(prevSkip => prevSkip + limit);
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert message="Ошибка" description={error} type="error" showIcon />;
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <h1>Список постов</h1>
      <Row gutter={[16, 16]}>
        {posts.slice(0, skip + limit).map((post) => (
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
                      background: #555;
                    }
                  `}
                </style>
                <p>{post.body}</p>
                <p>Теги: {post.tags.join(', ')}</p>
                <p>Реакции: Лайки: {post.reactions.likes}, Дизлайки: {post.reactions.dislikes}</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      {skip + limit < total && (
        <Button onClick={loadMorePosts} style={{ marginTop: '20px' }}>
          Показать ещё
        </Button>
      )}
    </div>
  );
};

export default PostsList;

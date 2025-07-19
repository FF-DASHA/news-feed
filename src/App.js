import React from 'react';
import { Button, ConfigProvider } from 'antd';
import PostsList from "./entities/post/posts-list";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: '#1e0c08',
          colorTextHeading: '#470101',
          colorText: '#620000',
         
        },
      }}
    >
      <div className="App" style={{ color: '#620000' }}>
        <PostsList />
      </div>
    </ConfigProvider>
  );
}

export default App;
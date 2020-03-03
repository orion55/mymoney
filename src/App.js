import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout } from 'antd';
import Navbar from './components/layout/Navbar/index';

const { Content, Footer } = Layout;

function App() {
  return (
    <Layout>
      <Navbar />
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 30 }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          Content
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
}

export default App;

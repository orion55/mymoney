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
      <Content className="site-layout content">
        <div className="site-layout-background content__block">
          Content
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>MyMoney ©2020 Создал Гребенёв Олег</Footer>
    </Layout>
  );
}

export default App;

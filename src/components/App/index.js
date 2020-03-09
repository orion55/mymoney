import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout } from 'antd';
import NavBar from '../NavBar';
import Dashboard from '../Dashboard';

const { Content, Footer } = Layout;

function App() {
  return (
    <Layout className="layout">
      <NavBar />
      <Content className="site-layout content">
        <div className="site-layout-background content__block">
          <Dashboard />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>MyMoney ©2020 Создал Гребенёв Олег</Footer>
    </Layout>
  );
}

export default App;

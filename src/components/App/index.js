import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout } from 'antd';
import { HashRouter, Switch, Route } from 'react-router-dom';
import NavBar from '../NavBar';
import Dashboard from '../Dashboard';
import SignIn from '../SignIn';
import SignUp from '../SignUp';

const { Content, Footer } = Layout;

function App() {
  return (
    <HashRouter>
      <Layout className="layout">
        <NavBar />
        <Content className="site-layout content">
          <div className="site-layout-background content__block">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>MyMoney ©2020 Создал Гребенёв Олег</Footer>
      </Layout>
    </HashRouter>
  );
}

export default App;

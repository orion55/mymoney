import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout } from 'antd';
import { HashRouter, Switch, Route } from 'react-router-dom';
import NavBar from '../NavBar';
import Dashboard from '../Dashboard';
import SignIn from '../Auth/SignIn';
import SignUp from '../Auth/SignUp';

const { Content, Footer } = Layout;

function App() {
  return (
    <HashRouter>
      <Layout className="layout">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <>
                <NavBar />
                <Content className="site-layout content">
                  <div className="site-layout-background content__block">
                    <Dashboard />
                  </div>
                </Content>
              </>
            )}
          />
          <Route
            path="/signin"
            render={() => (
              <Content className="site-layout content">
                <div className="site-layout-background content__block">
                  <SignIn />
                </div>
              </Content>
            )}
          />
          <Route
            path="/signup"
            render={() => (
              <Content className="site-layout content">
                <div className="site-layout-background content__block">
                  <SignUp />
                </div>
              </Content>
            )}
          />
        </Switch>
        <Footer style={{ textAlign: 'center' }}>MyMoney ©2020 Создал Гребенёв Олег</Footer>
      </Layout>
    </HashRouter>
  );
}

export default App;

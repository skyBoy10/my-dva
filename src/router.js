import React from 'react';
import { Switch, Route, routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic';
import { Layout } from 'antd';

/** 
 * 引入自定义组件
*/
import CusMenu from './components/CusMenus';
import Top from './components/Top';

const RouterCon = ({ history, app }) => {
  const { Content } = Layout;
  const { ConnectedRouter } = routerRedux;
  const login = dynamic({
    app,
    models: () => [ import('./models/login'), ],
    component: () =>  import('./pages/Login')
  });
  const routes = [
    {
        path: '/dashboard',
        name: 'dashboard',
        models: () => [ import('./models/home/dashboard') ],
        component: () => import('./pages/home/dashboard'),
    },
    {
      path: '/order',
      name: 'order',
      models: () => [ import('./models/order/order') ],
      component: () => import('./pages/order/order'),
    },
    {
      path: '/market',
      name: 'market',
      models: () => [ import('./models/market/market') ],
      component: () => import('./pages/market/market'),
    },
    {
      path: '/statistics',
      name: 'statistics',
      models: () => [ import('./models/statistics/statistics') ],
      component: () => import('./pages/statistics/statistics'),
    },
    {
      path: '/users',
      name: 'users',
      models: () => [ import('./models/users/user')],
      component: () => import('./pages/users/users'),
    }
  ];

  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path='/login' component={login} />
        <Route path='/' render={() => 
        <Layout className='h-full w-full'>
            <CusMenu></CusMenu>
            <Layout>
                <Top />
                <Content className='scroll-y pos-r'>
                {
                  routes.map(item => {
                      return (<Route key={item.name} path={item.path} exact component={dynamic({app, models: item.models, component: item.component})}></Route>);
                  })
                }
                </Content>
            </Layout>
        </Layout>
        }/>
      </Switch>
    </ConnectedRouter>
  );
}

export default RouterCon;

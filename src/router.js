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
        models: () => [ import('./models/dashboard') ],
        component: () => import('./pages/dashboard'),
    },
    {
      path: '/order',
      name: 'order',
      models: () => [ import('./models/order') ],
      component: () => import('./pages/order'),
    },
    {
      path: '/market',
      name: 'market',
      models: () => [ import('./models/market') ],
      component: () => import('./pages/market'),
    },
    {
      path: '/statistics',
      name: 'statistics',
      models: () => [ import('./models/statistics') ],
      component: () => import('./pages/statistics'),
    },
    {
      path: '/users',
      name: 'users',
      models: () => [ import('./models/users'), 
      import('./models/components/cusTree'),
      import('./models/components/cusList') ],
      component: () => import('./pages/users'),
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

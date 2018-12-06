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
        models: () => [ import('./models/home/dashboard.model') ],
        component: () => import('./pages/home/dashboard'),
        isExact: true,
    },
    {
      path: '/order',
      name: 'order',
      models: () => [ import('./models/order/order.model') ],
      component: () => import('./pages/order/order'),
      isExact: true,
    },
    {
      path: '/market',
      name: 'market',
      models: () => [ import('./models/market/market.model') ],
      component: () => import('./pages/market/market'),
      isExact: true,
    },
    {
      path: '/statistics',
      name: 'statistics',
      models: () => [ import('./models/statistics/statistics.model') ],
      component: () => import('./pages/statistics/statistics'),
      isExact: true,
    },
    {
      path: '/member',
      name: 'member',
      models: () => [ import('./models/member/member.model') ],
      component: () => import('./pages/member/member'),
      isExact: false,
    },
    {
      path: '/users',
      name: 'users',
      models: () => [ import('./models/users/user.model')],
      component: () => import('./pages/users/users'),
      isExact: true,
    }
  ];

  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path='/login' component={login} exact strict />
        <Route path='/' render={() => 
        <Layout className='h-full w-full'>
            <CusMenu></CusMenu>
            <Layout>
                <Top />
                <Content className='scroll-y pos-r'>
                {
                  routes.map(item => {
                      return (<Route key={item.name} path={item.path} exact={item.isExact} 
                      component={dynamic({app, models: item.models, component: item.component})} />);
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

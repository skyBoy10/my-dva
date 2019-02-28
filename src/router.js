import React from 'react';
import { Switch, Route, routerRedux, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import { Layout, LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

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
        path: '/app/dashboard',
        name: 'dashboard',
        component: dynamic({
          app,
          models: () => [ import('./models/home/dashboard.model') ],
          component: () => import('./pages/home/dashboard'),
        }),
        isExact: true,
        isHasChild: false,
    },
    {
      path: '/app/business',
      name: 'business',
      component: dynamic({
        app,
        models: () => [ import('./models/business/business.model'), 
          import('./models/business/roomTypes.model') ],
        component: () => import('./pages/business/business')
      })
    },
    {
      path: '/app/order',
      name: 'order',
      component: dynamic({
        app,
        models: () => [ import('./models/order/order.model'),
        import('./models/order/book.model') ],
        component: () => import('./pages/order/order'),
      }),
      isExact: false,
    },
    {
      path: '/app/member',
      name: 'member',
      component: dynamic({
        app,
        models: () => [ import('./models/member/member.model'), 
        import('./models/member/member.list.model'), import('./models/member/label.model'),
        import('./models/member/card.model')],
        component: () =>  import('./pages/member/member')
      }),
      isExact: false,
      isHasChild: true,
    },
    {
      path: '/app/market',
      name: 'market',
      component: dynamic({
        app,
        models: () => [ import('./models/market/market.model') ],
        component: () => import('./pages/market/market'),
      }),
      isExact: true,
    },
    {
      path: '/app/statistics',
      name: 'statistics',
      component: dynamic({
        app,
        models: () => [ import('./models/statistics/statistics.model') ],
        component: () => import('./pages/statistics/statistics'),
      }),
      isExact: true,
    },
    {
      path: '/app/users',
      name: 'users',
      component: dynamic({
        app,
        models: () => [ import('./models/users/user.model')],
        component: () => import('./pages/users/users'),
      }),
      isExact: true,
    },
    {
      path: '/app/exception/404',
      name: '404',
      component: dynamic({
        app,
        component: () => import('./pages/exception/404'),
      }),
      isExact: true,
    }
  ];

  /** 
   * 渲染路由
  */
  const renderRoutes = routes => {
    let result = null;

    if(routes && routes.length > 0) {
      result = routes.map(route => {
        if(route.isHasChild) {
          return (
          <Route key={route.path} path={route.path} exact={route.isExact} render={({ location }) => <route.component location={location} />} />
          );
        } 
        else {
          return (
            <Route key={route.path} path={route.path} exact={route.isExact} component={route.component} />
          );
        }
      });
    }
    
    return result;
  };

  return (
    <LocaleProvider locale={zhCN}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path='/' component={login} exact />
        <Route path='/login' component={login} exact />
        <Route path='/app' render={() => 
        <Layout className='h-full w-full'>
            <CusMenu />
            <Layout>
                <Top />
                <Content className='scroll-y pos-r'>
                  {renderRoutes(routes)}
                </Content>
            </Layout>
        </Layout>
        }/>
        <Redirect to='/login'/>
      </Switch>
    </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterCon;

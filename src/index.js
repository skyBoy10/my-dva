import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import { message } from 'antd';

/** 
 * 自定义样式
*/
import './assets/style/common.less';

/** 
 * mockApi
*/
import './fetch/mockApi';


// 1. Initialize
const app = dva({
    history: createHistory(),
    onError: e => {
        message.error(e.message, 3);
    }
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./model').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

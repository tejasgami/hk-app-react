import * as React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import Routes from './Routes';

import 'Styles/normalize.less';
import 'Styles/base.less';
import 'Styles/common.less';
import 'Styles/iscroll.less';
import 'Styles/flex-table.less';

export default ({ store }: any) =>
  <div>
    <Provider store={store}>
      <div>
        <HashRouter>
          <Routes />
        </HashRouter>
      </div>
    </Provider>
  </div>;

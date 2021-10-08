import React from 'react';

import {LayoutWrapper} from './LayoutStyles';

const Layout: React.FC = ({children}) => {
  return <LayoutWrapper>{children}</LayoutWrapper>;
};

export default Layout;

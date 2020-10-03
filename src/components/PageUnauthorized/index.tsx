import { Result, Button } from 'antd';
import React from 'react';

interface Props {
  status?: any;
}

const PageUnauthorized: React.FC<Props> = ({ status }) => {
  return (
    <Result
      status={status}
      title="Error"
      style={{
        background: 'none',
      }}
      subTitle="Unable to access this page"
    />
  );
};

export default PageUnauthorized;

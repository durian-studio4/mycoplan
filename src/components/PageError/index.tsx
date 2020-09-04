import { Result, Button } from 'antd';
import React from 'react';

interface Props {
  status?: any;
}

const PageError: React.FC<Props> = ({ status }) => {
  return (
    <Result
      status={status}
      title="Error"
      style={{
        background: 'none',
      }}
      subTitle="Something went wrong"
      extra={
        <Button type="primary" onClick={() => window.location.reload()}>
          Refresh Page
        </Button>
      }
    />
  );
};

export default PageError;

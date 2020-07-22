import React from 'react';
import styles from './index.less';

import Table from './Table';

interface Props {}

const PaymentComponent: React.FC<Props> = () => {
  return (
    <div>
      <h1>Payment</h1>

      <Table />
    </div>
  );
};

export default PaymentComponent;

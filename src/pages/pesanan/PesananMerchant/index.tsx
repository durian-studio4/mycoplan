import React from 'react';
import { Button, Card, Row, Input, Tabs } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import styles from './index.less';

import TableDelivery from './TableDelivery';
import TablePickUp from './TablePickUp';

interface Props {}

const { TabPane } = Tabs;

const PesananComponent: React.FC<Props> = () => {
  return (
    <div>
      <p className={styles.title}>Pesanan</p>
      <Card>
        <Row justify="space-between">
          <div className={styles.row_box}>
            <Button className={styles.button} type="primary">
              <DownloadOutlined /> Download CSV
            </Button>
          </div>
        </Row>
        <Tabs>
          <TabPane tab="Delivery" key="1">
            <TableDelivery />
          </TabPane>
          <TabPane tab="Store Pick Up" key="2">
            <TablePickUp />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default PesananComponent;

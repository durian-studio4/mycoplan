import React, { useContext } from 'react';
import { Button, Card, Row, Input, Tabs } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import styles from './index.less';

import { PermissionContext } from '@/layouts/context';

import TableComponent from './Table';

import PageUnauthorized from '@/components/PageUnauthorized';

interface Props {}

const { TabPane } = Tabs;

const PesananComponent: React.FC<Props> = () => {
  const context = useContext(PermissionContext);

  const pesanan_access = context && context[3];

  if (
    pesanan_access &&
    !pesanan_access.read &&
    !pesanan_access.delete &&
    !pesanan_access.update &&
    !pesanan_access.create
  ) {
    return <PageUnauthorized />;
  }

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
            <TableComponent pesanan_access={pesanan_access} />
          </TabPane>
          <TabPane tab="Store Pick Up" key="2">
            <TableComponent pesanan_access={pesanan_access} />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default PesananComponent;

import React from 'react';
import { Button, Card, Row, Tabs } from 'antd';
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
            <Tabs defaultActiveKey="1">
              <TabPane tab="Menunggu Pembayaran" key="1">
                <TableDelivery status={1} />
              </TabPane>
              <TabPane tab="Menunggu Konfirmasi" key="2">
                <TableDelivery status={2} />
              </TabPane>
              <TabPane tab="Dalam Proses" key="3">
                <TableDelivery status={3} />
              </TabPane>
              <TabPane tab="Sedang Dikirim" key="4">
                <TableDelivery status={4} />
              </TabPane>
              <TabPane tab="Penyesuaian" key="6">
                <TableDelivery status={6} />
              </TabPane>
              <TabPane tab="Selesai" key="7">
                <TableDelivery status={7} />
              </TabPane>
              <TabPane tab="Batal" key="8">
                <TableDelivery status={8} />
              </TabPane>
            </Tabs>
          </TabPane>
          <TabPane tab="Store Pick Up" key="2">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Menunggu Pembayaran" key="1">
                <TablePickUp status={1} />
              </TabPane>
              <TabPane tab="Menunggu Konfirmasi" key="2">
                <TablePickUp status={2} />
              </TabPane>
              <TabPane tab="Dalam Proses" key="3">
                <TablePickUp status={3} />
              </TabPane>
              <TabPane tab="Menunggu Pick Up" key="5">
                <TablePickUp status={5} />
              </TabPane>
              <TabPane tab="Penyesuaian" key="6">
                <TablePickUp status={6} />
              </TabPane>
              <TabPane tab="Selesai" key="7">
                <TablePickUp status={7} />
              </TabPane>
              <TabPane tab="Batal" key="8">
                <TablePickUp status={8} />
              </TabPane>
            </Tabs>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default PesananComponent;

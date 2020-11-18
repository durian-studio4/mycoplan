import React, { useContext, useEffect } from 'react';
import { Button, Card, Row, Tabs } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import styles from './index.less';

import { PermissionContext } from '@/layouts/context';

import { TabDelivery } from './TabsDelivery';
import { TabPickUp } from './TabsPickUp';

import PageUnauthorized from '@/components/PageUnauthorized';

import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useCreate';

interface Props {}

const { TabPane } = Tabs;

const PesananComponent: React.FC<Props> = () => {
  const context = useContext(PermissionContext);

  const pesanan_access = context && context[3];

  const [
    data_delivery,
    status_delivery,
    loading_delivery,
    error_delivery,
    fetchDelivery,
  ] = useFetch();

  const [data_pick_up, status_pick_up, loading_pick_up, error_pick_up, fetchPickUp] = useFetch();
  const [loading_update, status_update, postCreate, postUpdate] = useCreate();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchDelivery(`${REACT_APP_ENV}/admin/orders/?method=delivery`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_update]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchPickUp(`${REACT_APP_ENV}/admin/orders/?method=pickup`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_update]);

  const updateDelivery = (id: string, id_status: string) => {
    postUpdate(`${REACT_APP_ENV}/admin/orders/${id}`, JSON.stringify({ id_status }));
  };

  const createRequest = ({ json, clear }: any) => {
    postCreate(`${REACT_APP_ENV}/admin/gosend-booking`, json, clear);
  };

  let data_jumlah_delivery = (id: number) => {
    if (Boolean(loading_delivery)) {
      return 0;
    } else {
      if (status_delivery !== 200 || error_delivery) {
        return 0;
      } else {
        return data_delivery.filter(({ id_status }: any) => id_status === id);
      }
    }
  };

  let data_jumlah_pick_up = (id: number) => {
    if (Boolean(loading_pick_up)) {
      return 0;
    } else {
      if (status_pick_up !== 200 || error_pick_up) {
        return 0;
      } else {
        return data_pick_up.filter(({ id_status }: any) => id_status === id);
      }
    }
  };

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
            <TabDelivery
              data_jumlah_delivery={data_jumlah_delivery}
              pesanan_access={pesanan_access}
              loading_update={Boolean(loading_update)}
              status_update={Number(status_update)}
              updateDelivery={updateDelivery}
              createRequest={createRequest}
            />
          </TabPane>
          <TabPane tab="Store Pick Up" key="2">
            <TabPickUp
              data_jumlah_pick_up={data_jumlah_pick_up}
              pesanan_access={pesanan_access}
              loading_update={Boolean(loading_update)}
              status_update={Number(status_update)}
              updateDelivery={updateDelivery}
            />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default PesananComponent;

import React, { useEffect } from 'react';
import { Modal, Avatar, Row, Button, Divider, Col } from 'antd';
import styles from './index.less';

import useFetch from '@/hooks/useFetch';

import PageError from '@/components/PageError';
import PageLoading from '@/components/PageLoading';

interface Props {
  visible: boolean;
  role: string;
  id_transaction: number;
  onCancel: () => void;
}

const LacakComponent: React.FC<Props> = ({ visible, role, id_transaction, onCancel }) => {
  const [data_update, status_update, loading_update, error_update, fetchUpdate] = useFetch();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchUpdate(`${REACT_APP_ENV}/${role}/gosend-booking/${id_transaction}`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id_transaction, role]);

  return (
    <Modal visible={visible} title="Lacak Pesanan" onCancel={onCancel} footer={null}>
      {status_update !== 200 || error_update ? <PageError /> : null}
      {loading_update ? (
        <PageLoading />
      ) : (
        <div className={styles.modal_body}>
          <div className={styles.box10}>
            <Row justify="space-between" align="middle" style={{ margin: 10, height: '50px' }}>
              <Avatar
                style={{ verticalAlign: 'middle' }}
                size="large"
                gap={2}
                src={data_update.driverPhoto}
              />
              <Row justify="space-between" style={{ width: '90%', marginTop: 10 }}>
                <p>{data_update.driverName ? data_update.driverName : '-'}</p>
                {/*
                <div>
                  5
                  <StarTwoTone twoToneColor="#ffc234" style={{ marginLeft: 5 }} />
                </div> */}
              </Row>
            </Row>
            <Divider />
          </div>
          <div className={styles.box10}>
            <Row align="middle" style={{ margin: 10 }}>
              <Col>
                <p style={{ fontWeight: 'bold', fontSize: 16 }}>
                  {data_update.vehicleNumber ? data_update.vehicleNumber : '-'}
                </p>
                {/* <p>Lark Alfen</p> */}
              </Col>
            </Row>
            <Divider />
          </div>
          <div className={styles.box10}>
            <Row align="middle" style={{ margin: 10 }}>
              <Col>
                <p>No Resi</p>
                <p style={{ fontWeight: 'bold', fontSize: 16 }}>
                  {data_update.orderNo ? data_update.orderNo : '-'}
                </p>
              </Col>
            </Row>
            <Divider />
          </div>
          <div className={styles.box10}>
            <Row align="middle" style={{ margin: 10 }}>
              <Col>
                <p style={{ fontWeight: 'bold', fontSize: 16 }}>Pembeli</p>
                <p>{data_update.buyerAddressName ? data_update.buyerAddressName : '-'}</p>
                <p>{data_update.buyerAddressDetail ? data_update.buyerAddressDetail : '-'}</p>
              </Col>
            </Row>
            <Divider />
          </div>
          <div className={styles.box10}>
            <Row align="middle" style={{ margin: 10 }}>
              <Col>
                <p style={{ fontWeight: 'bold', fontSize: 16 }}>Penjual</p>
                <p>{data_update.sellerAddressName ? data_update.sellerAddressName : '-'}</p>
                <p>{data_update.sellerAddressDetail ? data_update.sellerAddressDetail : '-'}</p>
              </Col>
            </Row>
            <Divider />
          </div>

          <Button
            className={styles.button}
            onClick={() => window.open(data_update.liveTrackingUrl)}
            type="primary"
          >
            Lacak Driver
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default LacakComponent;

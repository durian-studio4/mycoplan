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
  notes: string | null;
  onCancel: () => void;
}

const LacakComponent: React.FC<Props> = ({ visible, role, id_transaction, notes, onCancel }) => {
  const [data_list, status_list, loading_list, error_list, fetchData] = useFetch();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchData(`${REACT_APP_ENV}/${role}/gosend-booking/${id_transaction}`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id_transaction, role]);

  return (
    <Modal visible={visible} title="Lacak Pesanan" onCancel={onCancel} footer={null}>
      {status_list !== 200 || error_list ? <PageError /> : null}
      {Boolean(loading_list) ? (
        <PageLoading />
      ) : (
        <div className={styles.modal_body}>
          <div className={styles.box10}>
            <Row justify="space-between" align="middle" style={{ margin: 10, height: '50px' }}>
              <Avatar
                style={{ verticalAlign: 'middle' }}
                size="large"
                gap={2}
                src={data_list.driverPhoto}
              />
              <Row justify="space-between" style={{ width: '90%', marginTop: 10 }}>
                <p>{data_list.driverName ? data_list.driverName : '-'}</p>
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
                <p>No Motor</p>
                <p style={{ fontWeight: 'bold', fontSize: 16 }}>
                  {data_list.vehicleNumber ? data_list.vehicleNumber : '-'}
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
                  {data_list.orderNo ? data_list.orderNo : '-'}
                </p>
              </Col>
            </Row>
            <Row align="middle" style={{ margin: 10 }}>
              <Col>
                <p>Catatan Pembeli</p>
                <p style={{ fontWeight: 'bold', fontSize: 16 }}>{notes ? notes : '-'}</p>
              </Col>
            </Row>
            <Divider />
          </div>
          <div className={styles.box10}>
            <Row align="middle" style={{ margin: 10 }}>
              <Col>
                <p style={{ fontWeight: 'bold', fontSize: 16 }}>Pembeli</p>
                <p>{data_list.buyerAddressName ? data_list.buyerAddressName : '-'}</p>
                <p>{data_list.buyerAddressDetail ? data_list.buyerAddressDetail : '-'}</p>
              </Col>
            </Row>
            <Divider />
          </div>
          <div className={styles.box10}>
            <Row align="middle" style={{ margin: 10 }}>
              <Col>
                <p style={{ fontWeight: 'bold', fontSize: 16 }}>Penjual</p>
                <p>{data_list.sellerAddressName ? data_list.sellerAddressName : '-'}</p>
                <p>{data_list.sellerAddressDetail ? data_list.sellerAddressDetail : '-'}</p>
              </Col>
            </Row>
            <Divider />
          </div>

          <Button
            className={styles.button}
            onClick={() => window.open(data_list.liveTrackingUrl)}
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

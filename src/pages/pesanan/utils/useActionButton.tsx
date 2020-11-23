import * as React from 'react';
import { Popconfirm, Button } from 'antd';
import styles from '../index.less';

interface PropsDelivery {
  id: string;
  id_status: number;
  notes: string | null;
  loading: boolean;
  updateDelivery: (id: string, status: string) => void;
  handleVisible: (id: string) => void;
  handleVisiblePesanan: (id: string, notes: string | null) => void;
}

interface PropsPickUp {
  id: string;
  id_status: number;
  loading: boolean;
  updateDelivery: (id: string, status: string) => void;
}

export const useDeliveryButton = () => {
  const renderButton = ({
    id,
    id_status,
    loading,
    notes,
    updateDelivery,
    handleVisible,
    handleVisiblePesanan,
  }: PropsDelivery) => (
    <>
      {id_status === 10 ? (
        <>
          <Popconfirm
            title="Apakah Anda Ingin Terima Pembatalan?"
            onConfirm={() => updateDelivery(id, '8')}
            okText="Yes"
            cancelText="No"
            disabled={loading}
          >
            <Button className={styles.button_action} id={id} disabled={loading} type="primary">
              Terima Pembatalan
            </Button>
          </Popconfirm>

          <Popconfirm
            title="Apakah Anda Ingin Tolak Pembatalan?"
            onConfirm={() => updateDelivery(id, '3')}
            okText="Yes"
            cancelText="No"
            disabled={loading}
          >
            <Button className={styles.button_action} id={id} disabled={loading} type="primary">
              Tolak Pembatalan
            </Button>
          </Popconfirm>
        </>
      ) : (
        <>
          <Popconfirm
            title="Apakah Anda Ingin Terima?"
            onConfirm={() => updateDelivery(id, '3')}
            okText="Yes"
            cancelText="No"
            disabled={loading || [1, 3, 4, 6, 7, 8, 9].includes(id_status)}
          >
            <Button
              className={styles.button_action}
              id={id}
              disabled={loading || [1, 3, 4, 6, 7, 8, 9].includes(id_status)}
              type="primary"
            >
              Terima
            </Button>
          </Popconfirm>

          <Button
            className={styles.button_action}
            id={id}
            onClick={() => handleVisible(id)}
            disabled={loading || [1, 2, 4, 6, 7, 8, 9].includes(id_status)}
            type="primary"
          >
            Request Delivery
          </Button>

          <Popconfirm
            title="Apakah Anda Ingin Penyesuaian?"
            onConfirm={() => updateDelivery(id, '6')}
            okText="Yes"
            cancelText="No"
            disabled={loading || [1, 2, 3, 6, 7, 8, 9].includes(id_status)}
          >
            <Button
              className={styles.button_action}
              id={id}
              disabled={loading || [1, 2, 3, 6, 7, 8, 9].includes(id_status)}
              type="primary"
            >
              Penyesuaian
            </Button>
          </Popconfirm>

          <Button
            className={styles.button_action}
            id={id}
            onClick={() => handleVisiblePesanan(id, notes)}
            disabled={loading || [1, 2, 3, 6, 7, 8, 9].includes(id_status)}
            type="primary"
          >
            Lacak Pesanan
          </Button>

          <Popconfirm
            title="Apakah Anda Ingin Selesai?"
            onConfirm={() => updateDelivery(id, '7')}
            okText="Yes"
            cancelText="No"
            disabled={loading || [1, 2, 3, 7, 8, 9].includes(id_status)}
          >
            <Button
              className={styles.button_action}
              id={id}
              disabled={loading || [1, 2, 3, 7, 8, 9].includes(id_status)}
              type="primary"
            >
              Pesanan Selesai
            </Button>
          </Popconfirm>

          <Popconfirm
            title="Apakah Anda Ingin Batalkan?"
            onConfirm={() => updateDelivery(id, '8')}
            okText="Yes"
            cancelText="No"
            disabled={loading || [4, 6, 7, 8, 9].includes(id_status)}
          >
            <Button
              className={styles.button_action}
              id={id}
              disabled={loading || [4, 6, 7, 8, 9].includes(id_status)}
              type="primary"
            >
              Batalkan
            </Button>
          </Popconfirm>
        </>
      )}
    </>
  );
  return [renderButton];
};

export const usePickUpButton = () => {
  const renderButton = ({ id, id_status, loading, updateDelivery }: PropsPickUp) => (
    <>
      <Popconfirm
        title="Apakah Anda Ingin Terima?"
        onConfirm={() => updateDelivery(id, '3')}
        okText="Yes"
        cancelText="No"
        disabled={Boolean(loading) || [1, 3, 5, 6, 7, 8, 9].includes(id_status)}
      >
        <Button
          className={styles.button_action}
          id={id}
          disabled={Boolean(loading) || [1, 3, 5, 6, 7, 8, 9].includes(id_status)}
          type="primary"
        >
          Terima
        </Button>
      </Popconfirm>

      <Button
        className={styles.button_action}
        id={id}
        onClick={() => updateDelivery(id, '5')}
        disabled={Boolean(loading) || [1, 2, 5, 6, 7, 8, 9].includes(id_status)}
        type="primary"
      >
        Siap Untuk Pick Up
      </Button>

      <Popconfirm
        title="Apakah Anda Ingin Penyesuaian?"
        onConfirm={() => updateDelivery(id, '6')}
        okText="Yes"
        cancelText="No"
        disabled={Boolean(loading) || [1, 2, 3, 6, 7, 8, 9].includes(id_status)}
      >
        <Button
          className={styles.button_action}
          id={id}
          disabled={Boolean(loading) || [1, 2, 3, 6, 7, 8, 9].includes(id_status)}
          type="primary"
        >
          Penyesuaian
        </Button>
      </Popconfirm>

      <Popconfirm
        title="Apakah Anda Ingin Selesai?"
        onConfirm={() => updateDelivery(id, '7')}
        okText="Yes"
        cancelText="No"
        disabled={Boolean(loading) || [1, 2, 3, 7, 8, 9].includes(id_status)}
      >
        <Button
          className={styles.button_action}
          id={id}
          disabled={Boolean(loading) || [1, 2, 3, 7, 8, 9].includes(id_status)}
          type="primary"
        >
          Pesanan Selesai
        </Button>
      </Popconfirm>

      <Popconfirm
        title="Apakah Anda Ingin Batalkan?"
        onConfirm={() => updateDelivery(id, '8')}
        okText="Yes"
        cancelText="No"
        disabled={Boolean(loading) || [6, 7, 8, 9].includes(id_status)}
      >
        <Button
          className={styles.button_action}
          id={id}
          disabled={Boolean(loading) || [6, 7, 8, 9].includes(id_status)}
          type="primary"
        >
          Batalkan
        </Button>
      </Popconfirm>
    </>
  );
  return [renderButton];
};

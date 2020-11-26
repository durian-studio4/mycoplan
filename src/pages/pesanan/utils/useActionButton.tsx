import React from 'react';
import { Popconfirm, Button } from 'antd';
import styles from '../index.less';

interface PropsDelivery {
  id: string;
  id_status: number;
  nama: string | null;
  telepon: string | null;
  merchant: string | null;
  notes: string | null;
  loading: boolean;
  updateDelivery: (id: string, status: string) => void;
  handleVisible: (id: string) => void;
  handleVisiblePesanan: (
    id: string,
    notes: string | null,
    nama: string | null,
    telepon: string | null,
    merchant: string | null,
  ) => void;
}

interface PropsPickUp {
  id: string;
  id_status: number;
  loading: boolean;
  updateDelivery: (id: string, status: string) => void;
}

const renderPembatalan = ({
  loading,
  update,
  id,
}: {
  loading: boolean;
  update: (id: string, id_status: string) => void;
  id: string;
}) => (
  <>
    <Popconfirm
      title="Apakah Anda Ingin Terima Pembatalan?"
      onConfirm={() => update(id, '8')}
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
      onConfirm={() => update(id, '3')}
      okText="Yes"
      cancelText="No"
      disabled={loading}
    >
      <Button className={styles.button_action} id={id} disabled={loading} type="primary">
        Tolak Pembatalan
      </Button>
    </Popconfirm>
  </>
);

export const useDeliveryButton = (status_pengiriman: string) => {
  const renderButton = ({
    id,
    id_status,
    loading,
    nama,
    telepon,
    merchant,
    notes,
    updateDelivery,
    handleVisible,
    handleVisiblePesanan,
  }: PropsDelivery) => (
    <>
      {id_status === 10 ? (
        renderPembatalan({
          loading,
          update: updateDelivery,
          id,
        })
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
            disabled={
              loading || status_pengiriman === 'dikirim'
                ? [1, 2, 6, 7, 8, 9].includes(id_status)
                : [1, 2, 4, 6, 7, 8, 9].includes(id_status)
            }
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
            onClick={() => handleVisiblePesanan(id, notes, nama, telepon, merchant)}
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
      {id_status === 10 ? (
        renderPembatalan({
          loading,
          update: updateDelivery,
          id,
        })
      ) : (
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
      )}
    </>
  );
  return [renderButton];
};

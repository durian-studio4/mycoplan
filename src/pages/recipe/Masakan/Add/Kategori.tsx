import React, { useState, useEffect, useMemo } from 'react';
import { Modal, Row, Input, Button, Table } from 'antd';
import styles from '../index.less';

interface Props {
  visible: boolean;
  onCancel: () => void;
}

const rowSelection = {
  onChange: (selectedRowKeys: any, selectedRows: any) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};

const KategoriComponent: React.FC<Props> = ({ visible, onCancel }) => {
  const columns = useMemo(
    () => [
      {
        align: 'center',
        title: 'Name',
        dataIndex: 'name',
      },
    ],
    [],
  );

  return (
    <Modal visible={visible} title="Pilih Kategori Resep" closable={false} footer={null}>
      <div className={styles.modal_body}>
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          columns={columns}
        />
      </div>
      <Row justify="end">
        {/* {onError ? <p style={{ color: 'red' }}>{onError}</p> : null} */}
        <Button
          className={styles.button}
          // disabled={onLoadButton}
          // onClick={handleClearState}
          onClick={onCancel}
          type="primary"
          danger
        >
          Batal
        </Button>
        <Button
          className={styles.button}
          // onClick={createKaryawan}
          // disabled={isDisabled || onLoadButton}
          type="primary"
        >
          Simpan
        </Button>
      </Row>
    </Modal>
  );
};

export default KategoriComponent;

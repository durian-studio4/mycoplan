import React, { useState, useEffect, useMemo } from 'react';
import { Modal, Row, Input, Button, Table } from 'antd';
import styles from './index.less';

import SelectPeran from '@/components/Select/SelectPeran';

interface Props {}

const rowSelection = {
  onChange: (selectedRowKeys: any, selectedRows: any) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};

const KemasanComponent: React.FC<Props> = () => {
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
    <Modal visible={true} title="Pilih Kemasan Lain" closable={false} footer={null}>
      <div className={styles.modal_body}>
        <Row>
          <div className={styles.box10}>
            <table style={{ textAlign: 'center', width: '100%' }}>
              <tbody>
                <tr>
                  <td align="left">Supermarket</td>
                  <td align="center">:</td>
                  {/* <td align="right">{data && data.tanggal}</td> */}
                </tr>
                <tr>
                  <td align="left">Kategori</td>
                  <td align="center">:</td>
                  {/* <td align="right">{data && data.nama_sales}</td> */}
                </tr>
                <tr>
                  <td align="left">Sub Kategori</td>
                  <td align="center">:</td>
                  <td align="left">PT. Alternate Farma</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Row>
        <Table
          style={{ marginTop: '1em' }}
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

export default KemasanComponent;

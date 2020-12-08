import React, { useEffect, useState } from 'react';
import { Button, Card, Row } from 'antd';
import { NavLink, useParams } from 'umi';
import styles from './index.less';

import TableComponent from './Table';
import { AddCsvComponent, EditCsvComponent } from './Csv';

import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useCreateForm';

interface Props {}

const MerchantProdukComponent: React.FC<Props> = () => {
  const { id, code } = useParams();

  const [data_list, status_list, loading_list, error_list, fetchList] = useFetch();
  const [loading_update, status_update, postCreate, postUpdate, postDelete] = useCreate();

  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchList(`${REACT_APP_ENV}/admin/products/?merchant=${id}`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_update]);

  const onChangeVisibleAdd = () => setVisibleAdd(!visibleAdd);
  const onChangeVisibleEdit = () => setVisibleEdit(!visibleEdit);

  const consoleLog = () => console.log('success');

  const deactiveProduk = (id: string) => {
    const formData = new FormData();
    formData.append('status', 'inactive');
    postCreate(`${REACT_APP_ENV}/admin/products/${id}?_method=put`, formData, consoleLog);
  };

  const activeProduk = (id: string) => {
    const formData = new FormData();
    formData.append('status', 'active');
    postCreate(`${REACT_APP_ENV}/admin/products/${id}?_method=put`, formData, consoleLog);
  };

  // const updateProduk = ({ formData, clear }: any) => {
  //   postCreate(`${REACT_APP_ENV}/admin/merchants/${id_update}?_method=put`, formData, clear);
  // };

  const deleteProduk = (id: string) => {
    postDelete(`${REACT_APP_ENV}/admin/products/${id}`);
  };

  return (
    <div>
      <Card>
        <Row justify="space-between">
          <p className={styles.title}>Daftar Produk</p>
          <div className={styles.row_box}>
            {/* <Input
              className={styles.input_search}
              id="name"
              type="text"
              placeholder="Cari Produk"
              onChange={onChangeState}
              value={name}
              onKeyDown={handleKey}
            /> */}
            <Button
              className={styles.button_search}
              type="primary"
              onClick={onChangeVisibleAdd}
              danger
            >
              Tambah Sekaligus
            </Button>
            <Button className={styles.button_ubah} type="primary" onClick={onChangeVisibleEdit}>
              Ubah Sekaligus
            </Button>
            <NavLink to={`/merchant/produk/add/${id}/${code}`}>
              <Button className={styles.button_search} type="primary">
                + Tambah Produk
              </Button>
            </NavLink>
          </div>
        </Row>
        <TableComponent
          id={id}
          code={code}
          data={data_list}
          loading={Boolean(loading_list)}
          status={Number(status_list)}
          error={error_list}
          onDeactive={deactiveProduk}
          onActive={activeProduk}
          onDelete={deleteProduk}
        />
      </Card>
      {visibleAdd ? (
        <AddCsvComponent visible={visibleAdd} id_merchant={id} onCancel={onChangeVisibleAdd} />
      ) : null}
      {visibleEdit ? (
        <EditCsvComponent visible={visibleEdit} onCancel={onChangeVisibleEdit} />
      ) : null}
    </div>
  );
};

export default MerchantProdukComponent;

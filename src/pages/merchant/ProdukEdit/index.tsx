import React, { useEffect } from 'react';
import { Button, Card, Row } from 'antd';
import { NavLink, useParams } from 'umi';
import styles from './index.less';

import TableComponent from './Table';

import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useCreateForm';

interface Props {}

const MerchantProdukComponent: React.FC<Props> = () => {
  const { id, code } = useParams();

  const [data_list, status_list, loading_list, error_list, fetchList] = useFetch();
  const [loading_update, status_update, postCreate, postUpdate, postDelete] = useCreate();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchList(`${REACT_APP_ENV}/admin/products/?merchant=${id}`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status_update]);

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
      <p className={styles.title}>{data_list.name}</p>
      <Card>
        <Row justify="space-between">
          <p className={styles.title}>Daftar Produk {data_list.name}</p>
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
    </div>
  );
};

export default MerchantProdukComponent;

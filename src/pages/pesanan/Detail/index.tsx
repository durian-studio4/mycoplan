import React, { useEffect, useState } from 'react';
import { Card, Row, Button } from 'antd';
import { useParams, useHistory } from 'umi';
import styles from './index.less';

import TableComponent from './Table';
import DetailComponent from './Detail';
import AddComponent from './Add';
import EditComponent from './Edit';

import PageError from '@/components/PageError';

import useFetch from '@/hooks/useFetch';
import useCreate from '@/hooks/useCreate';

interface Props {}

const PesananDetailComponent: React.FC<Props> = () => {
  const { role, id } = useParams();
  const history = useHistory();

  const [visible, setVisible] = useState(false);
  const [id_product, setIdProduct] = useState('');
  const [name_product, setNameProduct] = useState('');

  const [visibleEdit, setVisibleEdit] = useState(false);
  const [id_edit, setIdEdit] = useState('');

  const [data_list, status_list, loading_list, error_list, fetchList] = useFetch();
  const [loading_update, status_update, postCreate, postUpdate, postDelete] = useCreate();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchList(`${REACT_APP_ENV}/${role}/orders/${id}`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, role, status_update]);

  const handleVisibleAdd = (product_id: string, product_name: string) => {
    setVisible(!visible);
    setIdProduct(product_id);
    setNameProduct(product_name);
  };

  const handleClearVisibleAdd = () => {
    setVisible(false);
    setIdProduct('');
    setNameProduct('');
  };

  const handleVisibleEdit = (product_id: string, product_name: string) => {
    setVisibleEdit(!visibleEdit);
    setIdEdit(product_id);
    setNameProduct(product_name);
  };

  const handleClearVisibleEdit = () => {
    setVisibleEdit(false);
    setNameProduct('');
    setIdEdit('');
  };

  const createTransaction = ({ json, clear }: any) => {
    postCreate(`${REACT_APP_ENV}/${role}/transaction-adjustments/`, json, clear);
  };

  const updateTransaction = ({ json, clear }: any) => {
    postUpdate(`${REACT_APP_ENV}/${role}/transaction-adjustments/${id_edit}`, json);
    clear();
  };

  const updateStatusDelivery = (id_status: string) => {
    postUpdate(`${REACT_APP_ENV}/${role}/orders/${id}`, JSON.stringify({ id_status }));
    history.goBack();
  };

  return (
    <div>
      <Row justify="space-between">
        <p className={styles.title}>Detail Pesanan</p>
        <Button className={styles.button} type="primary" onClick={() => updateStatusDelivery('6')}>
          Selesai
        </Button>
      </Row>
      {error_list || status_list !== 200 ? <PageError /> : null}
      <Card>
        <DetailComponent data={data_list} loading={Boolean(loading_list)} />
        <TableComponent
          data={data_list.products}
          status={data_list.detail_order}
          loading={Boolean(loading_list)}
          handleAdd={handleVisibleAdd}
          handleEdit={handleVisibleEdit}
        />
      </Card>
      {visible ? (
        <AddComponent
          visible={visible}
          id_product={id_product}
          id_transaction={id}
          name_product={name_product}
          onLoadButton={Boolean(loading_update)}
          onCreate={createTransaction}
          onCancel={handleClearVisibleAdd}
        />
      ) : null}
      {visibleEdit ? (
        <EditComponent
          visible={visibleEdit}
          name_product={name_product}
          id_edit={id_edit}
          onLoadButton={Boolean(loading_update)}
          onUpdate={updateTransaction}
          onCancel={handleClearVisibleEdit}
        />
      ) : null}
    </div>
  );
};

export default PesananDetailComponent;

import React, { useMemo, useEffect } from 'react';
import { Card, Table } from 'antd';
import { FormattedMessage } from 'umi';

import PageError from '@/components/PageError';

import useFetch from '@/hooks/useFetch';

const UsiaPenggunaComponent = () => {
  const [data_age, status_age, loading_age, error_age, fetchAge] = useFetch();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchAge(`${REACT_APP_ENV}/merchant/dashboard/users/age`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let data_array = [];

  for (let key in data_age) {
    data_array.push({
      no: Number(key) + 1,
      id: data_age[key].id,
      usia: data_age[key].condition,
      jumlah: data_age[key].value,
    });
  }

  const columns = useMemo(
    () => [
      {
        align: 'center',
        title: <FormattedMessage id="no" defaultMessage="No." />,
        dataIndex: 'no',
      },
      {
        align: 'center',
        title: <FormattedMessage id="age" defaultMessage="Usia" />,
        dataIndex: 'usia',
      },
      {
        align: 'center',
        title: <FormattedMessage id="total" defaultMessage="Jumlah" />,
        dataIndex: 'jumlah',
      },
    ],
    [],
  );

  return (
    <Card
      bordered={false}
      title={<FormattedMessage id="pengguna" defaultMessage="Pengguna Berdasarkan Usia" />}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      {status_age !== 200 || error_age ? <PageError /> : null}
      <Table columns={columns} loading={Boolean(loading_age)} dataSource={data_array} />
    </Card>
  );
};

export default UsiaPenggunaComponent;

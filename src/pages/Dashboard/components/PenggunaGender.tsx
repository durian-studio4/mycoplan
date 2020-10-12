import React, { useContext, useEffect } from 'react';
import { Card } from 'antd';
import { FormattedMessage } from 'umi';
import { Pie } from './Charts';
import styles from '../style.less';

import { PermissionContext } from '@/layouts/context';

import PageLoading from '@/components/PageLoading';
import PageError from '@/components/PageError';

import useFetch from '@/hooks/useFetch';

const GenderPenggunaComponent = () => {
  const context = useContext(PermissionContext);

  const dashboard_access = context && context[0];

  const [data_gender, status_gender, loading_gender, error_gender, fetchGender] = useFetch();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchGender(`${REACT_APP_ENV}/admin/dashboard/users/gender`);
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card
      className={styles.salesCard}
      bordered={false}
      title={<FormattedMessage id="pengguna" defaultMessage="Pengguna Berdasarkan Jenis Kelamin" />}
      style={{
        height: '100%',
        display: dashboard_access && dashboard_access.read ? 'block' : 'none',
      }}
    >
      {status_gender !== 200 || error_gender ? <PageError /> : null}
      {Boolean(loading_gender) ? (
        <PageLoading />
      ) : (
        <div>
          <h4 style={{ marginTop: 8, marginBottom: 32 }}>
            <FormattedMessage id="pengguna" defaultMessage="Pengguna" />
          </h4>
          <Pie
            hasLegend
            subTitle={<FormattedMessage id="pengguna" defaultMessage="Pengguna" />}
            // total={() => [data_gender].reduce((pre, now) => Number(now + pre), 0)}
            data={data_gender}
            // valueFormat={(value) => <Yuan>{value}</Yuan>}
            height={248}
            lineWidth={4}
          />
        </div>
      )}
    </Card>
  );
};

export default GenderPenggunaComponent;

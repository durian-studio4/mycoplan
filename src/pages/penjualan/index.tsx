import React, { useContext } from 'react';
import styles from './index.less';

import TableMerchant from './TableMerchant';
import TableTotal from './TableTotal';
import Chart from './Chart';

import { PermissionContext } from '@/layouts/context';

import SelectMerchantPenjualan from '@/components/Select/SelectMerchantPenjualan';

import PageUnauthorized from '@/components/PageUnauthorized';

import useSelect from '@/hooks/useSelect';

interface Props {}

const PenjualanComponent: React.FC<Props> = () => {
  const context = useContext(PermissionContext);

  const penjualan_access = context && context[6];

  const [id_merchant, onChangeIdMerchant] = useSelect('0');

  if (
    penjualan_access &&
    !penjualan_access.read &&
    !penjualan_access.delete &&
    !penjualan_access.update &&
    !penjualan_access.create
  ) {
    return <PageUnauthorized />;
  }

  return (
    <div>
      <p className={styles.title}>Penjualan</p>
      <div className={styles.row}>
        <div className={styles.box5} style={{ margin: '1em 0px' }}>
          <SelectMerchantPenjualan initial="Semua Penjualan" handleChange={onChangeIdMerchant} />
        </div>
      </div>
      <Chart id_merchant={String(id_merchant)} />
      <TableTotal id_merchant={String(id_merchant)} />
      <TableMerchant id_merchant={String(id_merchant)} />
    </div>
  );
};

export default PenjualanComponent;

import React, { useMemo, useState, useEffect } from 'react';
import { Table, Row, Button, DatePicker, Tabs, Card } from 'antd';
import { FormattedMessage } from 'umi';
import { DownloadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { format } from 'date-fns';
import styles from '../index.less';

import PageError from '@/components/PageError';

import useDownloadCsv from '@/hooks/useDownloadCsv';
import useFetch from '@/hooks/useFetch';
import useFilterColumn from '@/hooks/useFilterColumn';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

interface Props {
  name: string | undefined;
}

let initialDate = new Date();
let y = initialDate.getFullYear();
let m = initialDate.getMonth();
let firstDay = format(new Date(y, m, 1), 'yyyy-MM-dd');
let lastDay = format(new Date(y, m + 1, 0), 'yyyy-MM-dd');

const TableTotalComponent: React.FC<Props> = ({ name }) => {
  const [getColumnSearchProps] = useFilterColumn();

  const [rangePickerValue, setRangePickerValue] = useState([firstDay, lastDay]);
  const [category, setCategory] = useState('day');

  const [data_list, status_list, loading_list, error_list, fetchList] = useFetch();

  const [loading_download, onDownloadCSV] = useDownloadCsv();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchList(
        `${REACT_APP_ENV}/merchant/sales/total?category=${category}&start_date=${rangePickerValue[0]}&end_date=${rangePickerValue[1]}`,
      );
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, rangePickerValue]);

  const handleRangePickerChange = (dateString: any, date: any) => {
    setRangePickerValue([date[0], date[1]]);
  };

  const selectDate = (type: 'day' | 'week' | 'month' | 'year') => {
    setCategory(type);
  };

  const isActive = (type: 'day' | 'week' | 'month' | 'year') => {
    if (!category) {
      return '';
    }
    if (category === type) {
      return styles.currentDate;
    }
  };

  let data_array = [];

  for (let key in data_list) {
    data_array.push({
      no: Number(key) + 1,
      tanggal: data_list[key].date,
      unit: data_list[key].unit,
      total: data_list[key].total_sales,
      total_lebih: data_list[key].extra_payment,
      total_kurang: data_list[key].less_payment,
      total_penyesuaian: data_list[key].total_adjustments,
    });
  }

  const columns = useMemo(
    () => [
      {
        align: 'center',
        title: 'No.',
        dataIndex: 'no',
        key: 'no',
        ...getColumnSearchProps('no'),
      },
      {
        align: 'center',
        title: 'Tanggal',
        dataIndex: 'tanggal',
        key: 'tanggal',
        ...getColumnSearchProps('tanggal'),
      },
      {
        align: 'center',
        title: 'Unit',
        dataIndex: 'unit',
        key: 'unit',
        ...getColumnSearchProps('unit'),
      },
      {
        align: 'center',
        title: 'Total Penjualan (Rp.)',
        dataIndex: 'total',
        render: (props) => <p>{Number(props).toLocaleString()}</p>,
        key: 'total',
      },
      {
        align: 'center',
        title: 'Total Lebih Bayar (Rp.)',
        dataIndex: 'total_lebih',
        render: (props) => <p>{Number(props).toLocaleString()}</p>,
        key: 'total_lebih',
      },
      {
        align: 'center',
        title: 'Total Kurang Bayar (Rp.)',
        dataIndex: 'total_kurang',
        render: (props) => <p>{Number(props).toLocaleString()}</p>,
        key: 'total_kurang',
      },
      {
        align: 'center',
        title: 'Total Penyesuaian Penjualan (Rp.)',
        dataIndex: 'total_penyesuaian',
        render: (props) => <p>{Number(props).toLocaleString()}</p>,
        key: 'total_penyesuaian',
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <Card
      style={{
        marginBottom: '1em',
      }}
    >
      <Row justify="space-between">
        <p className={styles.title}>Total Semua Penjualan</p>
        <Button
          className={styles.button}
          type="primary"
          disabled={Boolean(loading_download)}
          onClick={() =>
            onDownloadCSV({
              url: `${REACT_APP_ENV}/merchant/sales/total?category=${category}&start_date=${rangePickerValue[0]}&end_date=${rangePickerValue[1]}&download=1`,
              file: `Total Penjualan ${name}`,
            })
          }
        >
          <DownloadOutlined /> Download CSV
        </Button>
      </Row>
      {status_list !== 200 || error_list ? <PageError /> : null}
      {/* <div className={styles.salesCard}> */}
      <Tabs
        tabBarExtraContent={
          <div className={styles.salesExtraWrap}>
            <div className={styles.salesExtra}>
              <a className={isActive('day')} onClick={() => selectDate('day')}>
                <FormattedMessage id="harian" defaultMessage="Harian" />
              </a>
              <a className={isActive('week')} onClick={() => selectDate('week')}>
                <FormattedMessage id="mingguan" defaultMessage="Mingguan" />
              </a>
              <a className={isActive('month')} onClick={() => selectDate('month')}>
                <FormattedMessage id="bulanan" defaultMessage="Bulanan" />
              </a>
              <a className={isActive('year')} onClick={() => selectDate('year')}>
                <FormattedMessage id="tahunan" defaultMessage="Tahunan" />
              </a>
            </div>
            <RangePicker
              onChange={handleRangePickerChange}
              defaultValue={[moment(rangePickerValue[0]), moment(rangePickerValue[1])]}
              style={{ width: 256 }}
            />
          </div>
        }
        size="large"
        tabBarStyle={{ marginBottom: 24 }}
      >
        {/* <TabPane
            tab={<FormattedMessage id="grafik-penjualan" defaultMessage="Grafik Penjualan" />}
            key="penjualan"
          > */}
        <div style={{ width: '100%' }}>
          <Table columns={columns} loading={Boolean(loading_list)} dataSource={data_array} />
        </div>
        {/* </TabPane> */}
      </Tabs>
      {/* </div> */}
    </Card>
  );
};

export default TableTotalComponent;

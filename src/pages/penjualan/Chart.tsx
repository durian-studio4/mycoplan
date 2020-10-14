import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Row, DatePicker, Tabs } from 'antd';
import { FormattedMessage } from 'umi';
import moment from 'moment';
import { format } from 'date-fns';
import styles from './index.less';

import { Bar } from '@/pages/Dashboard/components/Charts';

import { PermissionContext } from '@/layouts/context';

import PageLoading from '@/components/PageLoading';
import PageError from '@/components/PageError';

import useFetch from '@/hooks/useFetch';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

interface Props {
  id_merchant: string;
}

let initialDate = new Date();
let y = initialDate.getFullYear();
let m = initialDate.getMonth();
let firstDay = format(new Date(y, m, 1), 'yyyy-MM-dd');
let lastDay = format(new Date(y, m + 1, 0), 'yyyy-MM-dd');

const ChartComponent: React.FC<Props> = ({ id_merchant }) => {
  const context = useContext(PermissionContext);
  // const [getColumnSearchProps] = useFilterColumn();

  const penjualan_access = context && context[6];

  const [rangePickerValue, setRangePickerValue] = useState([firstDay, lastDay]);
  const [category, setCategory] = useState('day');

  const [data_chart, status_chart, loading_chart, error_chart, fetchChart] = useFetch();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchChart(
        `${REACT_APP_ENV}/admin/sales/chart?category=${category}&start_date=${rangePickerValue[0]}&end_date=${rangePickerValue[1]}&merchant=${id_merchant}`,
      );
    }, 0);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, id_merchant, rangePickerValue]);

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

  for (let key in data_chart) {
    data_array.push({
      x: data_chart[key].date,
      y: data_chart[key].value,
    });
  }

  return (
    <Card
      bordered={false}
      bodyStyle={{ padding: 0 }}
      style={{ display: penjualan_access && penjualan_access.read ? 'block' : 'none' }}
    >
      {status_chart !== 200 || error_chart ? <PageError /> : null}
      {Boolean(loading_chart) ? (
        <PageLoading />
      ) : (
        <div className={styles.salesCard}>
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
            <TabPane
              tab={<FormattedMessage id="grafik-penjualan" defaultMessage="Grafik Penjualan" />}
              key="penjualan"
            >
              <Row>
                <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesBar}>
                    <Bar
                      height={295}
                      title={
                        <FormattedMessage
                          id="total-semua-penjualan"
                          defaultMessage="Total Semua Penjualan"
                        />
                      }
                      data={data_array}
                    />
                  </div>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </div>
      )}
    </Card>
  );
};

export default ChartComponent;

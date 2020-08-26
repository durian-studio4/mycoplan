import React, { useMemo } from 'react';
import { Table, Row, Button } from 'antd';
import styles from './index.less';

interface Props {}

const TableComponent: React.FC<Props> = () => {
  // const [getColumnSearchProps] = useFilterColumn();

  const columns = useMemo(
    () => [
      {
        align: 'center',
        title: 'No.',
        dataIndex: 'no',
        key: 'no',
      },
      {
        align: 'center',
        title: 'Sub Kategori Produk',
      },
      {
        align: 'center',
        title: 'Action',
        render: (props: any) => (
          <Row justify="space-around">
            <Button
              className={styles.button}
              id={props.id}
              // onClick={() => visibleUpdate(props.id)}
              type="primary"
            >
              Edit
            </Button>
            <Button
              className={styles.button}
              id={props.id}
              // onClick={() => remove(props.id)}
              type="primary"
              danger
            >
              Delete
            </Button>
          </Row>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // if (error) {
  //   return <PageError status={status} />;
  // }

  return <Table columns={columns} />;
};

export default TableComponent;

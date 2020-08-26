import React, { useMemo } from 'react';
import { Table, Row, Button } from 'antd';
import { NavLink } from 'umi';
import styles from './index.less';

interface Props {}

const TableComponent: React.FC<Props> = () => {
  // const [getColumnSearchProps] = useFilterColumn();

  const data = [
    {
      no: 1,
      id: 415,
      nama: 'test',
    },
  ];

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
        title: 'Nama',
        dataIndex: 'nama',
        key: 'nama',
      },
      {
        align: 'left',
        title: 'Email',
      },
      {
        align: 'center',
        title: 'Peran',
      },
      {
        align: 'center',
        title: 'Tanggal Dimasukkan',
      },
      // {
      //   align: 'center',
      //   title: 'Status',
      //   key: 'status',
      //   render: ({ id }: any) => {
      //     {
      //       if (id === 1) {
      //         <Radio>Active</Radio>;
      //       }
      //       if (id === 2) {
      //         <Radio>Running</Radio>;
      //       }
      //       if (id === 3) {
      //         <Radio>Banned</Radio>;
      //       }
      //     }
      //   },
      // },
      {
        align: 'center',
        title: 'Action',
        width: 150,
        render: (props: any) => (
          <Row justify="center">
            <Button type="primary" className={styles.button_action}>
              <NavLink to={`/admin/edit/${props.id}`} id={props.id}>
                Edit
              </NavLink>
            </Button>
            <Button
              className={styles.button_action}
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

  return <Table columns={columns} dataSource={data} />;
};

export default TableComponent;

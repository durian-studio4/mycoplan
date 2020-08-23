import React, { useMemo, useCallback, useRef, useState } from 'react';
import { Table, Row, Button } from 'antd';
import { DndProvider, useDrag, useDrop, createDndContext } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import styles from './index.less';

interface Props {}

const RNDContext = createDndContext(HTML5Backend);

const type = 'DragableBodyRow';

const DragableBodyRow = ({ index, moveRow, className, style, ...restProps }: any) => {
  const ref = React.useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: (item) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    item: { type, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  );
};

const initialData = [
  {
    no: '1',
    judul: 'Judul Banner',
    description: 'Deskripsi',
    syarat: 'none',
    promo: 'none',
    tipe_banner: 'Gambar Saja',
  },
  {
    no: '2',
    judul: 'Judul Banner',
    description: 'Deskripsi',
    syarat: 'none',
    promo: 'none',
    tipe_banner: 'Gambar & Detail',
  },
];

const TableComponent: React.FC<Props> = () => {
  // const [getColumnSearchProps] = useFilterColumn();
  const [data, setData] = useState(initialData);
  const manager = useRef(RNDContext);

  const components = {
    body: {
      row: DragableBodyRow,
    },
  };

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = data[dragIndex];
      setData(
        update(data, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        }),
      );
    },
    [data],
  );

  const columns = useMemo(
    () => [
      {
        align: 'center',
        title: 'No',
        dataIndex: 'no',
        key: 'no',
      },
      {
        align: 'center',
        title: 'Gambar',
        dataIndex: 'gambar',
        key: 'gambar',
      },
      {
        align: 'center',
        title: 'Judul Banner Merchant',
        dataIndex: 'judul',
        key: 'judul',
      },
      {
        align: 'left',
        title: 'Deskripsi Banner',
        dataIndex: 'description',
        key: 'description',
      },
      {
        align: 'center',
        title: 'Waktu Mulai',
      },
      {
        align: 'center',
        title: 'Waktu Akhir',
      },
      {
        align: 'center',
        title: 'Syarat & Ketentuan',
        dataIndex: 'syarat',
        key: 'syarat',
      },
      {
        align: 'center',
        title: 'Kode Promo',
        dataIndex: 'promo',
        key: 'promo',
      },
      {
        align: 'center',
        title: 'Tipe Banner',
        key: 'banner',
        dataIndex: 'tipe_banner',
      },
      {
        align: 'center',
        title: 'Status',
        key: 'status',
        render: ({ id }: any) => (id === 1 ? <p>Active</p> : <p>Deactive</p>),
      },
      {
        align: 'center',
        title: 'Action',
        render: (props: any) => (
          // <Dropdown overlay={menu} trigger={['click']}>
          //   <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          //     <MenuOutlined />
          //   </a>
          // </Dropdown>
          <Row justify="center">
            <Button
              className={styles.button_action}
              id={props.id}
              // onClick={() => visibleUpdate(props.id)}
              type="primary"
            >
              Edit
            </Button>
            <Button
              className={styles.button_action}
              id={props.id}
              // onClick={() => remove(props.id)}
              type="primary"
              danger
            >
              Deactive
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

  return (
    <DndProvider manager={manager.current.dragDropManager}>
      <Table
        columns={columns}
        dataSource={data}
        components={components}
        onRow={(record, index) => ({
          index,
          moveRow,
        })}
      />
    </DndProvider>
  );
};

export default TableComponent;

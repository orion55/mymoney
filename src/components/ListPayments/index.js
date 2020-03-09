import React, { useState } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import { EditOutlined, CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import './style.css';
import { moneyFormat } from '../../libs/util';
import EditModal from '../EditModal';


function ListPayments() {
  const [show, setShow] = useState(false);
  const [record, setRecord] = useState(null);

  const columns = [
    {
      title: 'Дата',
      dataIndex: 'period',
      sorter: {
        compare: (a, b) => {
          const dateA = new Date(a.period);
          const dateB = new Date(b.period);
          return dateA - dateB;
        },
        multiple: 3,
      },
    },
    {
      title: 'Категория',
      dataIndex: 'category',
      sorter: {
        compare: (a, b) => {
          const nameA = a.category.toLowerCase();
          const nameB = b.category.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        },
        multiple: 2,
      },
    },
    {
      title: 'Сумма',
      dataIndex: 'sum',
      sorter: {
        compare: (a, b) => a.sum - b.sum,
        multiple: 1,
      },
      render: (val) => (
        <div className="list__sum">
          { moneyFormat(val) }
        </div>
      ),
    },
    {
      title: 'Получатель',
      dataIndex: 'recipient',
      sorter: {
        compare: (a, b) => {
          const nameA = a.recipient.toLowerCase();
          const nameB = b.recipient.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        },
        multiple: 4,
      },
    },
    {
      title: 'Действия',
      dataIndex: 'action',
      render: (text, curRecord) => (
        <div>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              setRecord(curRecord);
              setShow(true);
            }}
          />
          <Popconfirm title="Удалить запись?" onConfirm={() => console.log(record.key)} cancelText="Отмена" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
            <Button type="link" icon={<CloseOutlined />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      period: '06.03.2020',
      category: 'Транспорт',
      sum: -26,
      recipient: '',
    },
    {
      key: '2',
      period: '06.03.2020',
      category: 'Продукты, еда',
      sum: -260,
      recipient: 'Магнит',
    },
    {
      key: '3',
      period: '05.03.2020',
      category: 'Образование',
      sum: -87,
      recipient: 'Веб-сайт',
    },
    {
      key: '4',
      period: '05.03.2020',
      category: 'Здоровье',
      sum: -49.90,
      recipient: 'Аптека',
    },
    {
      key: '5',
      period: '04.03.2020',
      category: 'Зарплата',
      sum: 10000,
      recipient: 'Работа',
    },
  ];

  return (
    <>
      <EditModal show={show} onShow={() => setShow(false)} record={record} key={record == null ? 0 : record.key} />
      <Table columns={columns} dataSource={data} pagination={false} />
    </>
  );
}

export default ListPayments;

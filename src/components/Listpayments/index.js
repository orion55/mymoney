import React from 'react';
import { Table, Button, Popconfirm } from 'antd';
import { EditOutlined, CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import './style.css';

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
        { parseFloat(val).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1 ').replace('.', ',') }
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
    render: (text, record) => (
      <div>
        <Button type="link" icon={<EditOutlined />} onClick={() => console.log(record.key)} />
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

function Listpayments() {
  return (<Table columns={columns} dataSource={data} pagination={false} />);
}

export default Listpayments;

import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddModal from '../Modal/AddModal';

function AddPay() {
  const [show, setShow] = useState(false);
  return (
    <>
      <AddModal show={show} onShow={() => setShow(false)} />
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setShow(true)}>
        Добавить транзакцию
      </Button>
    </>
  );
}

export default AddPay;

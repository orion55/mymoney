import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Modalform from '../Modalform';

function Addpay() {
  const [show, setShow] = useState(false);
  return (
    <>
      <Modalform showModal={show} onShow={() => setShow(false)} />
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setShow(true)}>
        Добавить транзакцию
      </Button>
    </>
  );
}

export default Addpay;

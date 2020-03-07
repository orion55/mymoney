import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function Addpay() {
  return (
    <Button type="primary" icon={<PlusOutlined />} onClick={(e) => { console.log(e); }}>
      Добавить запись
    </Button>
  );
}

export default Addpay;

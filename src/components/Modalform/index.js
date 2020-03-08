import React from 'react';
import {
  Modal, Form, DatePicker, Input, InputNumber,
} from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import moment from 'moment';

function Modalform(props) {
  const { showModal, onShow } = props;
  const dateFormat = 'DD.MM.YYYY';

  return (
    <Modal
      title="Добавить транзакцию"
      centered
      visible={showModal}
      onOk={onShow}
      onCancel={onShow}
      cancelText="Отмена"
    >
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        layout="horizontal"
        size="middle"
        initialValues={{
          sum: 0,
          period: moment(),
        }}
      >
        <Form.Item
          name="period"
          label="Дата"
          rules={[{
            required: true,
            message: 'Дата транзакции обязательна!',
          }]}
        >
          <DatePicker format={dateFormat} locale={locale} />
        </Form.Item>
        <Form.Item
          name="сategory"
          label="Категория"
          rules={[{
            required: true,
            message: 'Категория обязательна!',
          }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="sum"
          label="Сумма"
          rules={[{
            required: true,
            message: 'Сумма обязательна!',
          }]}
        >
          <InputNumber precision={2} />
        </Form.Item>
        <Form.Item name="recipient" label="Получатель">
          <Input />
        </Form.Item>
      </Form>

    </Modal>
  );
}

export default Modalform;

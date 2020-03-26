import React from 'react';
import {
  Modal, Form, DatePicker, Input, InputNumber,
} from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';


function ModalForm(props) {
  const {
    showModal, onOk, onCancel, initialValues, title,
  } = props;
  const dateFormat = 'DD.MM.YYYY';
  const [form] = Form.useForm();
  const onFuncOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onOk(values);
      })
      .catch((info) => {
        console.log('Ошибка валидации:', info);
      });
  };
  // console.log(initialValues);
  return (
    <Modal
      title={title}
      centered
      visible={showModal}
      onOk={onFuncOk}
      onCancel={onCancel}
      cancelText="Отмена"
    >
      <Form
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        layout="horizontal"
        size="middle"
        initialValues={initialValues}
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
          name="category"
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

export default ModalForm;

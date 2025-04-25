import React from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
import { Services, StepTwoFormProps } from '../../types/form';
import { ItemTypes } from '../../types/ItemTypes';
import FormStepTwo from './FormStepTwo';

const ServicesForm: React.FC<StepTwoFormProps> = (props) => {
  return (
    <FormStepTwo<Services> title={ItemTypes.SERVICES} {...props}>
      <Form.Item<Services>
        label="Тип услуги"
        name="serviceType"
        rules={[{ required: true }]}
      >
        <Select
          options={['Ремонт', 'Уборка', 'Доставка'].map((type) => ({
            value: type,
            label: type,
          }))}
        />
      </Form.Item>

      <Form.Item<Services>
        label="Опыт работы"
        name="experience"
        rules={[{ required: true }]}
      >
        {' '}
        <InputNumber min={0} style={{ width: '100%' }} />{' '}
      </Form.Item>
      <Form.Item<Services>
        label="Стоимость"
        name="cost"
        rules={[{ required: true }]}
      >
        {' '}
        <InputNumber min={0} suffix="₽" style={{ width: '100%' }} />{' '}
      </Form.Item>
      <Form.Item<Services> label="График работы" name="workHours">
        {' '}
        <Input style={{ width: '100%' }} />{' '}
      </Form.Item>
    </FormStepTwo>
  );
};

export default ServicesForm;

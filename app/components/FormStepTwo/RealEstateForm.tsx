import React from 'react';
import { Form, InputNumber, Select } from 'antd';
import { RealEstate, StepTwoFormProps } from '../../types/form';
import { ItemTypes } from '../../types/ItemTypes';
import FormStepTwo from './FormStepTwo';

const RealEstateForm: React.FC<StepTwoFormProps> = (props) => {
  return (
    <FormStepTwo<RealEstate> title={ItemTypes.REAL_ESTATE} {...props}>
      <Form.Item<RealEstate>
        label="Тип недвижимости"
        name="propertyType"
        rules={[{ required: true }]}
      >
        <Select
          options={[
            { value: 'Квартира', label: 'Квартира' },
            { value: 'Дом', label: 'Дом' },
            { value: 'Коттедж', label: 'Коттедж' },
          ]}
        />
      </Form.Item>

      <Form.Item<RealEstate>
        label="Площадь"
        name="area"
        rules={[{ required: true }]}
      >
        {' '}
        <InputNumber suffix="кв. м" style={{ width: '100%' }} />{' '}
      </Form.Item>
      <Form.Item<RealEstate>
        label="Количество комнат"
        name="rooms"
        rules={[{ required: true }]}
      >
        {' '}
        <InputNumber style={{ width: '100%' }} />{' '}
      </Form.Item>
      <Form.Item<RealEstate>
        label="Цена"
        name="price"
        rules={[{ required: true }]}
      >
        {' '}
        <InputNumber suffix="₽" style={{ width: '100%' }} />{' '}
      </Form.Item>
    </FormStepTwo>
  );
};

export default RealEstateForm;

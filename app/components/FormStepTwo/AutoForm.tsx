import React from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
import { Auto, StepTwoFormProps } from '../../types/form';
import { ItemTypes } from '../../types/ItemTypes';
import FormStepTwo from './FormStepTwo';

const AutoBrands = [
  ...new Set([
    'Toyota',
    'Honda',
    'Hyundai',
    'Kia',
    'Nissan',
    'Ford',
    'Chevrolet',
    'Mercedes-Benz',
    'BMW',
    'Audi',
    'Renault',
    'Peugeot',
    'Citroën',
    'Skoda',
    'Fiat',
    'Jeep',
    'Subaru',
    'Mazda',
    'Suzuki',
    'Mitsubishi',
    'Volvo',
    'Land Rover',
    'Porsche',
    'Lada',
    'GAZ',
    'UAZ',
    'KAMAZ',
    'Volkswagen',
    'Haval',
    'Chery',
    'Geely',
  ]),
].sort();

const AutoForm: React.FC<StepTwoFormProps> = (props) => {
  return (
    <FormStepTwo<Auto> title={ItemTypes.AUTO} {...props}>
      <Form.Item<Auto>
        label={'Марка'}
        name="brand"
        rules={[{ required: true, message: 'Пожалуйста, выберите марку' }]}
      >
        <Select
          options={AutoBrands.map((brand) => ({ value: brand, label: brand }))}
        />
      </Form.Item>

      <Form.Item<Auto> label="Модель" name="model" rules={[{ required: true }]}>
        {' '}
        <Input />{' '}
      </Form.Item>
      <Form.Item<Auto>
        label="Год выпуска"
        name="year"
        rules={[{ required: true }]}
      >
        {' '}
        <InputNumber
          min={1900}
          max={new Date().getFullYear()}
          suffix="г."
          style={{ width: '100%' }}
        />{' '}
      </Form.Item>
      <Form.Item<Auto>
        label="Пробег"
        name="mileage"
        rules={[{ required: true }]}
      >
        {' '}
        <InputNumber suffix="км." style={{ width: '100%' }} />{' '}
      </Form.Item>
    </FormStepTwo>
  );
};

export default AutoForm;

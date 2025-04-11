import {
  Button,
  Card,
  Flex,
  Form,
  FormProps,
  InputNumber,
  Row,
  Select,
} from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useEffect } from 'react';
import { ItemTypes } from '../../../server/ItemTypes';

type FieldType = {};

const AutoBrands = [
  'Toyota',
  'Volkswagen',
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
  'Renault',
  'Hyundai',
  'Kia',
  'Volkswagen',
  'Toyota',
  'Nissan',
  'Skoda',
  'BMW',
  'Mercedes-Benz',
  'Audi',
  'Haval',
  'Chery',
  'Geely',
];

interface RealEstateFormProps {
  onPrevious: () => void;
  onSubmit: (data: any) => void;
  initialValues?: Record<string, any>;
}

const AutoForm: React.FC<RealEstateFormProps> = ({
  onPrevious,
  onSubmit,
  initialValues,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [form, initialValues]);

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log(values);
    onSubmit(values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <Flex
      id="real-estate-form"
      className="container"
      vertical
      align="center"
      justify="center"
    >
      <Title level={3}>{ItemTypes.AUTO}</Title>
      <Card>
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelAlign="left"
        >
          <Form.Item<FieldType>
            label={'Марка'}
            name="brand"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, выберите марку',
              },
            ]}
          >
            <Select
              style={{ width: '100%' }}
              onChange={handleChange}
              options={
                AutoBrands.sort().map((brand) => ({
                          value: `${brand}`,
                          label: `${brand}`,
                }))}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Модель"
            name="model"
            rules={[
              { required: true, message: 'Пожалуйста, введите модель!' },
            ]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Год выпуска"
            name="numberRooms"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите количество комнат!',
              },
            ]}
          >
            <InputNumber style={{ width: '100%' }} suffix="кв. м" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Цена"
            name="price"
            rules={[{ required: true, message: 'Пожалуйста, введите цену!' }]}
          >
            <InputNumber style={{ width: '100%' }} suffix="₽" />
          </Form.Item>

          <Row justify={'space-between'}>
            <Form.Item>
              <Button
                size="large"
                type="default"
                onClick={onPrevious}
                style={{ marginBlock: '30px' }}
              >
                Previous
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                style={{ marginBlock: '30px' }}
              >
                Submit
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Card>
    </Flex>
  );
};

export default AutoForm;

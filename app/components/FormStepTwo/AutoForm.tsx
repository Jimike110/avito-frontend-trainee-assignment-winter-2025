import {
  Button,
  Card,
  Flex,
  Form,
  FormProps,
  Input,
  InputNumber,
  Row,
  Select,
} from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useEffect } from 'react';
import { ItemTypes } from '../../../server/ItemTypes';
import { Auto, StepTwoFormProps } from '../../types/form';

const AutoBrands = [
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
  'Renault',
  'Hyundai',
  'Volkswagen',
  'Nissan',
  'BMW',
  'Mercedes-Benz',
  'Audi',
  'Haval',
  'Chery',
  'Geely',
];

const AutoForm: React.FC<StepTwoFormProps> = ({
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

  const onFinish: FormProps<Auto>['onFinish'] = (values) => {
    onSubmit(values);
  };

  const onFinishFailed: FormProps<Auto>['onFinishFailed'] = (errorInfo) => {
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
      <Card variant="borderless">
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
          <Form.Item<Auto>
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
              options={[...new Set(AutoBrands)].sort().map((brand) => ({
                value: `${brand}`,
                label: `${brand}`,
              }))}
            />
          </Form.Item>

          <Form.Item<Auto>
            label="Модель"
            name="model"
            rules={[{ required: true, message: 'Пожалуйста, введите модель!' }]}
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item<Auto>
            label="Год выпуска"
            name="year"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите год выпуска!',
              },
            ]}
          >
            <InputNumber
              min={1900}
              max={new Date().getFullYear()}
              style={{ width: '100%' }}
              suffix="г."
            />
          </Form.Item>

          <Form.Item<Auto>
            label="Пробег"
            name="mileage"
            rules={[{ required: true, message: 'Пожалуйста, введите пробег!' }]}
          >
            <InputNumber style={{ width: '100%' }} suffix="км." />
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

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
import { RealEstate, StepTwoFormProps } from '../../types/form';

const RealEstateTypes = {
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  COTTAGE: 'Коттедж',
};

const RealEstateForm: React.FC<StepTwoFormProps> = ({
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

  const onFinish: FormProps<RealEstate>['onFinish'] = (values) => {
    console.log(values);
    onSubmit(values);
  };

  const onFinishFailed: FormProps<RealEstate>['onFinishFailed'] = (
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
      <Title level={3}>{ItemTypes.REAL_ESTATE}</Title>
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
          <Form.Item<RealEstate>
            label={'Тип недвижимости'}
            name="type"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, выберите тип недвижимости!',
              },
            ]}
          >
            <Select
              style={{ width: '100%' }}
              onChange={handleChange}
              options={[
                {
                  value: `${RealEstateTypes.FLAT}`,
                  label: `${RealEstateTypes.FLAT}`,
                },
                {
                  value: `${RealEstateTypes.HOUSE}`,
                  label: `${RealEstateTypes.HOUSE}`,
                },
                {
                  value: `${RealEstateTypes.COTTAGE}`,
                  label: `${RealEstateTypes.COTTAGE}`,
                },
              ]}
            />
          </Form.Item>

          <Form.Item<RealEstate>
            label="Площадь"
            name="area"
            rules={[
              { required: true, message: 'Пожалуйста, введите площадь!' },
            ]}
          >
            <InputNumber suffix="кв. м" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item<RealEstate>
            label="Количество комнат"
            name="roomNumber"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите количество комнат!',
              },
            ]}
          >
            <InputNumber style={{ width: '100%' }} suffix="кв. м" />
          </Form.Item>

          <Form.Item<RealEstate>
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

export default RealEstateForm;

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
import { Services, StepTwoFormProps } from '../../types/form';

const ServicesTypes = {
  REPAIR: 'Ремонт',
  CLEANING: 'Уборка',
  DELIVERY: 'Доставка',
};

const ServicesForm: React.FC<StepTwoFormProps> = ({
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

  const onFinish: FormProps<Services>['onFinish'] = (values) => {
    onSubmit(values);
  };

  const onFinishFailed: FormProps<Services>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <Flex
      id="services-form"
      className="container"
      vertical
      align="center"
      justify="center"
    >
      <Title level={3}>{ItemTypes.SERVICES}</Title>
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
          <Form.Item<Services>
            label={'Тип услуги'}
            name="type"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, выберите тип услуги!',
              },
            ]}
          >
            <Select
              style={{ width: '100%' }}
              onChange={handleChange}
              options={[
                {
                  value: `${ServicesTypes.REPAIR}`,
                  label: `${ServicesTypes.REPAIR}`,
                },
                {
                  value: `${ServicesTypes.CLEANING}`,
                  label: `${ServicesTypes.CLEANING}`,
                },
                {
                  value: `${ServicesTypes.DELIVERY}`,
                  label: `${ServicesTypes.DELIVERY}`,
                },
              ]}
            />
          </Form.Item>

          <Form.Item<Services>
            label="Опыт работы"
            name="experience"
            rules={[
              { required: true, message: 'Пожалуйста, введите опыт работы!' },
            ]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item<Services>
            label="Стоимость"
            name="cost"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите стоимость!',
              },
            ]}
          >
            <InputNumber min={0} style={{ width: '100%' }} suffix="₽" />
          </Form.Item>

          <Form.Item<Services>
            label="График работы"
            name="workHours"
            rules={[
              {
                required: false,
                message: 'Пожалуйста, введите график работы!',
              },
            ]}
          >
            <Input style={{ width: '100%' }} />
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

export default ServicesForm;

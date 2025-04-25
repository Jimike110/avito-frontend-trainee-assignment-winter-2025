import { Button, Card, Flex, Form, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useEffect } from 'react';
import { StepTwoFormProps } from '../../types/form';

interface FormWrapperProps<T> extends StepTwoFormProps {
  title: string;
  initialValues?: Record<string, any>;
  children: React.ReactNode;
}

const FormStepTwo = <T,>({
  title,
  onPrevious,
  onSubmit,
  initialValues,
  children,
}: FormWrapperProps<T>) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [form, initialValues]);


  const onPreviousClick = () => {
    const values = form.getFieldsValue(true);
    onPrevious(values);
  }
  const onFinish = (values: any) => onSubmit(values);
  const onFinishFailed = (errorInfo: any) => console.log('Failed:', errorInfo);

  return (
    <Flex vertical align="center" justify="center">
      <Title level={2} style={{ marginBottom: '2rem', textAlign: 'center' }}>
        {title}
      </Title>

      <Card
        variant="borderless"
        style={{
          width: '100%',
          maxWidth: 600,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {children}

          <Flex
            justify="space-between"
            style={{ marginTop: '2rem', gap: '1rem' }}
          >
            <Form.Item style={{ flex: 1 }}>
              <Button block size="large" onClick={onPreviousClick}>
                Previous
              </Button>
            </Form.Item>

            <Form.Item style={{ flex: 1 }}>
              <Button block size="large" type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Flex>
        </Form>
      </Card>
    </Flex>
  );
};

export default FormStepTwo;

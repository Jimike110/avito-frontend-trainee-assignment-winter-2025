import React, { useEffect } from 'react';
import type { FormProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Checkbox,
  Flex,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Title from 'antd/es/typography/Title';
import { ItemTypes } from '../../../server/ItemTypes';
import { useForm } from 'antd/es/form/Form';
import { FieldType } from '../../pages/Form';

interface FormStep1Props {
  onNext: (values: FieldType) => void;
  initialValues?: FieldType;
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const FormStepOne: React.FC<FormStep1Props> = ({ onNext, initialValues }) => {
  const [form] = useForm<FieldType>();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [form, initialValues]);

  const onFinish = (values: FieldType) => {
    onNext(values);
  };

  return (
    <div className="container">
      <Flex
        id="base-form"
        gap={14}
        className="container"
        vertical
        align="center"
        justify="center"
      >
        <Title level={3}>Форма размещения</Title>
        <Card variant='borderless'>
          <Form
            name="basic"
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            labelAlign="left"
          >
            <Form.Item<FieldType>
              label="Название"
              name="name"
              rules={[
                { required: true, message: 'Пожалуйста, введите название!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={'Описание'}
              name="description"
              rules={[
                { required: true, message: 'Пожалуйста, введите описание!' },
              ]}
            >
              <TextArea autoSize={{ minRows: 3 }} />
            </Form.Item>

            <Form.Item<FieldType>
              label="Локация"
              name="location"
              rules={[
                { required: true, message: 'Пожалуйста, введите локацию!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType> label={'Фото'} name="photo">
              <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture"
              >
                <Button type="primary" icon={<UploadOutlined />}>
                  Upload
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item<FieldType>
              label={'Категория'}
              name="category"
              rules={[
                { required: true, message: 'Пожалуйста, выберите категорию!' },
              ]}
            >
              <Select
                style={{ width: '100%' }}
                onChange={handleChange}
                options={[
                  {
                    value: `${ItemTypes.REAL_ESTATE}`,
                    label: `${ItemTypes.REAL_ESTATE}`,
                  },
                  { value: `${ItemTypes.AUTO}`, label: `${ItemTypes.AUTO}` },
                  {
                    value: `${ItemTypes.SERVICES}`,
                    label: `${ItemTypes.SERVICES}`,
                  },
                ]}
              />
            </Form.Item>

            <Form.Item label={null}>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                style={{ marginBlock: '30px' }}
              >
                Next
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Flex>
    </div>
  );
};

export default FormStepOne;

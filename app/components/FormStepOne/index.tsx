import React, { useEffect } from 'react';
import type { FormProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Form, Input, Select, Upload, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Title from 'antd/es/typography/Title';
import { ItemTypes } from '../../../server/ItemTypes.js';
import { useForm } from 'antd/es/form/Form';
import { BaseFormData } from '../../types/form';
import { API_BASE_URL } from '../../api/api.js';

interface FormStep1Props {
  onNext: (values: BaseFormData) => void;
  initialValues?: BaseFormData;
  setFormData: any;
}

const onFinishFailed: FormProps<BaseFormData>['onFinishFailed'] = (
  errorInfo
) => {
  console.log('Failed:', errorInfo);
};

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const FormStepOne: React.FC<FormStep1Props> = ({
  onNext,
  initialValues,
  setFormData
}) => {
  const [form] = useForm<BaseFormData>();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [form, initialValues]);

  const customRequest = async (options) => {
    const { file, onSuccess, onError } = options;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        onSuccess(data);
        message.success(`${file.name} file uploaded successfully`);
      } else {
        const errorData = await response.json();
        onError(new Error(errorData?.error || `Upload failed with status ${response.status}`));
        message.error(`${file.name} file upload failed: ${errorData?.error || response.statusText}`);
      }
    } catch (error) {
      onError(error);
      message.error(`${file.name} file upload failed: ${error.message}`);
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = (values: BaseFormData) => {
    console.log('Form values on finish:', values);
    onNext(values);
  };

  return (
    <Flex
      id="base-form"
      className="container"
      vertical
      align="center"
      justify="center"
    >
      <Title level={3}>Форма размещения</Title>
      <Card variant="borderless">
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 900 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelAlign="left"
        >
          <Form.Item<BaseFormData>
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

          <Form.Item<BaseFormData>
            label="Локация"
            name="location"
            rules={[
              { required: true, message: 'Пожалуйста, введите локацию!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<BaseFormData>
            label={'Фото'}
            name="picture"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              name="picture"
              listType="picture"
              // defaultFileList={initialValues?.picture?.fileList}
              customRequest={customRequest}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item<BaseFormData>
            label={'Категория'}
            name="type"
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
  );
};

export default FormStepOne;
import React, { useEffect } from 'react';
import type { FormProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Form, Input, Select, Upload, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Title from 'antd/es/typography/Title';
import { ItemTypes } from '../../types/ItemTypes.js';
import { useForm } from 'antd/es/form/Form';
import { BaseFormData } from '../../types/form';
import { API_BASE_URL } from '../../api/api.js';
import type { UploadRequestOption } from 'rc-upload/lib/interface';

interface FormStep1Props {
  onNext: (values: BaseFormData) => void;
  initialValues?: BaseFormData;
  setFormData: React.Dispatch<React.SetStateAction<BaseFormData>>;
  editing: boolean;
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
  editing,
}) => {
  const [form] = useForm<BaseFormData>();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [form, initialValues]);

  const customRequest = async (options: UploadRequestOption) => {
    const { file, onSuccess, onError, headers, withCredentials } = options;
    const formData = new FormData();
    formData.append('file', file as File);

    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
        headers,
        credentials: withCredentials ? 'include' : undefined,
      });

      if (response.ok) {
        const data = await response.json();
        if (onSuccess) {
          onSuccess(data);
          message.success(`${(file as File)?.name} file uploaded successfully`); // Safe access to name
        }
      } else {
        const errorData = await response.json();
        if (onError) {
          onError(
            new Error(
              errorData?.error || `Upload failed with status ${response.status}`
            ),
            errorData
          );
          message.error(
            `${(file as File)?.name} file upload failed: ${errorData?.error || response.statusText}` // Safe access to name
          );
        }
      }
    } catch (error: any) {
      if (onError) {
        onError(error);
        message.error(
          `${(file as File)?.name} file upload failed: ${error.message}`
        );
      }
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = (values: BaseFormData) => {
    onNext(values);
  };

  return (
    <Flex id="base-form" vertical align="center" justify="center">
      <Title level={2} style={{ marginBottom: '2rem', textAlign: 'center' }}>
        {editing ? 'Редактировать объявление' : 'Форма размещения'}
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
          name="basic"
          form={form}
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
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
            label="Описание"
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
            label="Фото"
            name="picture"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              name="picture"
              listType="picture"
              customRequest={customRequest}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item<BaseFormData>
            label="Категория"
            name="type"
            rules={[
              { required: true, message: 'Пожалуйста, выберите категорию!' },
            ]}
          >
            <Select
              style={{ width: '100%' }}
              onChange={handleChange}
              options={[
                { value: ItemTypes.REAL_ESTATE, label: ItemTypes.REAL_ESTATE },
                { value: ItemTypes.AUTO, label: ItemTypes.AUTO },
                { value: ItemTypes.SERVICES, label: ItemTypes.SERVICES },
              ]}
            />
          </Form.Item>

          <Form.Item label={null}>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              block
              style={{ marginTop: '20px' }}
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

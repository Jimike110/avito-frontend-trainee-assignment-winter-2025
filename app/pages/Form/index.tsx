import React, { useEffect, useState } from 'react';
import FormStepOne from '../../components/FormStepOne';
import RealEstateForm from '../../components/FormStepTwo/RealEstateForm';
import { ItemTypes } from '../../types/ItemTypes.js';
import AutoForm from '../../components/FormStepTwo/AutoForm';
import ServicesForm from '../../components/FormStepTwo/ServicesForm';
import { BaseFormData } from '../../types/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAdvert, updateAdvertById } from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';

const MultiStepForm = ({ data, editing = false }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<BaseFormData>(
    () =>
      data || JSON.parse(localStorage.getItem('multiStepFormData') || '{}')
  );
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: editing
        ? 'Advert updated successfully!'
        : 'Advert created successfully!',
    });
  };

  const { mutate } = useMutation({
    mutationFn: (payload) => {
      return editing
        ? updateAdvertById(data.id, payload)
        : createAdvert(payload);
    },
    onSuccess: () => {
      localStorage.removeItem('multiStepFormData');
      success();

      setTimeout(() => {
        navigate('/list');
      }, 1500);

      if (!editing) {
        setCurrentStep(1);
        setFormData({
          name: '',
          description: '',
          location: '',
          type: undefined,
          picture: undefined,
        });
      }
    },
    onError: (err) => {
      console.error('Error creating advert:', err);
      alert('Failed to submit form.');
    },
  });

  useEffect(() => {
    if (!editing) {
      localStorage.setItem('multiStepFormData', JSON.stringify(formData));
    }
  }, [formData, editing]);

  const handleNextStep = (values: BaseFormData) => {
    setFormData((prev) => ({ ...prev, ...values }));
    setCurrentStep(2);
  };

  const handlePreviousStep = (values) => {
    setFormData((prev) => ({ ...prev, ...values }));
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (stepData: any) => {
    const updated = { ...formData, ...stepData };
    setFormData(updated);
    mutate(updated);
  };

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <title>
              {editing ? 'Редактировать объявление' : 'Форма размещения'}
            </title>

            <FormStepOne
              onNext={handleNextStep}
              initialValues={formData}
              setFormData={setFormData}
              editing={editing}
            />
          </>
        );
      case 2:
        if (formData.type === ItemTypes.REAL_ESTATE) {
          return (
            <>
              <title>{ItemTypes.REAL_ESTATE}</title>
              <RealEstateForm
                onPrevious={handlePreviousStep}
                onSubmit={handleSubmit}
                initialValues={formData}
              />
            </>
          );
        } else if (formData.type === ItemTypes.AUTO) {
          return (
            <>
              <title>{ItemTypes.AUTO}</title>
              <AutoForm
                onPrevious={handlePreviousStep}
                onSubmit={handleSubmit}
                initialValues={formData}
              />
            </>
          );
        } else if (formData.type === ItemTypes.SERVICES) {
          return (
            <>
              <title>{ItemTypes.SERVICES}</title>
              <ServicesForm
                onPrevious={handlePreviousStep}
                onSubmit={handleSubmit}
                initialValues={formData}
              />
            </>
          );
        } else {
          return <div>Please select an option in the first step.</div>;
        }
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box',
        padding: '16px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '900px',
          display: 'flex',
          justifyContent: 'flex-end',
          flexShrink: 0,
        }}
      >
        {contextHolder}

        <Link to="/list">
          <Button size="large" type="primary">
            Список размещений
          </Button>
        </Link>
      </div>

      <div
        style={{
          flex: 1,
          width: '100%',
          maxWidth: '900px',
          overflowY: 'auto',
          marginTop: '16px',
        }}
      >
        {renderForm()}
      </div>
    </div>
  );
};

export default MultiStepForm;

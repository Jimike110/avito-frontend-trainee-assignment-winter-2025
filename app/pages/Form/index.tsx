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
import { Button } from 'antd';

const MultiStepForm = ({ data, editing = false }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<BaseFormData>(
    () =>
      // JSON.parse(
      //   localStorage.getItem('advertData') ||
      //     localStorage.getItem('multiStepFormData') ||
      //     '{}'
      // )
      data || JSON.parse(localStorage.getItem('multiStepFormData') || '{}')
  );
  console.log(formData);

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (payload) => {
      return editing
        ? updateAdvertById(data.id, payload)
        : createAdvert(payload);
    },
    onSuccess: () => {
      console.log('Advert created successfully!');
      localStorage.removeItem('multiStepFormData');
      alert('Form submitted!');
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
      navigate('/list');
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

  const handlePreviousStep = () => {
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
    <div>
      <Link to={'/list'}>
        <Button
          size="large"
          style={{ position: 'absolute', right: 20, top: 30 }}
          type="primary"
        >
          Список размещений
        </Button>
      </Link>
      {renderForm()}
    </div>
  );
};

export default MultiStepForm;

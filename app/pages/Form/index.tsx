import React, { useEffect, useState } from 'react';
import FormStepOne from '../../components/FormStepOne';
import RealEstateForm from '../../components/FormStepTwo/RealEstateForm';
import { ItemTypes } from '../../../server/ItemTypes.js';
import AutoForm from '../../components/FormStepTwo/AutoForm';
import ServicesForm from '../../components/FormStepTwo/ServicesForm';
import { BaseFormData } from '../../types/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAdvert } from '../../api/api';
import { useNavigate } from 'react-router-dom';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<BaseFormData>(() => {
    return JSON.parse(localStorage.getItem('multiStepFormData') || '{}');
  });
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: createAdvert,
    onSuccess: () => {
      console.log('Advert created successfully!');
      localStorage.removeItem('multiStepFormData');
      alert('Form submitted!');
      setCurrentStep(1);
      setFormData({});
      navigate('/list');
    },
    onError: (err) => {
      console.error('Error creating advert:', err);
      alert('Failed to submit form.');
    },
  });

  useEffect(() => {
    localStorage.setItem('multiStepFormData', JSON.stringify(formData));
  }, [formData]);

  const handleNextStep = (values: BaseFormData) => {
    console.log('handleNextStep values:', values);
    setFormData({ ...values });
    setCurrentStep(2);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (stepData: any) => {
    setFormData({ ...formData, ...stepData });
    console.log('Final Form Data: ', { ...formData, stepData });
    mutate({ ...formData, ...stepData });
  };

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormStepOne
            onNext={handleNextStep}
            initialValues={formData}
            setFormData={setFormData}
          />
        );
      case 2:
        if (formData.type === ItemTypes.REAL_ESTATE) {
          return (
            <RealEstateForm
              onPrevious={handlePreviousStep}
              onSubmit={handleSubmit}
              initialValues={formData}
            />
          );
        } else if (formData.type === ItemTypes.AUTO) {
          return (
            <AutoForm
              onPrevious={handlePreviousStep}
              onSubmit={handleSubmit}
              initialValues={formData}
            />
          );
        } else if (formData.type === ItemTypes.SERVICES) {
          return (
            <ServicesForm
              onPrevious={handlePreviousStep}
              onSubmit={handleSubmit}
              initialValues={formData}
            />
          );
        } else {
          return <div>Please select an option in the first step.</div>;
        }
      default:
        return null;
    }
  };

  return <div>{renderForm()}</div>;
};

export default MultiStepForm;

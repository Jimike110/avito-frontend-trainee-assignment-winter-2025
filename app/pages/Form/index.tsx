import React, { useEffect, useState } from 'react';
import FormStepOne from '../../components/FormStepOne';
import RealEstateForm from '../../components/FormStepTwo/RealEstateForm';
import { ItemTypes } from '../../../server/ItemTypes';
import AutoForm from '../../components/FormStepTwo/AutoForm';

export interface FieldType {
  category?: string;
  type?: string;
  area?: number;
  numberRooms?: number;
  price?: number;
  name?: string;
  description?: string;
  location?: string;
  photo?: string;
}

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FieldType>(() => {
    return JSON.parse(localStorage.getItem('multiStepFormData') || '');
  });
  

  useEffect(() => {
    localStorage.setItem('multiStepFormData', JSON.stringify(formData));
  }, [formData]);

  const handleNextStep = (values: FieldType) => {
    console.log('handleNextStep values:', values);
    setFormData({ ...formData, ...values });
    setCurrentStep(2);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (stepData: any) => {
    setFormData({ ...formData, ...stepData });
    console.log('Final Form Data: ', { ...formData, ...stepData });
    // localStorage.removeItem('multiStepFormData');
    alert('Form submitted!');
    setCurrentStep(1);
    // setFormData({});
  };

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return <FormStepOne onNext={handleNextStep} initialValues={formData} />;
      case 2:
        if (formData.category === ItemTypes.REAL_ESTATE) {
          return (
            <RealEstateForm
              onPrevious={handlePreviousStep}
              onSubmit={handleSubmit}
              initialValues={formData}
            />
          );
        } else if (formData.category === ItemTypes.AUTO) {
          return (
            <AutoForm
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

  return <div style={{ paddingInline: '20px' }}>{renderForm()}</div>;
};

export default MultiStepForm;

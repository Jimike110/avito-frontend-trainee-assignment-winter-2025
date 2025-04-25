import React from 'react';
import MultiStepForm from '../Form';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const EditAdvert = () => {
  const location = useLocation();
  const advertToEdit = location.state?.data;

  return <MultiStepForm data={advertToEdit} editing={true} />;
};

export default EditAdvert;

import { AdvertItem } from '../../types/form';
import MultiStepForm from '../Form';
import { useLocation } from 'react-router-dom';

const EditAdvert = () => {
  const location = useLocation();
  const advertToEdit: AdvertItem = location.state?.data;

  return <MultiStepForm data={advertToEdit} editing={true} />;
};

export default EditAdvert;

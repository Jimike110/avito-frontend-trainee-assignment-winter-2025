import React from 'react';
import { useLocation } from 'react-router-dom';

const AdvertItem = () => {
  const pathSegments = useLocation().pathname.split('/');
  const id = pathSegments[pathSegments.length - 1];
  console.log(id);
  return <div>AdvertItem with ID: {id}</div>;
};

export default AdvertItem;
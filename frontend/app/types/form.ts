import { ItemTypes } from './ItemTypes';
import { Username } from './users';

export interface BaseFormData {
  id?: string;
  name: string;
  description: string;
  location: string;
  picture: PictureItem[] | undefined;
  type: 'Недвижимость' | 'Авто' | 'Услуги' | undefined;
}

export interface RealEstate {
  propertyType: 'Квартира' | 'Дом' | 'Коттедж' | 'Дача' | 'Этаж';
  area: number;
  rooms: number;
  price: number;
}

export interface Auto {
  brand: string;
  model: string;
  year: number;
  mileage?: number;
}

export interface Services {
  serviceType: 'Ремонт' | 'Уборка' | 'Доставка';
  experience: number;
  cost: number;
  workHours?: string;
}

export interface RealEstateAdvert extends BaseFormData, RealEstate, Username {
  type: 'Недвижимость';
}

export interface AutoAdvert extends BaseFormData, Auto, Username {
  type: 'Авто';
}

export interface ServicesAdvert extends BaseFormData, Services, Username {
  type: 'Услуги';
}

export type AdvertItem = RealEstateAdvert | AutoAdvert | ServicesAdvert;

export const typeColors = {
  [ItemTypes.REAL_ESTATE]: 'red',
  [ItemTypes.AUTO]: 'blue',
  [ItemTypes.SERVICES]: 'green',
};

export interface StepTwoFormProps {
  onPrevious: (data: AdvertItem) => void;
  onSubmit: (data: AdvertItem) => void;
  initialValues?: BaseFormData;
}

interface PictureItem {
  response?: {
    url?: string;
  };
}

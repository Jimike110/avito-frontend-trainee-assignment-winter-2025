import { ItemTypes } from './ItemTypes';

export interface BaseFormData {
  id?: number;
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

export interface RealEstateAdvert extends BaseFormData, RealEstate {
  type: 'Недвижимость';
}

export interface AutoAdvert extends BaseFormData, Auto {
  type: 'Авто';
}

export interface ServicesAdvert extends BaseFormData, Services {
  type: 'Услуги';
}

export type AdvertItem = RealEstateAdvert | AutoAdvert | ServicesAdvert;

export const typeColors = {
  [ItemTypes.REAL_ESTATE]: 'red',
  [ItemTypes.AUTO]: 'blue',
  [ItemTypes.SERVICES]: 'green',
};

export interface StepTwoFormProps {
  onPrevious: (data: any) => void;
  onSubmit: (data: any) => void;
  initialValues?: Record<string, any>;
}

interface PictureItem {
  response?: {
    url?: string;
  };
}

import { AutoAdvert, RealEstateAdvert, ServicesAdvert } from './form';

export const ItemTypes = {
  REAL_ESTATE: 'Недвижимость' as RealEstateAdvert['type'],
  AUTO: 'Авто' as AutoAdvert['type'],
  SERVICES: 'Услуги' as ServicesAdvert['type'],
};

export const PropertyTypes = ['Квартира', 'Дом', 'Коттедж', 'Дача', 'Этаж'];

export const ServicesTypes = ['Ремонт', 'Уборка', 'Доставка'];

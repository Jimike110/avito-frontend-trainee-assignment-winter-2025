import { AutoAdvert, RealEstateAdvert, ServicesAdvert } from "../app/types/form";

export const ItemTypes = {
  REAL_ESTATE: 'Недвижимость' as RealEstateAdvert['type'],
  AUTO: 'Авто' as AutoAdvert['type'],          
  SERVICES: 'Услуги' as ServicesAdvert['type'],
}
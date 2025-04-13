export interface BaseFormData {
  name: string;
  description: string;
  location: string;
  picture: [{}];
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
export interface StepTwoFormProps {
  onPrevious: (data: any) => void;
  onSubmit: (data: any) => void;
  initialValues?: Record<string, any>;
}

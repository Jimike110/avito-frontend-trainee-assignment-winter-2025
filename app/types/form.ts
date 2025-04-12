export interface BaseFormData {
  name: string;
  description: string;
  location: string;
  picture?: string | HTMLImageElement;
  category: 'Недвижимость' | 'Авто' | 'Услуги';
}

export interface RealEstate {
  type: 'Квартира' | 'Дом' | 'Коттедж' | 'Дача' | 'Этаж';
  area: number;
  roomNumber: number;
  price: number;
}

export interface Auto {
  brand: string;
  model: string;
  year: number;
  mileage?: number;
}

export interface Services {
  type: 'Ремонт' | 'Уборка' | 'Доставка';
  experience: number;
  cost: number;
  workHours?: string;
}
export interface StepTwoFormProps {
  onPrevious: () => void;
  onSubmit: (data: any) => void;
  initialValues?: Record<string, any>;
}
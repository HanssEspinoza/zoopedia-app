export interface Animal {
  id: string;
  name: string;
  category: Category;
  region: string;
  conservation_status: string;
  scientific_name: string;
  description: string;
  alt_img?: string;
}

export enum Category {
  Mammal = 'Mamífero',
  Bird = 'Pájaro',
}

// you can put your types here

export interface Country {
  id: number;
  code: string;
  name: string;
  emoji: string;
  continent?: Continent;
}

export interface Continent {
  id: number;
  name: string;
  countries?: Country[];
}

export interface NewCountryInput {
  code: string;
  name: string;
  emoji: string;
  continent?: { id: number };
}

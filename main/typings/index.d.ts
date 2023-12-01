export interface Director {
  id: number;
  name: string;
  born: Date;
  img?: string;
}

export interface Actor {
  id: number;
  name: string;
  born: Date;
  img?: string;
}

export interface Movie {
  name: string;
  director: Director;
  actors: Actor[];
  year: number;
}

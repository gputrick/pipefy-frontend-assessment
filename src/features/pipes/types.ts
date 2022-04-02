export type Organization = {
  pipes: Pipe[];
};

export type Pipe = {
  id: string;
  name: string;
  cards_count: number;
  color: string;
};

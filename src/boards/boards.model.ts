type BoardStatus = 'PUBLIC' | 'PRIVATE';

export interface Board {
  id: string;
  title: string;
  description: string;
  status: BoardStatus;
}

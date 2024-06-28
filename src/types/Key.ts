export type Key = {
  key?: string[];
  length?: number;
  '0'?: string | keyInitial;
  keyInitial: string;
}

type keyInitial = {}
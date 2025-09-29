export interface Pagination<T> {
  items: T[];
  total: number;
  size: number;
  from: number;
  has_next: boolean;
  has_prior: boolean;
}

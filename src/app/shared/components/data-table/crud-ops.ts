export interface CRUDOps<T> {
  create(item: T);
  update(item: T);
  delete(item: T);
}

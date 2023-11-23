export {}; // this file needs to be a module
declare global {
  interface Array<T> {
    firstOrDefault(predicate: (item: T) => boolean): T;
    orderBy(propertyExpression: (item: T) => any): T[];
    orderByDescending(propertyExpression: (item: T) => any): T[];
    orderByMany(propertyExpressions: [(item: T) => any]): T[];
    orderByManyDescending(propertyExpressions: [(item: T) => any]): T[];
    removeAt(index: number): T;
    removeOne(item: T | null): boolean;
    addRange(items: T[]): void;
    removeRange(items: T[]): void;
    contains(item: T | null): boolean;
    empty(): boolean;
  }
  interface String {
    isNullOrEmpty(this: string): boolean;
  }
}

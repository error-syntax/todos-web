type Nullable<Type> = {
  [key in keyof Type]: Type[key] | null;
}

export type {
  Nullable,
}
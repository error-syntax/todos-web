type Nullable<Type> = {
  [key in keyof Type]: Type[key] | null;
};

type AppendPrefix<Prefix extends string, Type> = {
  [Property in keyof Type as `${Prefix}${string & Property}`]: Type[Property];
};

export type { AppendPrefix, Nullable };

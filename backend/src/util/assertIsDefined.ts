
// basically this takes a value of any type (see the generic)
// and returns that it is not null using this V
export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (!val){
    throw Error("Exprected 'val' to be defined, but recieved " + val);
  }
}
declare module "bson" {
  // forzar que buffer acepte números
  interface SomeBufferType extends Array<number> {}
}

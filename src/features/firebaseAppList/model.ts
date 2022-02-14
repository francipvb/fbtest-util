import * as yup from "yup";

export const firebaseOptionsSchema = yup.object({
  apiKey: yup.string().default(undefined),
  appId: yup.string(),
  authDomain: yup.string(),
  databaseURL: yup.string(),
  measurementId: yup.string(),
  messagingSenderId: yup.string(),
  projectId: yup.string(),
  storageBucket: yup.string().defined(),
});
export const appFormSchema = yup.object({
  name: yup
    .string()
    .ensure()
    .min(3)
    .max(10)
    .required()
    .test({
      test: (value) => value !== "[DEFAULT]",
      message: "The default app name is not allowed.",
    }),
  description: yup.string().ensure(),
  options: yup
    .string()
    .required()
    .ensure()
    .test((value, context) => {
      try {
        const parsed = JSON.parse(value);
      } catch (err) {
        if (err instanceof SyntaxError) {
          return context.createError({
            message: "The ${path} field cannot be parsed as JSON.",
          });
        }
        throw err;
      }
      return true;
    }),
});
export const appPayloadSchema = appFormSchema.shape({
  options: firebaseOptionsSchema.defined(),
});
export interface AppPayload extends yup.InferType<typeof appPayloadSchema> {}
export interface App extends AppPayload {
  id?: number;
}
export interface AppFormPayload extends yup.InferType<typeof appFormSchema> {}

export type AppID = NonNullable<App["id"]>;

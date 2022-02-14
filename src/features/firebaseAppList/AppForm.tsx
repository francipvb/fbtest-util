import { ErrorMessage, Field, Form, Formik } from "formik";
import { useAppDispatch } from "../../app/hooks";
import { add } from "./firebaseAppSlize";
import {
  App,
  AppFormPayload,
  appFormSchema,
  AppPayload,
  appPayloadSchema,
} from "./model";

function EditAppFormComponent(props: { disable: boolean }) {
  return (
    <Form>
      <div>
        <label htmlFor="txtName">Name</label>
        <Field name="name" required id="txtName" />
        <ErrorMessage name="name" />
      </div>
      <div>
        <label htmlFor="txtDescription">Description</label>
        <Field name="description" id="txtDescription" />
        <ErrorMessage name="description" />
      </div>
      <div>
        \<label htmlFor="txtConfig">Firebase config</label>
        <Field name="options" component="textarea" required />
        <ErrorMessage name="options" />
      </div>
      <button type="submit">Save</button>
    </Form>
  );
}

function EditAppForm(props: {
  data: AppFormPayload;
  disabled?: boolean;
  onSave: (payload: AppPayload) => App["id"] | Promise<App["id"]>;
  onSaved?: (id: App["id"]) => void | Promise<void>;
}) {
  const submit = async (values: AppFormPayload) => {
    try {
      const parsedPayload = await appPayloadSchema.validate(values);
      const newId = await props.onSave(parsedPayload);
      if (props.onSaved) await props.onSaved(newId);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Formik
      initialValues={appFormSchema.cast(props.data)}
      validateOnMount={false}
      validationSchema={appFormSchema}
      onSubmit={submit}
    >
      <EditAppFormComponent disable={props.disabled ?? false} />
    </Formik>
  );
}

export default function AppFormRoute() {
  const dispatch = useAppDispatch();
  const save = async (payload: AppPayload): Promise<number | undefined> => {
    try {
      const result = await dispatch(add(payload));
      return (result.payload as App).id;
    } catch (err) {
      console.error(err);
    }
  };
  return <EditAppForm data={appFormSchema.getDefault()} onSave={save} />;
}

import { useForm } from "react-hook-form";

export default {
  title: "form/RHF",
  parameters: {
    // layout: "centered",
  },
};

const BaseForm = ({ register, handleSubmit }) => (
  <form onSubmit={handleSubmit((data) => console.log("data", data))} noValidate>
    <div>
      <input {...register("name")} />
    </div>
    <div>
      <input type="checkbox" {...register("check")} />
    </div>
  </form>
);

export const Default = () => {
  const formProps = useForm({
    defaultValues: {
      //   name: "abc",
    },
  });

  const watched = formProps.watch();
  console.log("watched", watched);

  return <BaseForm {...formProps} />;
};

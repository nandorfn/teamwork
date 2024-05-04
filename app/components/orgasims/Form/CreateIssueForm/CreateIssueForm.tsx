import { Input } from "@components/atoms";
import { InputLabel } from "@components/molecules";
import { SubmitHandler, useForm } from "react-hook-form";

const CreateIssueForm: React.FC = () => {
  const {
    control,
    handleSubmit,
  } = useForm()

  const onSubmit: SubmitHandler<any> = (data) => console.log(data)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputLabel 
        name="summary"
        label="Summary"
        required
        placeholder=""
        type="text"
        control={control}
      />

    </form>
  );
};

export default CreateIssueForm;
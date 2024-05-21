import { Input, InputSelect } from "@components/atoms";
import { InputLabel } from "@components/molecules";
import { SubmitHandler, useForm } from "react-hook-form";

const CreateIssueForm: React.FC = () => {
  const {
    control,
    handleSubmit,
  } = useForm();
  
  const issueTypeDropdown = [
    {
      label: "Epic",
      value: "Epic",
    },
    {
      label: "Task",
      value: "Task",
    },
    {
      label: "Story",
      value: "Story",
    },
    {
      label: "Bug",
      value: "Bug",
    }
  ]
  const statusDropdown = [
    {
      label: "Todo",
      value: "Todo",
    },
    {
      label: "In Progress",
      value: "In Progress",
    },
    {
      label: "Bug Fixing",
      value: "Bug Fixing",
    },
    {
      label: "Ready To SIT",
      value: "Ready To SIT",
    }
  ]

  const onSubmit: SubmitHandler<any> = (data) => console.log(data)
  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <InputLabel 
        name="summary"
        label="Summary"
        required
        placeholder=""
        type="text"
        control={control}
      />
      
      <label>Issue Type</label>
      <InputSelect
        name={"issueType"}
        control={control}
        required
        placeholder={""}
        className={" border-zinc-800 h-[42px]"}
        datas={issueTypeDropdown}
      />
      
      <label>Status</label>
      <InputSelect
        name={"issueType"}
        control={control}
        required
        placeholder={""}
        className={" border-zinc-800 h-[42px]"}
        datas={statusDropdown}
      />

    </form>
  );
};

export default CreateIssueForm;
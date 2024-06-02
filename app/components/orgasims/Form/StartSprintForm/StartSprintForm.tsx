import React, { useEffect, useMemo, useState } from "react";
import { DatePicker, InputLabel, SelectLabel, TextareaLabel } from "@components/molecules";
import { SubmitHandler, useForm } from "react-hook-form";
import { TStartSprint } from "@schemas/sprintSchemas";
import { TStartSprintForm } from "@organisms/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { api } from "@http";
import { usePathname } from "next/navigation";
const StartSprintForm = ({
  refForm,
  setDisabled,
  data
}: TStartSprintForm) => {
  console.log(data);
  const {
    control, watch, setValue, handleSubmit
  } = useForm<TStartSprint>({
    defaultValues: {
      name: data?.title,
      duration: "1",
      startDate: new Date(),
      endDate: new Date(),
      goal: ""
    }
  });

  const [endDate, setEndDate] = useState(new Date());

  const calculateEndDate = (startDate: string | Date, weekOptions: number) => {
    let currentDate = new Date(startDate);
    let daysToAdd = weekOptions * 5;
    let addedDays = 0;

    while (addedDays < daysToAdd) {
      currentDate.setDate(currentDate.getDate() + 1);

      if (currentDate.getDay() !== 6 && currentDate.getDay() !== 0) {
        addedDays++;
      }
    }

    return currentDate;
  };

  const startDate = useMemo(() => watch("startDate") ? new Date(watch("startDate")) : new Date(), [watch]);
  const duration = Number(watch("duration")) || 1;

  useEffect(() => {
    const newEndDate = calculateEndDate(startDate, Number(duration));
    if (newEndDate >= startDate) {
      setValue("endDate", newEndDate);
      setEndDate(newEndDate);
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [startDate, duration, setValue, watch, setDisabled]);

  const weeksOption = [
    { label: "1 Week", value: "1" },
    { label: "2 Week", value: "2" },
    { label: "3 Week", value: "3" },
    { label: "4 Week", value: "4" },
    { label: "Custom", value: "0" },
  ];
  
  const path = usePathname();
  const currentProjectId = path.split("/")[2]; 
  const queryClient = useQueryClient();
  
  const sprintMutation = useMutation({
    mutationFn: (formData: TStartSprint) => {
      return axios.put(`${api.sprints}/${currentProjectId}/${data?.id}`, formData);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["issues", `${currentProjectId}`]});
    }
  });
  
  const onSubmit: SubmitHandler<TStartSprint> = async (data: TStartSprint) => {
    const newData = {
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(endDate),
    };
    
    sprintMutation.mutate(newData);
  };
  
  return (
    <form ref={refForm} onSubmit={handleSubmit(onSubmit)}>
      <InputLabel
        label="Sprint Name"
        name="name"
        type="text"
        placeholder=""
        className="w-1/2"
        control={control}
        required
      />
      <SelectLabel
        control={control}
        name="duration"
        label="Duration"
        datas={weeksOption}
        className="w-1/2"
        defaultValue="1"
        required
      />
      <DatePicker
        disabled={false}
        label="Start Date"
        control={control}
        defaultValue={startDate}
        name="startDate"
        className="w-1/2"
      />
      <DatePicker
        label="End Date"
        defaultValue={endDate}
        control={control}
        disabled={watch("duration") !== "0"}
        name="endDate"
        className="w-1/2"
      />
      <TextareaLabel
        label="Sprint Goal"
        name="goal"
        placeholder=""
        control={control}
        required={false}
      />
    </form>
  );
};

export default StartSprintForm;

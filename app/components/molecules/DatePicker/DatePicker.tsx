"use client";

import * as React from "react";
import { format } from "date-fns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { cn } from "@func";
import { Button } from "@components/ui/button";
import { Calendar } from "@components/ui/calendar";
import { Icon } from "@components/atoms";
import { calendar } from "@assets/svg";
import { Controller } from "react-hook-form";
import { TDatePickerRange } from "@molecules/types";

const DatePicker = ({
  className,
  control,
  name,
  label,
  defaultValue,
  disabled
}: TDatePickerRange) => {
  return (
    <Controller
      control={control}
      name={name}
      disabled={disabled}
      defaultValue={defaultValue}
      render={({ field }) => (
        <div className="flex w-full flex-col">
          <label htmlFor={name}>
            {label}
          </label>
          <div className={cn("grid gap-2", className)}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  disabled={disabled}
                  id={name}
                  variant={"secondary"}
                  className={cn(
                    "w-full gap-2 justify-start text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <Icon
                    src={calendar}
                    alt="calendar"
                    width={20}
                    height={20}
                  />
                  {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

      )}
    />
  );
};

export default DatePicker;
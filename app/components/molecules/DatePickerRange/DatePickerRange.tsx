"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

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

const DatePickerRange = ({
  className,
  control,
  name,
  defaultValue,
}: TDatePickerRange) => {
  return (
    <Controller 
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <div className={cn("grid gap-2", className)}>
        <Popover>
          <PopoverTrigger asChild>
            
            <Button
              id="date"
              variant={"secondary"}
              className={cn(
                "w-fit gap-2 justify-start text-left font-normal",
                !field.value && "text-muted-foreground"
              )}
            >
              <Icon 
                src={calendar} 
                alt="calendar" 
                width={20} 
                height={20}
              />
              {field.value?.from ? (
                field.value.to ? (
                  <>
                    {format(field.value.from, "LLL dd, y")} -{" "}
                    {format(field.value.to, "LLL dd, y")}
                  </>
                ) : (
                  format(field.value.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              selected={field.value}
              onSelect={field.onChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      )}
    />
  );
};

export default DatePickerRange;
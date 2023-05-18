import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { FormWrapper, Header, SubmitButton } from "./DishForm.styled";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ErrorNotification from "../ErrorNotification/ErrorNotification";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

interface DishFormValues {
  name: string;
  preparation_time: string;
  type: string;
  no_of_slices?: number;
  diameter?: number;
  spiciness_scale?: number;
  slices_of_bread?: number;
}

const DishForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DishFormValues>();

  const [time, setTime] = useState<Dayjs | null>();
  const [dishType, setDishType] = useState("");
  const [open, setOpen] = useState(false);

  const onSubmit = (data: DishFormValues) => {
    let submitData: DishFormValues = { name: data.name, preparation_time: data.preparation_time, type: data.type };
    if (data.type === "pizza") {
      submitData.no_of_slices = data.no_of_slices;
      submitData.diameter = data.diameter;
    } else if (data.type === "soup") submitData.spiciness_scale = data.spiciness_scale;
    else if (data.type === "sandwich") submitData.slices_of_bread = data.slices_of_bread;
    fetch("https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitData),
    })
      .then((response) => response.json())
      .then((responseData) => {
        setOpen(true);
      })
      .catch((error) => {
        setOpen(false);
      });
  };

  const handleChangeDishType = (event: SelectChangeEvent) => {
    setDishType(event.target.value as string);
  };

  return (
    <>
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Header>
            Dish form <FastfoodIcon />
          </Header>
          <FormControl>
            <InputLabel>Name</InputLabel>
            <OutlinedInput
              label="Name"
              {...register("name", {
                required: "This field is required",
                minLength: { value: 3, message: "Ensure this value has at least 3 characters" },
              })}
              error={!!errors.name}
            />
          </FormControl>
          {errors.name?.type === "required" && <ErrorNotification message="This field is required" />}
          {errors?.name?.type === "minLength" && <ErrorNotification message="Ensure this value has at least 3 characters" />}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimeField
              {...register("preparation_time", {
                required: "This field is required",
                pattern: /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/,
              })}
              label="Preparation time"
              value={time}
              onChange={(newValue) => setTime(newValue)}
              format="HH:mm:ss"
            />
          </LocalizationProvider>
          {errors.preparation_time?.type === "required" && <ErrorNotification message="This field is required" />}
          {errors.preparation_time?.type === "pattern" && <ErrorNotification message="Time data 'Invalid Date' does not match format '%H:%M:%S'" />}
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              {...register("type", {
                required: "This field is required",
              })}
              value={dishType}
              label="Type"
              onChange={handleChangeDishType}
            >
              <MenuItem value="pizza">Pizza</MenuItem>
              <MenuItem value="soup">Soup</MenuItem>
              <MenuItem value="sandwich">Sandwich</MenuItem>
            </Select>
          </FormControl>

          {errors.type?.type === "required" && dishType === "" && <ErrorNotification message="This field is required" />}

          {dishType === "pizza" ? (
            <>
              <TextField
                label="Number of slices"
                type="number"
                inputProps={{
                  min: 1,
                }}
                {...register("no_of_slices", { required: true, min: 1 })}
              />
              {errors.no_of_slices?.type === "required" && <ErrorNotification message="This field is required" />}
              {errors.no_of_slices?.type === "min" && <ErrorNotification message="Ensure this value is greater than 0" />}
              <TextField
                label="Diameter"
                type="number"
                inputProps={{
                  step: "0.1",
                  min: 0.1,
                }}
                {...register("diameter", { required: true, min: 0.1 })}
              />
              {errors.diameter?.type === "required" && <ErrorNotification message="This field is required" />}
              {errors.diameter?.type === "min" && <ErrorNotification message="Ensure this value is greater than 0" />}
            </>
          ) : null}
          {dishType === "soup" ? (
            <>
              <TextField
                label="Spiciness scale"
                type="number"
                inputProps={{
                  min: 1,
                  max: 10,
                }}
                {...register("spiciness_scale", { required: true, min: 1, max: 10 })}
              />
              {errors.spiciness_scale?.type === "required" && <ErrorNotification message="This field is required" />}
              {errors.spiciness_scale?.type === "max" && <ErrorNotification message="Ensure this value is less than or equal to 10" />}
              {errors.spiciness_scale?.type === "min" && <ErrorNotification message="ensure this value is greater than or equal to 1" />}
            </>
          ) : null}
          {dishType === "sandwich" ? (
            <>
              <TextField
                label="Slices of bread"
                type="number"
                inputProps={{
                  min: 1,
                }}
                {...register("slices_of_bread", { required: true, min: 1 })}
              />
              {errors.slices_of_bread?.type === "required" && <ErrorNotification message="This field is required" />}
              {errors.slices_of_bread?.type === "min" && <ErrorNotification message="Ensure this value is greater than 0" />}
            </>
          ) : null}

          <SubmitButton type="submit">Submit</SubmitButton>
          {open ? (
            <Alert
              severity="success"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Request sent successfully
            </Alert>
          ) : null}
        </form>
      </FormWrapper>
    </>
  );
};

export default DishForm;

import React from "react";
import { ErrorWrapper, ErrorLeft, ErrorRight, ErrorDescription } from "./ErrorNotification.styled";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

interface IError {
  message: string | any;
}

const ErrorNotification = ({ message }: IError) => {
  return (
    <ErrorWrapper>
      <ErrorLeft>
        <HighlightOffIcon />
      </ErrorLeft>
      <ErrorRight>
        <ErrorDescription>{message}</ErrorDescription>
      </ErrorRight>
    </ErrorWrapper>
  );
};

export default ErrorNotification;

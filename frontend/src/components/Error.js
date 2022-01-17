import React from "react";
import Alert from "react-bootstrap/Alert";

const Error = (props) => {
  return (
    <Alert style={{ width: "100%" }} variant={props.variant}>
      {`Error 💥💥 : ${props.errorMsg}`}
    </Alert>
  );
};

export default Error;

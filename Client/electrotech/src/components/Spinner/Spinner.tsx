import React from "react";
import useStyles from "./styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const Spinner = () => {
  const classes = useStyles();
  return (
    <div className="spinner">
      <div className={classes.root}>
        <CircularProgress />
      </div>
    </div>
  );
};

export default Spinner;

import React from "react";
import TextField from "@material-ui/core/TextField";

import "./blogTemplate.css";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  textfield: {
    marginTop: 30,
    marginBottom: 70,
  },
}));

const BlogTemplate = ({ title, onChange, content }) => {
  const classes = useStyles();

  return (
    <div className="blog-template-contain">
      <TextField
        label="Title"
        variant="filled"
        value={title}
        onChange={(event) => onChange(event.target.value, "title")}
        classes={{ root: classes.textfield }}
        multiline
        rows={1}
        rowsMax={2}
      />
      <TextField
        value={content}
        onChange={(event) => onChange(event.target.value, "content")}
        variant="filled"
        multiline
        rows={6}
        rowsMax={20}
        label="Content"
      />
    </div>
  );
};

export default BlogTemplate;

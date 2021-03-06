import { CodeFile, File, Paste, PasteFile } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { InjectedFormProps, reduxForm } from "redux-form";
import Message from "semantic-ui-react/dist/es/collections/Message";

import { encryptThenSubmitPaste } from "../actions/creators";
import { IPartialPasteFile, IPasteFormData, PasteFileTypes } from "../reducers/form";
import { IReducer } from "../reducers/index";

import CreatePasteForm from "../components/createpasteform";


type PropsType = InjectedFormProps<IPasteFormData>;

const CreatePaste: React.StatelessComponent<PropsType> = (props: PropsType) => (
  <div>
    {
      props.error &&
      <Message error={true} content="An unknown error has occurred when submitting your paste." />
    }
    <CreatePasteForm
      valid={props.valid}
      dirty={props.dirty}
      onSubmit={props.handleSubmit}
    />
  </div>
);

// Todo clean this mess up. I think I need a few more components to separate this from
// the store cleanly.
const onSubmit = (values: IPasteFormData, dispatch: Dispatch<IReducer>, props: PropsType) => {
  const paste: Paste = Paste.empty();
  paste.files = values.files.map((f, i) => {
    if (f.type === PasteFileTypes.FILE) {
      return new PasteFile(i, f.name, f.data, f.meta.mime);
    }
    return new CodeFile(i, f.name, f.data, f.meta.highlight, f.meta.mime);
  });

  dispatch(encryptThenSubmitPaste(paste));
};

const validate = (values: IPasteFormData, props: {}) => {
  const errors = {
    files: {},
  };

  if (values.files.length === 0) {
    errors.files = "Must submit at least one file.";
  }

  values.files.forEach((f, i) => {
    if (!f.data || f.data.length === 0) {
      errors.files[i] = {
        data: "Empty files are not allowed.",
      };
    }
  });

  return errors;
};

export default reduxForm<IPasteFormData>({
  form: "createpaste",
  initialValues: {
    files: [],
  },
  onSubmit,
  validate,
})(CreatePaste);

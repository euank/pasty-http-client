import { CodeFile } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { arrayPush } from "redux-form";
import Button from "semantic-ui-react/dist/es/elements/Button";

import { PasteFileTypes } from "../../reducers/form";
import { IReducer } from "../../reducers/index";
import IconOrText from "../icons/iconortext";


export interface IButtonIconOrTextProps {
  icon: string;
  text: string;
  onClick?: () => any;
  compact?: boolean;
}

export interface IButtonIconOrTextStateProps {
  fonticons: boolean;
}

type PropsType = IButtonIconOrTextProps & IButtonIconOrTextStateProps;

const ButtonIconOrText = (props: PropsType) => {
  if (props.fonticons) {
    return (
      <Button
        compact={props.compact}
        onClick={props.onClick}
        icon={props.icon}
      />
    );
  }

  return (
    <Button
      compact={props.compact}
      onClick={props.onClick}
    >
      {props.text}
    </Button>
  );
};

const mapStateToProps = (state: IReducer, ownProps: IButtonIconOrTextProps): IButtonIconOrTextStateProps => ({
  fonticons: state.settings.fonticons,
});

export default connect(mapStateToProps, () => ({}))(ButtonIconOrText);

import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { arrayRemove } from "redux-form";
import Button from "semantic-ui-react/dist/es/elements/Button";
import Popup from "semantic-ui-react/dist/es/modules/Popup";

import { getFileFormByIndexDefault, IFileFormByIndexPropsType } from "../../helpers/fileformprops";
import { IReducer } from "../../reducers/index";
import ButtonIconOrText from "../buttons/buttoniconortext";

interface IRemoveFileIconProps {
  index: number;
}

interface IRemoveFileIconDispatchProps {
  removeFile: () => void;
}

type PropsType = IRemoveFileIconProps & IRemoveFileIconDispatchProps;

class RemoveFileIcon extends React.Component<PropsType, undefined> {
  public render() {
    return (
      <div>
        <Popup
          basic={true}
          trigger={
            <ButtonIconOrText
              icon="trash"
              text="Remove file"
              onClick={this.props.removeFile}
            />
          }
          content="Remove this file"
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<IReducer>, ownProps: IRemoveFileIconProps)
                         : IRemoveFileIconDispatchProps => ({
  removeFile: () => dispatch(arrayRemove("createpaste", "files", ownProps.index)),
});

export default connect(getFileFormByIndexDefault, mapDispatchToProps)(RemoveFileIcon);

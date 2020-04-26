import React, {ReactElement} from 'react';

interface IProps {
  children: ReactElement
}

export class IconWrapper extends React.Component<IProps> {
  render() {
    return (
        <div>
          {this.props.children}
        </div>
    );
  }
}


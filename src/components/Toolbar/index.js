// @flow
import React, { PropTypes } from 'react';
import { Header, Icon, Button, Title } from 'native-base';

const Toolbar = (props) => {
  const { leftName, rightName, title, leftFunc, rightFunc } = props;
  return (
    <Header>
      {leftName || leftFunc ?
        <Button
          transparent
          onPress={leftFunc}
        >
          <Icon name={leftName} />
        </Button> : undefined
      }
      <Title>
        {title}
      </Title>
      {rightName || rightFunc ?
        <Button
          transparent
          onPress={rightFunc}
        >
          <Icon name={rightName} />
        </Button> : undefined
      }
    </Header>
  );
};

Toolbar.propTypes = {
  leftName: PropTypes.string,
  rightName: PropTypes.string,
  leftFunc: PropTypes.func,
  rightFunc: PropTypes.func,
  title: PropTypes.string.isRequired,
};

export default Toolbar;

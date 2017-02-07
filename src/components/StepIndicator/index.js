// @flow
import React from 'react';
import {
  Icon,
} from 'native-base';
import {
  View,
  Text,
} from 'react-native';
import s from './styles';


const steps = [{
  title: '个人信息',
  name: 'assignment',
}, {
  title: '车辆信息',
  name: 'directions-car',
}, {
  title: '完成',
  name: 'tag-faces',
}];


type Props = {
  active: number,
}

type ItemProps = {
  active: Boolean,
  title: string,
  name: string,
  step: number,
}

function checkStyle(active: Boolean): s.textFocus | s.textFade {
  return active ? s.textFocus : s.textFade;
}

const StepItem = (props: ItemProps) => {
  const { active, title, name, step } = props;
  return (
    <View style={active ? [s.stepItem, s.stepActive] : s.stepItem}>
      <Text style={[{ fontWeight: 'bold' }, checkStyle(active)]}>{title}</Text>
      <Icon name={name} style={checkStyle(active)} />
      <Text style={[{ fontWeight: 'bold' }, checkStyle(active)]}>步骤{step}</Text>
    </View>
  );
};

const StepIndicator = (props: Props) =>

  <View style={s.step}>
    <View style={s.box}>
      {
        steps.map(
          (step, index) =>
            <StepItem
              key={index}
              active={props.active === index}
              title={step.title}
              name={step.name}
              step={1 + index}
            />,
          )}
    </View>
  </View>;


export default StepIndicator;

import React, { Component } from 'react';
import { Picker as BasePicker, View, Text, Container } from 'native-base';

import theme from './theme';

const Item = BasePicker.Item;

type PickerItem = {
  label: string,
  value: string,
}

type Props = {
  items: Array<PickerItem>,
  onChange: (value: number) => void,
}

class Picker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedValue: props.items ? props.items[0].value : 0,
    };

    this.handleValueChange = this.handleValueChange.bind(this);
    
  }

  componentDidMount() {
    this.props.onChange(this.state.selectedValue);
  }

  props: Props
  handleValueChange: () => void

  handleValueChange(value) {
    if (this.props.items) {
      this.setState({
        selectedValue: value,
      }, () => this.props.onChange(this.state.selectedValue));
    }
  }
  render() {
    const { items } = this.props;
    
    return (
      <Container theme={theme} >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
            borderBottomColor: '#6E7783',
            borderBottomWidth: 2,
          }}
        >
          <Text
            style={{
              width: 80,
              fontSize: 16,
              lineHeight: 28,
              alignSelf: 'center',
              fontWeight: 'bold',
              color: '#52616a',
            }}
          >
            服务区
            </Text>
          <BasePicker
            style={{ flex: 1, alignSelf: 'flex-end', height: 25 }}
            iosHeader="服务地区"
            mode="dialog"
            selectedValue={this.state.selectedValue}
            onValueChange={this.handleValueChange}
          >
            {items ? items.map((v, i) =>
              <Item key={i} label={v.label} value={v.value} />,
              ) : undefined}
          </BasePicker>
        </View>
      </Container>
    );
  }
}

export default Picker;

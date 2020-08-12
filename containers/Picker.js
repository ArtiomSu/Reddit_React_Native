import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput
  } from 'react-native';
import PropTypes from 'prop-types'

import {Picker} from '@react-native-community/picker';

export default class MyPicker extends Component {
  render() {
    const { value, onChange, options, customSubreddit } = this.props

    return (
      <View style={styles.picker}>
        {/* <Picker
        selectedValue={"java"}
        style={{height: 50, width: 100}}
        onValueChange={(itemValue, itemIndex) =>
            this.setState({language: itemValue})
        }>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
        </Picker> */}

        <Picker 
        selectedValue={value}
        onValueChange={(value) => onChange(value)} 
        >
            {options.map(option => (
            //   <Text key={i}>{post.title}</Text>
            <Picker.Item key={option} label={option} value={option}/>
            ))}
        </Picker>

        <TextInput
        style={styles.input}
          autoCapitalize='none'
          placeholder="Enter custom subreddit"
          onChangeText={customSubreddit}
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  picker: {
        alignSelf: "stretch"
    },
  input: {
      alignSelf:'center'
   },
  });

MyPicker.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
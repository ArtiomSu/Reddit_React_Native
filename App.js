/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Root from './containers/Root';

const App: () => React$Node = () => {
  return (
    <View style={styles.app}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{
            flexGrow:1,
          }}
          >

            <Root style={{height:'100%'}} />
            
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  app:{
    flex:1,
    flexDirection: 'column',
    backgroundColor: "#FFA700",
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});

export default App;

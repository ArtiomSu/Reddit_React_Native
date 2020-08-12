import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Linking,
    Image
  } from 'react-native';
import PropTypes from 'prop-types'

export default class Posts extends Component {
  render() {
    return (
      <View style={styles.post}>
        {this.props.posts.map((post, i) => (
        //   <Text key={i}>{post.title}</Text>
        render_row(post,i)
        ))}
      </View>
    )
  }
}

var render_row = (post, i) =>{

    const colors = [
        "#ff6600",
        "#993d00"
    ];

    let style = [
         
        {'backgroundColor': colors[i % colors.length]}
      ];

    let image_url = ( !post.thumbnail || post.thumbnail.length < 10) ? "https://cdn3.iconfinder.com/data/icons/abstract-1/512/no_image-512.png" : post.thumbnail;

    return (
      <View key={i} style={[style, styles.group]}>
      <Image
      style={styles.image}
      source={{
        uri: image_url
      }}
    />
    <View style={styles.text_wrap}>
    <Text onPress={()=> Linking.openURL(post.url)} style={styles.text}>{post.title}</Text>
    </View>
      <View style={{width:'5%'}}/>

    </View>
    );
};

const styles = StyleSheet.create({
    post: {
      justifyContent:'flex-start'
    },
    text:{
      textAlign: 'center',
      textAlignVertical: 'center',
      // alignSelf:'center',
      // flexWrap: 'wrap',
      // height: 50
      
    },
    image:{
      width: '15%',
      height: 50,
    },
    group:{
      flexDirection:'row',
      alignItems: 'center'

    },
    text_wrap:{
      marginLeft:10,
      width:'80%'

    }
  });

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}
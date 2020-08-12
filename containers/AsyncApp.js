import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    View,
    Text,
    Button,
    StyleSheet
  } from 'react-native';

import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit
} from '../actions'
import MyPicker from './Picker'
import Posts from './Posts'

class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
    this.handleCustomSubreddit = this.handleCustomSubreddit.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = this.props
      dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }
  }

  handleChange(nextSubreddit) {
    this.props.dispatch(selectSubreddit(nextSubreddit))
    this.props.dispatch(fetchPostsIfNeeded(nextSubreddit))
  }

  handleCustomSubreddit(text){
    if(text.length > 2){
      this.props.dispatch(selectSubreddit(text))
      this.props.dispatch(fetchPostsIfNeeded(text))
    }
  }

  handleRefreshClick() {
    const { dispatch, selectedSubreddit } = this.props
    dispatch(invalidateSubreddit(selectedSubreddit))
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props
    return (
      <View style={styles.all}>

        <View style={styles.nonpost}>

          <MyPicker
            value={selectedSubreddit}
            onChange={this.handleChange}
            customSubreddit={this.handleCustomSubreddit}
            options={['reactjs', 'frontend', 'programming']}
          />
          <View>
            {lastUpdated && (
              <Text>
                Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}
              </Text>
            )}
            {!isFetching && (
              <Button title="Refresh" onPress={this.handleRefreshClick} />
            )}
          </View>
          {isFetching && posts.length === 0 && <Text>Loading...</Text>}
          {!isFetching && posts.length === 0 && <Text style={styles.not_found}>Not Found</Text>}
        </View>

        {posts.length > 0 && (
          <View style={{ opacity: isFetching ? 0.5 : 1 },styles.posts}>
            <Posts posts={posts} />
          </View>
        )}


      </View>
    )
  }
}

AsyncApp.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit } = state
  const { isFetching, lastUpdated, items: posts } = postsBySubreddit[
    selectedSubreddit
  ] || {
    isFetching: true,
    items: []
  }

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  }
}

const styles = StyleSheet.create({
    posts: {
      marginTop: 20,
      alignItems:'flex-start',
      alignContent: 'flex-start'
      
    },
    all:{
    },
    nonpost:{
      alignItems:'center'
    },
    not_found:{
      fontSize:80,
      alignSelf:'center',
      color:'#ff0000',
      textAlign:'center',
      textAlignVertical:'center'
    }
    
  });

export default connect(mapStateToProps)(AsyncApp)
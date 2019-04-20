import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComment } from '../actions/comments'



class AddCommentToolBar extends Component {
  state = {
    comment: ''
  }
  handleSubmit(event) {
    event.preventDefault()
    console.log(this.props)
    let problemId = this.props.problem_id
    let userId = this.props.user_data._id
    let comment = {
      post_id: problemId,
      user_id: userId,
      comment:  this.state.comment
    }
    this.props.addCommentToPost(problemId, comment)
    this.setState({comment: ''})
  }

  render() {
    return (
      <div className="px-6 py-4">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
              className="w-full h-8 p-4"
              type="text"
              name='comment'
              onChange={(e) => this.setState({comment: e.target.value})}
              placeholder="Add your comment" />
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCommentToPost: (postId, comment) => dispatch(addComment(postId, comment))
  }
}

export default connect(null, mapDispatchToProps)(AddCommentToolBar);
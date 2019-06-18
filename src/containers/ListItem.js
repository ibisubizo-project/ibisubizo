import React, {Component} from 'react';
import { connect } from 'react-redux'
import TimeAgo from 'react-timeago';
import { Redirect } from 'react-router-dom';
import ListItemToolBar from './ListItemToolBar';
import AddCommentToolBar from './AddCommentToolBar';
import history from '../history';
import actions from '../actions/actions'
import commentApi from '../services/commentApi';
import likesApi from '../services/likesApi'

class ListItem extends Component {
  state = {
    created_by: {},
    reRender: false,
    comments: [],
    likes: [],
    hasLiked: false,
    unAuthenticatedAction: false
  }

  componentWillMount() {
    const comments = commentApi.ListAllPostComments(this.props._id)
    const likes = likesApi.GetAllLikes(this.props._id)

    Promise.all([comments, likes])
    .then(result => {
      this.setState({comments: result[0], likes: result[1]})
    })

    this.state.likes.map(like => {
      const userLocalStorage = JSON.parse(localStorage.getItem("userData"))
      if(like.liked_by === userLocalStorage._id) {
        this.setState({hasLiked: true})
      }
    })
  }

  updateComment(comment) {
    this.setState({comment: this.state.comments.push(comment)})
  }

  updateLike(likeId) {
    const userLocalStorage = JSON.parse(localStorage.getItem("userData"))

    if(!this.props.userIsAuthenticated) {
      this.setState({unAuthenticatedAction : true})
    } else {
      if(this.state.hasLiked) {
        const userLike = {}
        userLike.problem_id = this.props._id
        userLike.liked_by = userLocalStorage._id
        likesApi.RemoveLike(this.props._id, userLocalStorage._id).then(result => {
          this.state.likes.map((item, index) => {
            if(item.liked_by === userLocalStorage._id) {
              this.state.likes.splice(index, 1)
            }
          })
          this.setState({hasLiked: !this.state.hasLiked})
        }).catch(error => {
          console.error(error)
        })
      } else {
        const like = {}
        like.problem_id = this.props._id
        like.liked_by = userLocalStorage._id

        likesApi.AddLike(like).then(result => {
          this.setState({likes: [...this.state.likes, like], hasLiked: !this.state.hasLiked})
        }).catch(error => {
          console.error(error)
        })
      }
    }
  }

  viewProblemDetails(evt) {
    evt.preventDefault()
    
    if(!this.props.userIsAuthenticated) {
      this.setState({unAuthenticatedAction : true})
    }
    this.props.setSelectedProblem(this.props.problem)
    history.push(`/problem/${this.props._id}`)
  }

  dropDownStyle={
      color: '#676767',
      position: 'absolute',
      backgroundColor: '#fff',
      borderRadius: '4px',
      boxShadow: '0 2px 8px rgba(0,0,0,.1)',
      opacity: '.001',
      transition: 'transform .2s ease-in-out,opacity .2s ease-in-out,width .2s ease-in-out,height .2s ease-in-out',
      border: '1px solid #dfdfdf',
      borderTop: '1px solid #dfdfdf,10px solid #fff',
      margin: '0 0 25px -6px',
      transform: 'translate3d(calc(-50% + .5px),-10px,0)',
      webkitBackfaceVisibility: 'hidden',
      pointerEvents: 'none',
      zIndex: '2',
      left: '50%',
      top: 'calc(50% + 22px)',
      minWidth: '150px'
  }

  render() {
    const {_id, title, text, created_at, pictures } = this.props;
    const localStorageUserData = localStorage.getItem("userData")
    let renderedImage = null
    if(this.state.unAuthenticatedAction === true) {
      return <Redirect to="/auth/login" />
    }

    if(pictures !== undefined){
      renderedImage = (pictures.length > 0) ? <p><a href={pictures[0]}><img src={pictures[0]} alt="Upload" className="border border-solid border-grey-light rounded-sm w-full" /></a></p> : ''
    }
    return (
      <div className="text-black mb-3  rounded border border-gray shadow">
        <div className="px-2 pt-4 bg-white">
          <div>
            <div className="flex justify-between pb-4">
              <div className="flex">
                <h3 className="font-bold text-2xl mr-2">{title}</h3>
                <TimeAgo date={new Date(created_at)} />
              </div>
            </div>

            <p className="description pb-2" onClick={this.viewProblemDetails.bind(this)}>
              {text}
            </p>
            {renderedImage}
          </div>
          {(this.props.problem && this.props.problem.status == 0) 
            ? <div className="text-white text-center rounded-full font-bold bg-gray-800 mt-4" style={{width: "90px"}}>Public</div> : <div className="text-white text-center rounded-full font-bold bg-gray-800 mt-4" style={{width: "90px"}}>Private</div> }
          <ListItemToolBar problem={this.props.problem} title={title} personalListings={this.props.personalListings} user_data={JSON.parse(localStorageUserData)} problem_id={_id} comments={this.state.comments} likes={this.state.likes} updateLike={this.updateLike.bind(this)} />
          {localStorageUserData ? <AddCommentToolBar updateComment={this.updateComment.bind(this)}  problem_id={_id} user_data={JSON.parse(localStorageUserData)} /> : '' }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      selectedProblem: state.problems.selectedProblem,
      userIsAuthenticated: state.usersReducer.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => ({
  setSelectedProblem: (problem) => dispatch(actions.currentSelectedProblem(problem))
})

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);

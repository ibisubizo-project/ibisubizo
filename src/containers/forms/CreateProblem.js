import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import firebase from 'firebase'
import FileUploader from 'react-firebase-file-uploader'
import { addProblem } from '../../actions/problems'
import actions from '../../actions/actions'
import config from '../../firebase'
import Loader from '../../components/Loader'
import { css } from '@emotion/core'
import { ClipLoader } from 'react-spinners'
import AppConfig from '../../utils/config'


firebase.initializeApp(config)


class CreateProblemForm extends Component {
  state = {
    title: "",
    description: "Enter problem description",
    status: 1,
    isUploading: false,
    progress: 0,
    uploadedPictures: [],
    uploadedVideos: [],
    uploadedDocuments: [],
    redirectToLogin: false
  }

  handleUploadStart() { 
    this.setState({isUploading: true, progress: 0})
  }
  handleProgress(progress) { 
    this.setState({progress})
  }
  handleUploadError(error) {
    this.setState({isUploading: false})
    console.error(error)
  }
  handleUploadSuccess(filename) {
    this.setState({progress: 100, isUploading: false})
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState(state => {
        const newURL = state.uploadedPictures.concat(url)
        return { uploadedPictures: newURL}
      }))
  }

  handleVideoUploadSuccess(filename) {
    this.setState({progress: 100, isUploading: false})
    firebase
      .storage()
      .ref("videos")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState(state => {
        const newURL = state.uploadedVideos.concat(url)
        return { uploadedVideos: newURL}
      }))
  }

  handleDocumentUploadSuccess(filename) {
    this.setState({progress: 100, isUploading: false})
    firebase
      .storage()
      .ref("documents")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState(state => {
        const newURL = state.uploadedDocuments.concat(url)
        return { uploadedDocuments: newURL}
      }))
  }

  onSubmit = (evt) => {
    evt.preventDefault()
    let userData = JSON.parse(localStorage.getItem("userData"))
    console.log(userData)
    let payload = {}

    if(userData === undefined || userData === null || !userData.hasOwnProperty("_id") || !this.props.userIsAuthenticated) {
      this.setState({redirectToLogin: true})
      return
    }

    payload.title = this.state.title
    payload.text = this.state.description
    payload.status = this.state.status
    payload.created_by = userData._id
    payload.pictures = this.state.uploadedPictures
    payload.videos = this.state.uploadedVideos
    payload.documents = this.state.uploadedDocuments


    axios.post(`${AppConfig.API_URL}/problems`, payload).then(response => {
      this.props.addingProblemSuccess(response)
    }).catch(error => {
      this.props.addingProblemFailure(error)
    })

    this.setState({title:  '', description: ''}) //Clear form field
    evt.target.reset()
  }
    render() {
      if(this.state.redirectToLogin) {
        return <Redirect to='/auth/login' />
      }
      return (
        <div class="content-container p-8 bg-gray-100">
          <div class="container sm:w-full mx-auto mt-2 overflow-x-hidden p-4">
            <div class="w-full m-4 sm:w-4/5 md:w-3/5 rounded border border-gray">
              <form class="bg-white text-black rounded" onSubmit={this.onSubmit.bind(this)}>
                <div class="bg-teal-800 text-white p-2">Create Problem</div>
                <div>
                  <input 
                    type="text"
                    value={this.state.title}
                    onChange={e => this.setState({title: e.target.value})}
                    placeholder="Problem Title"
                    required
                    class="w-full appearance-none bg-white py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder='Enter Problem title' />
                </div>
                <div>
                  <textarea 
                    rows='3'
                    value={this.state.description}
                    onChange={e => this.setState({description: e.target.value})}
                    class="w-full appearance-none py-2 px-3 bg-white text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline mb-4">Enter your Description</textarea>
                </div>

                <div class="flex justify-between p-2">
                  <div class="uploads">
                    <ul class="flex">
                      <li class="mr-3">PHOTOS</li>
                      <li class="mr-3">VIDEOS</li>
                      <li class="mr-3">DOCUMENTS</li>
                    </ul>
                  </div>

                  <div class="privacy">
                    <div class="radio align-baseline">
                      <label class="mr-3">
                        <input class="mr-2" type="radio" value="0" />Public
                      </label>
                      <label>
                        <input class="mr-2" type="radio" value="1" checked="" />Private
                      </label>
                    </div>
                  </div>
                </div>
                <button type='submit' class="text-white rounded p-3 m-2 leading-tight bg-teal-400">Submit</button>
              </form>
            </div>
          </div>
        </div>
      )
    }
}

const mapStateToProps = (state) => {
  return {
      userIsAuthenticated: state.usersReducer.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
      addingProblemSuccess: (response) => dispatch(actions.addingProblemSuccess(response)),
      addingProblemFailure: (error) => dispatch(actions.addingProblemFailure(error))
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(CreateProblemForm)
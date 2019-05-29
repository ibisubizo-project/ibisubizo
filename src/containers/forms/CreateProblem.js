import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import firebase from 'firebase'
import FileUploader from 'react-firebase-file-uploader'
import actions from '../../actions/actions'
import config from '../../firebase'
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
        <div className="container sm:w-full mx-auto mt-2 overflow-x-hidden p-4">
          <div className="w-full m-4 sm:w-4/5 md:w-4/5 rounded border border-gray">
            <form className="bg-white text-black rounded" onSubmit={this.onSubmit.bind(this)}>
              <div className="bg-teal-800 text-white p-2">Create Problem</div>
              <div>
                <input 
                  type="text"
                  value={this.state.title}
                  onChange={e => this.setState({title: e.target.value})}
                  required
                  className="w-full appearance-none bg-white py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                  placeholder='Enter Problem title' />
              </div>
              <div>
                <textarea 
                  rows='3'
                  value={this.state.description}
                  onChange={e => this.setState({description: e.target.value})}
                  className="w-full appearance-none py-2 px-3 bg-white text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline mb-4">Enter your Description</textarea>
              </div>

              <div className="flex justify-between p-2">
                <div className="uploads">
                  <ul className="flex">
                    <li className="mr-3">
                    <label className="cursor-pointer">
                      Photo
                      <FileUploader
                        hidden
                        accept="image/*"
                        multiple
                        storageRef={firebase.storage().ref('images')}
                        onUploadStart={this.handleUploadStart.bind(this)}
                        onUploadError={this.handleUploadError.bind(this)}
                        onUploadSuccess={this.handleUploadSuccess.bind(this)}
                        onProgress={this.handleProgress.bind(this)}
                      />
                      </label>
                    </li>
                    <li className="mr-3">
                      <label className="cursor-pointer">
                        Video
                        <FileUploader
                          hidden
                          accept="video/*"
                          multiple
                          storageRef={firebase.storage().ref('videos')}
                          onUploadStart={this.handleUploadStart.bind(this)}
                          onUploadError={this.handleUploadError.bind(this)}
                          onUploadSuccess={this.handleVideoUploadSuccess.bind(this)}
                          onProgress={this.handleProgress.bind(this)}
                        />
                      </label>
                    </li>
                    <li className="mr-3">
                      <label className="cursor-pointer">
                        Documents
                        <FileUploader
                          hidden
                          accept="*"
                          multiple
                          storageRef={firebase.storage().ref('documents')}
                          onUploadStart={this.handleUploadStart.bind(this)}
                          onUploadError={this.handleUploadError.bind(this)}
                          onUploadSuccess={this.handleDocumentUploadSuccess.bind(this)}
                          onProgress={this.handleProgress.bind(this)}
                        />
                      </label>
                    </li>
                  </ul>
                </div>

                <div className="privacy">
                  <div className="radio align-baseline">
                    <label className="mr-3">
                      <input 
                        className="mr-2" 
                        type="radio"
                        value={0}
                        checked={this.state.status === 0}
                        onChange={e => this.setState({status: 0 })} />Public
                    </label>
                    <label>
                      <input 
                        className="mr-2" 
                        type="radio" 
                        value={1}
                        checked={this.state.status === 1}
                        onChange={e => this.setState({status: 1 })} />Private
                    </label>
                  </div>
                </div>
              </div>
              <button type='submit' className="text-white rounded p-3 m-2 leading-tight bg-teal-400">Submit</button>
            </form>
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
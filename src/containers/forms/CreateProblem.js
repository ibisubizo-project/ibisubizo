import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import firebase from 'firebase'
import FileUploader from 'react-firebase-file-uploader'
import actions from '../../actions/actions'
import config from '../../firebase'
import AppConfig from '../../utils/config'
import Loader from 'react-loader-spinner'
import Switch from 'react-ios-switch'


firebase.initializeApp(config)


class CreateProblemForm extends Component {
  state = {
    title: "",
    description: "Enter Description",
    status: 1,
    isUploading: false,
    progress: 0,
    uploadedPictures: [],
    uploadedVideos: [],
    uploadedDocuments: [],
    redirectToLogin: false,
    error: '',
    message: '',
    checked: false
  }

  componentWillMount() {
    let postTitle = localStorage.getItem("post_title");
    let postDescription = localStorage.getItem("post_description");
    if(postTitle && postDescription) {
      this.setState({title: postTitle, description: postDescription})
    }
  }

  handleUploadStart() { 
    this.setState({isUploading: true, progress: 0})
  }
  handleProgress(progress) { 
    this.setState({progress})
  }
  handleUploadError(error) {
    this.setState({isUploading: false})
  }
  handleUploadSuccess(filename) {
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState(state => {
        const newURL = state.uploadedPictures.concat(url)
        return { uploadedPictures: newURL}
      }))
      this.setState({progress: 100, isUploading: false})
  }

  handleVideoUploadSuccess(filename) {
    firebase
      .storage()
      .ref("videos")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState(state => {
        const newURL = state.uploadedVideos.concat(url)
        return { uploadedVideos: newURL}
      }))
      this.setState({progress: 100, isUploading: false})
  }

  handleDocumentUploadSuccess(filename) {
    firebase
      .storage()
      .ref("documents")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState(state => {
        const newURL = state.uploadedDocuments.concat(url)
        return { uploadedDocuments: newURL}
      }))
      this.setState({progress: 100, isUploading: false})
  }

  onSubmit = (evt) => {
    evt.preventDefault()
    let userData = JSON.parse(localStorage.getItem("userData"))
    let payload = {}

    if(userData === undefined || userData === null || !userData.hasOwnProperty("_id") || !this.props.userIsAuthenticated) {
      localStorage.setItem("post_title", this.state.title)
      localStorage.setItem("post_description", this.state.description)
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
      this.setState({message: 'Your Post was successfully added'})
      localStorage.removeItem("post_title")
      localStorage.removeItem("post_description")
      setTimeout(() => {
        window.location.reload();
      }, 2000)
    }).catch(error => {
      this.props.addingProblemFailure(error)
      this.setState({error: 'An error occurred...'})
    })

    this.setState({title:  '', description: ''}) //Clear form field
    evt.target.reset()
  }
    render() {
      if(this.state.redirectToLogin) {
        return <Redirect to='/auth/login' />
      }
      const hasErrors = (this.state.error) ? 'block border border-red-800 p-2 mb-2' : 'hidden';
      const hasMessage = (this.state.message) ? 'block border bg-teal-600 text-white border-gray-800 font-bold p-2' : 'hidden';
      let defaultSubmitButtonClass = "text-white rounded p-3 m-2 leading-tight bg-teal-400";
      const isUploading = (this.state.isUploading) ? `${defaultSubmitButtonClass} opacity-50 cursor-not-allowed` : `${defaultSubmitButtonClass}`;

      return (
        <div className="container sm:w-full mx-auto mt-2 overflow-x-hidden p-4">
          <div className="w-full m-0 sm:m-4 sm:w-4/5 md:w-3/5 rounded border border-gray">
            <div className={hasErrors}>
              {this.state.error && <p>{this.state.error} </p>}
            </div>
            <div className={hasMessage}>
              {this.state.message && <p>{this.state.message} </p>}
            </div>
            <form className="bg-white text-black rounded" onSubmit={this.onSubmit.bind(this)}>
              <div className="text-white p-2 bg-gray-800">Submit Problem</div>
              <div>
                <input 
                  type="text"
                  value={this.state.title}
                  onChange={e => this.setState({title: e.target.value})}
                  className="w-full appearance-none bg-white py-2 px-3 text-gray-700 mb-3 border border-white leading-tight outline-none focus:border-gray-200 focus:outline-none focus:bg-white" 
                  placeholder='Enter Problem title' />
              </div>
              <div>
                <textarea 
                  rows='3'
                  value={this.state.description}
                  onChange={e => this.setState({description: e.target.value})}
                  className="w-full appearance-none py-2 px-3 bg-white text-gray-700 mb-3 border border-white leading-tight outline-none focus:border-gray-200 focus:outline-none mb-4"></textarea>
                  {this.state.isUploading && <Loader className="mx-auto" type="Oval" color="green" height={40} width={40} /> }
              </div>

              <div className="flex justify-between p-2">
                <div className="uploads">
                  <ul className="flex">
                    <li className="mr-3">
                    <label className="cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 8v8l5-4-5-4zm9-5H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>
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
                    <li className="mr-8">
                      <label className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
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
                    <li className="mr-2 font-bold">
                      {this.state.checked ? 'Public' : 'Private'}
                    </li>
                    <li>
                      <Switch
                      checked={this.state.checked}
                      className="switch"
                      onChange={checked => {
                        let status = undefined;
                        if(checked) {
                          status = 0
                        } else {
                          status = 1
                        }
                        this.setState({ checked: !this.state.checked, status })}
                      }
                    />
                    </li>
                  </ul>
                </div>
              </div>
              <button type='submit' className={isUploading}>Submit</button>
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
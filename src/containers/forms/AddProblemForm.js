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

firebase.initializeApp(config)


const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`


class AddProblemForm extends Component {
    state = {
        title: "",
        description: "Enter problem description",
        status: 1,
        isUploading: false,
        progress: 0,
        uploadedPictures: [],
        uploadedVideos: [],
        uploadedDocuments: []
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
          console.dir(this.state.uploadedPictures)
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
          console.dir(this.state.uploadedVideos)
    }

    handleDocumentUploadSuccess(filename) {
        this.setState({progress: 100, isUploading: false})
        firebase
          .storage()
          .ref("document")
          .child(filename)
          .getDownloadURL()
          .then(url => this.setState(state => {
              const newURL = state.uploadedDocuments.concat(url)
              return { uploadedDocuments: newURL}
          }))
          console.dir(this.state.uploadedDocuments)
    }

    onSubmit = (evt) => {
        evt.preventDefault()
        console.dir(this.state.uploadedPictures)
        let userData = JSON.parse(localStorage.getItem("userData"))
        console.log(userData)
        let payload = {}

        if(userData === undefined || userData === null || !userData.hasOwnProperty("_id")) {
            console.error("WE can't find user id in local storage")
            payload.title = this.state.title
            payload.text = this.state.description
            payload.status = this.state.status
            //TODO: Show dialog telling the user to login 
            return <Redirect to='/auth/login' />
        }

        payload.title = this.state.title
        payload.text = this.state.description
        payload.status = this.state.status
        payload.created_by = userData._id
        payload.pictures = this.state.uploadedPictures
        payload.videos = this.state.uploadedVideos
        payload.document = this.state.uploadedDocuments

        console.dir(payload)

        console.log("Before API request")
        axios.post('http://46.101.146.153:8000/api/problems', payload).then(response => {
            console.log(response)
            this.props.addingProblemSuccess(response)
        }).catch(error => {
            console.error(error)
            this.props.addingProblemFailure(error)
        })
        console.log(payload)

        this.setState({title:  '', description: ''}) //Clear form field
        evt.target.reset()
    }

    render() {
        if(this.state.isUploading) {
            return(
                <div className='sweet-loading'>
                    <ClipLoader
                        css={override}
                        sizeUnit={"px"}
                        size={30}
                        color={'#123abc'}
                        loading={this.state.isUploading}
                    />
                </div>
            )
        }
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <div className="title">
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline mb-2"
                        type="text"
                        value={this.state.title}
                        onChange={e => this.setState({title: e.target.value})}
                        placeholder="Problem Title" 
                        required
                    />
                </div>

                <div className="problem__description mb-6">
                    <textarea 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                        required
                        cols='100'
                        placeholder={this.state.description} 
                        onChange={e => this.setState({description: e.target.value})}
                        rows='6'>
                    </textarea>
                </div>
    
                <div className="flex justify-between">
                    <div className="uploads">
                        <ul className="flex list-reset">
                            <li className="mr-2">
                                <label style={{pointer: 'cursor'}}>
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
                            <li className="mr-2">
                                <label style={{pointer: 'cursor'}}>
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
                            <li className="mr-2">
                                <label style={{pointer: 'cursor'}}>
                                    Documents
                                    <FileUploader
                                        hidden
                                        accept="file/*"
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

                    <div className="post-type">
                        <div className="radio align-baseline">
                            <label className="mr-3">
                                <input
                                    className="mr-2"
                                    type="radio" 
                                    value={0}
                                    checked={this.state.status === 0}
                                    onChange={e => this.setState({status: 0 })}
                                    />
                                    Public
                            </label>

                            <label>
                                <input
                                    className="mr-2"
                                    type="radio"
                                    value={1}
                                    checked={this.state.status === 1}
                                    onChange={e => this.setState({status: 1 })}
                                    />
                                    Private
                            </label>
                        </div>
                    </div>
                </div>
                <button className="mt-6 bg-teal text-white p-3" type='submit' disabled={this.isUploading === true}>Submit</button>
            </form>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        addingProblemSuccess: (response) => dispatch(actions.addingProblemSuccess(response)),
        addingProblemFailure: (error) => dispatch(actions.addingProblemFailure(error))
    }
  }

export default  connect(null, mapDispatchToProps)(AddProblemForm) //connect(null, mapDispatchToProps)()
import React, {Component} from 'react'
import { Twitter, Facebook } from 'react-social-sharing'
import { Link } from 'react-router-dom';
import problemsApi from '../services/problemsApi';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class ListItemToolBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            comments: {},
            commentCount: 0,
            openDialog: false,
            text: '',
            title: ''
        }

        this.deleteProblem = this.deleteProblem.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.editPost = this.editPost.bind(this);
    }

    openDialog() {
        this.setState({openDialog: true})
    }

    closeDialog() {
        this.setState({openDialog: false})
    }

    editPost(problemId, userId) {
        let update = {
            text: this.state.text,
            title: this.state.title
        }
        problemsApi.updateProblem(problemId, userId, update).then(result => {
            window.location.reload();
        });
    }

    componentWillReceiveProps(nextProps) {
        let problem = nextProps.problem;
        this.setState({title: problem.title, text: problem.text})
    }

    delete(problem_id){
        confirmAlert({
          title: 'Confirm to submit',
          message: 'Are you sure to delete this problem?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => this.deleteProblem(problem_id)
            },
            {
              label: 'No',
              onClick: () => {
                  return null;
              }
            }
          ]
        });
      };

    deleteProblem() {
        problemsApi.deleteProblem(this.props.problem_id).then(() => {
            console.log("Problem Deleted")
            window.location = '/'
        })
    }

    render() {
        if(this.state.isFetching) {
            return <div></div>
        }

        console.log(this.props);

        return (
            <div className="p-0 sm:px-2 py-2">
                <div className="flex">
                    <span  onClick={(e) => console.log(`${this.props.problem_id}`)}
                        className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
                        <i className="fa fa-comment fa-lg mr-2"></i>{this.props.comments.length}
                    </span>
                    <span
                        onClick={(e) => this.props.updateLike(this.props.problem_id)}
                        className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
                        <i
                          className="fa fa-heart fa-lg mr-2">
                          </i>
                          {this.props.likes.length}
                    </span>
                    {this.props.personalListings && (
                        <div className="flex">
                            <span className="mr-2">
                                <i className="fa fa-edit cursor-pointer" aria-hidden="true" onClick={() => this.openDialog()}></i>
                            </span>
                            <span className="mr-2">
                                <i className="fa fa-trash cursor-pointer hover:bg-red-600 hover:text-white" aria-hidden="true" onClick={() => this.delete(this.props.problem_id)}></i>
                            </span>
                        </div>
                    )}
                    <span className="flex rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
                        <Twitter solidcircle small link={`http://bisubizo.com/problem/${this.props.problem_id}`} />
                        <Facebook solidcircle small link={`http://bisubizo.com/problem/${this.props.problem_id}`} />
                    </span>
                </div>

                <Dialog fullWidth={true} maxWidth={`sm`} open={this.state.openDialog} onClose={this.closeDialog} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Edit Post</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Edit Your Post...
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="Title"
                            onChange={e => this.setState({title: e.target.value})}
                            value={this.state.title}
                            fullWidth
                        />

                        <TextField
                            autoFocus
                            multiline={true}
                            margin="dense"
                            id="description"
                            label="Description"
                            onChange={e => this.setState({text: e.target.value})}
                            value={this.state.text}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.editPost(this.props.problem_id, this.props.user_data._id)} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}


export default ListItemToolBar;

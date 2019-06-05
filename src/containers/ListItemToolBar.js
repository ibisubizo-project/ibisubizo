import React, {Component} from 'react'
import { Twitter, Facebook } from 'react-social-sharing'
import { Link } from 'react-router-dom';
import problemsApi from '../services/problemsApi';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

class ListItemToolBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            comments: {},
            commentCount: 0
        }

        this.deleteProblem = this.deleteProblem.bind(this);
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

        console.log(this.props.user_data);

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
                                <i className="fa fa-edit" aria-hidden="true" onClick={() => console.log("Editing...")}></i>
                            </span>
                            <span className="mr-2">
                                <i className="fa fa-trash" aria-hidden="true" onClick={() => this.delete(this.props.problem_id)}></i>
                            </span>
                        </div>
                    )}
                    <span className="flex rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
                        <Twitter solidcircle small link={`http://bisubizo.com/problem/${this.props.problem_id}`} />
                        <Facebook solidcircle small link={`http://bisubizo.com/problem/${this.props.problem_id}`} />
                    </span>
                </div>
            </div>
        )
    }
}


export default ListItemToolBar;

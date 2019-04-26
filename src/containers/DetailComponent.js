import React, {Component} from 'react'
import TimeAgo from 'react-timeago'
import problemsApi from '../services/problemsApi'
import commentsApi from '../services/commentApi'

class DetailComponent extends Component {

    state = {
        isLoading: false,
        problem : {},
        comments: []
    }
    componentDidMount() {
        const { match: { params } } = this.props;

        this.setState({isLoading: true})
        let problems = problemsApi.getProblem(params.id)
        let comments =  commentsApi.ListAllPostComments(params.id)


        Promise.all([problems, comments]).then(result => {
            console.dir(result)
            this.setState({problem: result[0], comments: result[1], isLoading: false})
        }).catch(error => {
            console.error(error)
            this.setState({isLoading: false})
        });

    }

    render() {
        const { match: { params } } = this.props;
        if(this.state.isLoading) {
            return <div>Loading...</div>
        }
        return (
            <div className="problem__detail container mx-auto">
                <div className="flex justify-between">
                    <div>{this.state.problem.title}</div>
                    <TimeAgo date={new Date(this.state.problem.created_at)} />
                </div>

                <div>
                    {this.state.problem.text}
                </div>

                <div className="px-6 py-4">
                    <div>
                        <span onClick={(e) => console.log(`You want to comment on post ${params.id}`)}
                            className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
                            <i className="fa fa-comment fa-lg mr-2"></i>{this.state.comments.length}
                        </span>
                        <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
                            <i className="fa fa-heart fa-lg mr-2"></i> 56
                        </span>
                        <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">
                            <i className="fa fa-share fa-lg mr-2"></i> 247
                        </span>
                    </div>
                </div>

                <div className="comments">
                    {this.state.comments.map(comments => (
                        <div key={comments._id}>
                            {comments.comment}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default DetailComponent
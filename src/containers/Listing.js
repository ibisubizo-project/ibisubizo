import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SinglePost from './SinglePost';
import ListItem from './ListItem';


class Listing extends Component {
    static propTypes = {
        problems: PropTypes.array.isRequired,
    };

    render() {
        const { problems } = this.props;
        if(!problems || problems.length === 0) {
            return (<div>No Post...</div>)
        }
        return (
            <div>
                {problems.map((problem, index) => {
                    return (
                        <ListItem key={problem._id} index={index} problem={problem} {...problem} />
                    )
                })}
            </div>
        )
    }
}

export default Listing;
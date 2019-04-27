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
        return (
            <div>
                {problems.map(problem => (
                    <ListItem key={problem._id} {...problem} problem={problem} />
                ))}
            </div>
        )
    }
}

export default Listing;
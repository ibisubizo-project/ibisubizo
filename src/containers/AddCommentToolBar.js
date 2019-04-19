import React, {Component} from 'react'



class AddCommentToolBar extends Component {

    render() {
        return (
            <div className="px-6 py-4">
                <input 
                    className="w-full h-8 p-4"
                    type="text" 
                    placeholder="Add your comment" />
            </div>
        )
    }
}

export default AddCommentToolBar;
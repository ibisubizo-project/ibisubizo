import React, {useState} from 'react'
import { connect } from 'react-redux'
import axios from 'axios';
import { addProblem } from '../../actions/problems'
import actions from '../../actions/actions';

const AddProblemForm = ({addingProblemSuccess, addingProblemFailure}) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState(1);

    const handleSubmit = event => {
        event.preventDefault();

        let payload = {};
        payload.title = title;
        payload.text = description;
        payload.status = status;
        payload.created_by = '5ca4c37063f44c0c2f50eea5';

        console.log("Before API request")
        axios.post('http://localhost:8000/api/problems', payload).then(response => {
            console.log(response);
            addingProblemSuccess(response)
        }).catch(error => {
            console.error(error);
            addingProblemFailure(error)
        })

        // addProblem(payload);
        console.log(payload);

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="title">
                <input 
                    type="text" 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Problem Title" 
                    required
                />
            </div>

            <div className="problem__description">
                <textarea 
                    required
                    cols='100'
                    onChange={e => setDescription(e.target.value)}
                    defaultValue={description}
                    rows='6'>
                </textarea>
            </div>

            <div className="flex">
                <div className="radio">
                    <label>
                        <input 
                            type="radio" 
                            value={0}
                            checked={status === 0}
                            onChange={e => setStatus(0)}
                            />
                            Public
                    </label>
                </div>

                <div className="radio">
                    <label>
                        <input 
                            type="radio"
                            value={1}
                            checked={status === 1}
                            onChange={e => setStatus(1)}
                            />
                            Private
                    </label>
                </div>
            </div>

            <div className="uploads">
                <ul className="flex">
                    <li>Photos</li>
                    <li>Video</li>
                    <li>Documents</li>
                </ul>
            </div>

            <button type='submit'>Submit</button>
        </form>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        addingProblemSuccess: (response) => dispatch(actions.addingProblemSuccess(response)),
        addingProblemFailure: (error) => dispatch(actions.addingProblemFailure(error))
    }
  }

export default  connect(null, mapDispatchToProps)(AddProblemForm); //connect(null, mapDispatchToProps)()
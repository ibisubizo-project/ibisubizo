import React, {Component} from 'react'

class Banner extends Component {
    render() {
        return (
            <div className="bg-blue-800 text-white"> 
                <div className="container sm:w-full mx-auto overflow-x-hidden">
                    <div className="w-full m-0 sm:m-4 sm:w-4/5 md:w-3/5 rounded">
                        <div className="banner">
                            <div className="text-center p-3 sm:p-0 sm:text-left">
                                <p className="text-2xl sm:text-1xl">Are you facing any issue? Submit it to us and get a Solution!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Banner
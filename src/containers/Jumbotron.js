import React, {Component} from 'react'


class Jumbotron extends Component {

    style = {
        backgroundColor: "#396afc",
        background: "-webkit-linear-gradient(to right, #2948ff, #396afc)",
        height: "auto"
    }
    render() {
        return (
            <div style={this.style} className="jumbotron sm:h-20 md:h-20">
                <div className="container w-full max-w-screen-xl relative mx-auto px-6 pt-16 pb-40 md:pb-24">
                    <div className="xl:flex -mx-6">
                        <div className="px-6 text-left md:text-center xl:text-left max-w-2xl md:max-w-3xl mx-auto">
                            <p className="mt-6 leading-relaxed sm:text-lg md:text-xl xl:text-lg text-white leading-tight">
                                <span className="font-medium font-bold">Whatever challenges</span> you are facing in your career, projects, businesses, family, social life etc… <span className="font-bold">submit them</span> to IBISUBIZO and <span className="font-bold">get them</span> fixed by Experts!
                            </p>
                        </div>
                        <div className="mt-12 xl:mt-0 px-6 flex-shrink-0 hidden sm:hidden md:block">
                            <iframe title="iframe" src="/about" className="border-0 mx-auto" style={{width: "40rem", height: "250px"}}></iframe>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Jumbotron
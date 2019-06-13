import React from 'react'
import { Helmet } from 'react-helmet'


const AboutUsComponent = () => {
    return (
        <div className="container m-auto h-screen p-8 text-grey-darkest">
            <Helmet>
                <title>About Us | Ibisubizo</title>

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@ibisubizo" />
                <meta name="twitter:title" content="Ibisubizo - A Solution Platform." />
                <meta name="twitter:description" content="Are you facing any issue? Submit it to us and get a Solution!." />
                <meta name="twitter:image" content="%PUBLIC_URL%/ibisubizo.jpg" />
                <meta name="twitter:creator" content="@opiumated" />
                <meta property="og:url" content="http://bisubizo.com/" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content="Ibisubizo - A Solution Platform." />
                <meta property="og:description" content="Are you facing any issue? Submit it to us and get a Solution!." />
                <meta property="og:image" content="%PUBLIC_URL%/ibisubizo.jpg"  />
            </Helmet>
            <div className="w-3/5 px-6 py-4">
                <h1 className="text-3xl">About Us</h1>
                <p className="mt-5 p-0">Ibisubizo.com is an online platform owned by Thousand Skills Ltd, a company which uses sciences and technology to design and provide solutions needed by its clients. </p>
                <p className="mt-5">Ibisubizo.com allows users to submit their individual and/or social issues so that they can be fixed by professionals</p>
            </div>
        </div>
    )
}

export default AboutUsComponent

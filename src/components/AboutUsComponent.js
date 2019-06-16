import React from 'react'
import { Helmet } from 'react-helmet'


const AboutUsComponent = () => {
    return (
        <div className="content-container p-0 sm:p-8">
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
            <div className="font-sans text-sm container  rounded w-full mx-auto pt-6 pb-8 border border:teal">
                <div className="w-full px-6 py-4">
                    <div className="about-us mt-10">
                        <h1 className="text-3xl">About Us</h1>
                        <p className="mt-5 p-0">Ibisubizo.com is an online platform owned by Thousand Skills Ltd </p>
                        <p className="mt-5">Ibisubizo.com allows users to submit their individual and/or social challenging issues so that they can be fixed by professionals. 
                            We help in resolving issues thanks to collaboration with experts and the use of sciences and technology for solutions design.
                        </p>

                        <p className="mt-4">
                            Our Contacts: 
                            <div><span> Phone: <a className="text-blue-500" href="tel:250786382301">+250 786 382 301</a> </span></div>
                            <div><span>Email: <a className="link text-blue-500" href="mailto:ibisubizo.com@gmail.com">ibisubizo.com@gmail.com</a></span></div>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUsComponent

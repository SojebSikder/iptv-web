import React from 'react'

import Header from './Header';
import Footer from './Footer';

import Config from '../../../../admin/classes/Config';
import Contact from './Contact';
import PricingPlan from './PricingPlan';
import PeopleReview from './PeopleReview';
import Newsletter from './Newsletter';
import AboutApp from './AboutApp';
import AppFeature from './AppFeature';

export default function Index() {
    return (
        <div>
            <Header />

            <section className="home" id="home">


                {/* <div className="content">
                    <h3>{Config.getAppName()}</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus suscipit porro nam libero natus error consequatur sed repudiandae eos quo?</p>
                    <a href="#about" className="btn">download now</a>
                </div> */}

                <div className="content">
                    <h3>Online Pharmacy, Video Consultation With Doctor</h3>
                    <p>Download and register on our app for free</p>
                    <a href="#about" className="btn">download now</a>
                </div>

                <div className="image">
                    <img src="images/home-img.png" alt="" />
                </div>

            </section>


            {/* App Feature */}
            {/* <AppFeature /> */}

            {/* About App */}
            <AboutApp />

            {/* Newsletter */}
            {/* <Newsletter /> */}

            {/* People Review */}
            {/* <PeopleReview /> */}

            {/* Pricing plan */}
            {/* <PricingPlan /> */}

            {/* Contact Us */}
            {/* <Contact /> */}

            {/* Footer */}
            <Footer />
        </div>
    )
}

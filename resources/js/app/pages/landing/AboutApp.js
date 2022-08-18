import React from 'react'
import Config from '../../../../admin/classes/Config';

export default function AboutApp() {
    return (
        <div>
            <section className="about" id="about">

                <h1 className="heading"> about the app </h1>

                <div className="column">

                    <div className="image">
                        <img src="images/about-img.png" alt="" />
                    </div>

                    <div className="content">
                        <h3>Online Pharmacy, Buy Medicines Online, Video Consultation With Doctor</h3>
                        <p>HealthCity Online Pharmacy where people can buy medicines online from home and can also get video consultation with doctor.
HealthCity Online Pharmacy is your complete online healthcare, medicine, and wellness App which is dealing with medicines, OTC, generic medicines and video consultation with doctor. Doctors can join our platform using our this app.</p>
                        <div className="buttons">
                            {/* <a href="#" className="btn"> <i className="fab fa-apple"></i> app store </a> */}
                            <a target="_blank" href={Config.getAppPlayStoreLink()} className="btn"> <i className="fab fa-google-play"></i> google-play </a>
                        </div>
                    </div>

                </div>

            </section>
        </div>
    )
}

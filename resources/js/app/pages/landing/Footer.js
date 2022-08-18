import React from 'react'

export default function Footer() {
    return (
        <div className="footer">

            <div className="box-container">

                <div className="box">
                    <h3>about us</h3>
                    <p>HealthCity Online Pharmacy where people can buy medicines online from home and can also get video consultation with doctor.
                    HealthCity Online Pharmacy is your complete online healthcare, medicine, and wellness App which is dealing with medicines, OTC, generic medicines and video consultation with doctor.
                    Doctors can join our platform using our this app.</p>
                </div>

                {/* <div className="box">
                    <h3>quick links</h3>
                    <a href="#">home</a>
                    <a href="#">features</a>
                    <a href="#">about</a>
                    <a href="#">review</a>
                    <a href="#">pricing</a>
                    <a href="#">contact</a>
                </div> */}

                <div className="box">
                    <h3>follow us</h3>
                    <a target="_blank" href="https://www.facebook.com/healthcitybd">facebook</a>
                    {/* <a href="#">instagram</a>
                    <a href="#">pinterest</a>
                    <a href="#">twitter</a> */}
                </div>

                <div className="box">
                    <h3>contact info</h3>
                    <div className="info">
                        <i className="fas fa-phone"></i>
                        <p> 01719088528 </p>
                    </div>
                    <div className="info">
                        <i className="fas fa-envelope"></i>
                        <p> healthcity.com.bd@gmail.com </p>
                    </div>
                    <div className="info">
                        <i className="fas fa-map-marker-alt"></i>
                        <p> Chondra, Gazipur, Bangladesh </p>
                    </div>
                </div>

            </div>

            <h1 className="credit"> &copy; HealthCity </h1>

        </div>


    )
}

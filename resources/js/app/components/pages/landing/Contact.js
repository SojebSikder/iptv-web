import React from 'react'

export default function Contact() {
    return (
        <div>
            <section className="contact" id="contact">

                <div className="image">
                    <img src="images/contact-img.png" alt="" />
                </div>

                <form action="">

                    <h1 className="heading">contact us</h1>

                    <div className="inputBox">
                        <input type="text" required />
                        <label>name</label>
                    </div>

                    <div className="inputBox">
                        <input type="email" required />
                        <label>email</label>
                    </div>

                    <div className="inputBox">
                        <input type="number" required />
                        <label>phone</label>
                    </div>

                    <div className="inputBox">
                        <textarea required name="" id="" cols="30" rows="10"></textarea>
                        <label>message</label>
                    </div>

                    <input type="submit" className="btn" value="send message" />

                </form>

            </section>
        </div>
    )
}

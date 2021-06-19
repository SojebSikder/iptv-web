import React from 'react'

export default function PricingPlan() {
    return (
        <div>
            <section className="pricing" id="pricing">

                <h1 className="heading"> Our Pricing Plans </h1>

                <div className="box-container">

                    <div className="box">
                        <h3 className="title">basic</h3>
                        <div className="price">$10<span>/monthly</span></div>
                        <ul>
                            <li> <i className="fas fa-check"></i> 1000+ downloads </li>
                            <li> <i className="fas fa-check"></i> No transaction fees </li>
                            <li> <i className="fas fa-times"></i> unlimited storage </li>
                            <li> <i className="fas fa-times"></i> 5 downloads </li>
                        </ul>
                        <a href="#" className="btn">check out</a>
                    </div>

                    <div className="box">
                        <h3 className="title">standard</h3>
                        <div className="price">$15<span>/monthly</span></div>
                        <ul>
                            <li> <i className="fas fa-check"></i> 1000+ downloads </li>
                            <li> <i className="fas fa-check"></i> No transaction fees </li>
                            <li> <i className="fas fa-check"></i> unlimited storage </li>
                            <li> <i className="fas fa-times"></i> 5 downloads </li>
                        </ul>
                        <a href="#" className="btn">check out</a>
                    </div>

                    <div className="box">
                        <h3 className="title">premium</h3>
                        <div className="price">$25<span>/monthly</span></div>
                        <ul>
                            <li> <i className="fas fa-check"></i> 1000+ downloads </li>
                            <li> <i className="fas fa-check"></i> No transaction fees </li>
                            <li> <i className="fas fa-check"></i> unlimited storage </li>
                            <li> <i className="fas fa-check"></i> 5 downloads </li>
                        </ul>
                        <a href="#" className="btn">check out</a>
                    </div>

                </div>

            </section>
        </div>
    )
}

import React, { useState, useEffect } from "react";
import Slider from "react-slick";

const Certifications = () => {
    const [certifications, setCertifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCertifications = async () => {
            try {
                const response = await fetch("http://localhost:4000/certifications");
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                setCertifications(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchCertifications();
    }, []);

    const settings = {
        dots: true,
        infinite:true,
        slidesToShow: 3,
        slidesToScroll: 2,
        autoplay: true,
        speed: 800,
        arrows:false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },{
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <section className="certifications section" id="certifications">
            <h2 className="section__title">Certifications</h2>

            <Slider className="certifications__container container" {...settings} >
                {certifications.map((certificate, index) => (
                    <div key={index} className="certifications_row" >
                        <div className="certifications__content" >
                            <img  src={certificate.imageUrl} alt={certificate.title} className="certifications__image"/>
                            <h2 className="certifications__title">{certificate.title}</h2>
                        </div>

                    </div>
                ))}
            </Slider>
        </section>
    );
}

export default Certifications;

import React, { useEffect, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import '../css/banner.css';
import { Link } from 'react-router-dom';

const Banner = ({ banners }) => {
    const [currentindex, setcurrentindex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setcurrentindex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [banners]);

    const prevSlide = () => {
        setcurrentindex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
    };

    const nextSlide = () => {
        setcurrentindex((prevIndex) => (prevIndex + 1) % banners.length);
    };

    if (banners.length === 0) return <div>Loading banners...</div>;

    return (
        <div className="banner">
            <div className="container">
                <div className="detail">
                    <h4>{banners[currentindex]?.title}</h4>
                    <h3>{banners[currentindex]?.subtitle}</h3>
                    {banners[currentindex]?.price && <p>₹{banners[currentindex]?.price}</p>}
                    <Link to="/products" className="link">
                        {banners[currentindex]?.linkText} <BsArrowRight />
                    </Link>
                </div>
                <div className="img_box">
                    <img src={banners[currentindex]?.imgSrc} alt={banners[currentindex]?.subtitle} />
                </div>
            </div>
            <button className="prev" onClick={prevSlide}><GrChapterPrevious/></button>
            <button className="next" onClick={nextSlide}><GrChapterNext/></button>
        </div>
    );
};

export default Banner;

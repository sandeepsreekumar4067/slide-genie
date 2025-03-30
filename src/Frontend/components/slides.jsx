import { useEffect, useState } from 'react';
import '../style/slides.css';

const Slides = () => {
    const [slides, setSlides] = useState([]); // Store slides here

    useEffect(() => {
        const jsondata = JSON.parse(localStorage.getItem('slide-info'));
        if (jsondata && jsondata.slide_json && jsondata.slide_json.slides) {
            setSlides(jsondata.slide_json.slides);
        }
    }, []);

    return ( 
        <div className="slide-container">
            <div className="palette-container">
                {/* Palette content here */}
            </div>
            <div className="slide-viewer">
                {slides.map((slide, index) => (
                    <div key={index} className="slide-renders">
                        <h2>{slide.inputs.title}</h2>
                        {slide.inputs.subtitle && <h3>{slide.inputs.subtitle}</h3>}
                        {slide.inputs.body && <p>{slide.inputs.body}</p>}
                        {slide.inputs.image_prompt && (
                            <div className="image-placeholder">
                                <p>Image: {slide.inputs.image_prompt}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Slides;

import { useEffect, useState } from "react";
import "../style/slides.css";

const Slides = () => {
    const [slides, setSlides] = useState([]); // Store slides
    const [imageMap, setImageMap] = useState({}); // Map slide index to image filename

    useEffect(() => {
        // Load slides from localStorage
        const jsonData = JSON.parse(localStorage.getItem("slide-info"));
        if (jsonData?.slide_json?.slides) {
            setSlides(jsonData.slide_json.slides);
        }

        // Load image filenames from localStorage
        const imageData = JSON.parse(localStorage.getItem("image-info"));
        if (imageData?.images) {
            const mappedImages = {};
            imageData.images.forEach((img, i) => {
                const slideIndex = i + 1; // Slide numbers start from 1
                mappedImages[slideIndex] = img;
            });
            setImageMap(mappedImages);
        }
    }, []);

    return (
        <div className="slide-container">
            <div className="palette-container"></div>
            <div className="slide-viewer">
                {slides.map((slide, index) => {
                    const slideNumber = index + 1; // Ensure slide numbers match image filenames
                    return (
                        <div key={index} className="slide-renders">
                            <h2>{slide.inputs.title}</h2>
                            {slide.inputs.subtitle && <h3>{slide.inputs.subtitle}</h3>}
                            {slide.inputs.body && <p>{slide.inputs.body}</p>}

                            {/* Display image if available */}
                            {imageMap[slideNumber] && (
                                <img
                                    src={`src/backend/generated_pictures/${imageMap[slideNumber]}`}
                                    alt={`Slide ${slideNumber}`}
                                    className="slide-image"
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Slides;

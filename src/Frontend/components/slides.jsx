import { useEffect, useState } from "react";
import "../style/slides.css";

const Slides = () => {
    const [slides, setSlides] = useState([]);
    const [imageMap, setImageMap] = useState({});
    const [showTemplates, setShowTemplates] = useState(false);
    const [currentTemplate, setCurrentTemplate] = useState(null);

    useEffect(() => {
        const jsonData = JSON.parse(localStorage.getItem("slide-info"));
        if (jsonData?.slide_json?.slides) {
            setSlides(jsonData.slide_json.slides);
        }

        const imageData = JSON.parse(localStorage.getItem("image-info"));
        if (imageData?.images) {
            const mappedImages = {};
            imageData.images.forEach((img, i) => {
                mappedImages[i + 1] = img;
            });
            setImageMap(mappedImages);
        }
    }, []);

    const templates = [
        { id: 1, "slide-renders": "template-1-renders", "slide-image": "template-1-image" },
        { id: 2, "slide-renders": "template-2-renders", "slide-image": "template-2-image" },
        { id: 3, "slide-renders": "template-3-renders", "slide-image": "template-3-image" },
        { id: 4, "slide-renders": "template-4-renders", "slide-image": "template-4-image" },
        { id: 5, "slide-renders": "template-5-renders", "slide-image": "template-5-image" },
        { id: 6, "slide-renders": "template-6-renders", "slide-image": "template-6-image" },
        { id: 7, "slide-renders": "template-7-renders", "slide-image": "template-7-image" },
    ];

    const handleTemplateClick = (template) => {
        setCurrentTemplate(template);
        console.log("Selected Template:", template); // Print the selected template
    };

    return (
        <div className="slide-container">
            <div className="palette-container">
                <h1>Edit Slides</h1>

                <button className="template-button" onClick={() => setShowTemplates(!showTemplates)}>
                    Templates
                </button>

                {showTemplates && (
                    <div className="templates-dropdown">
                        {templates.map((template) => (
                            <div 
                                key={template.id} 
                                className="template-box" 
                                onClick={() => handleTemplateClick(template)}
                            >
                                Template {template.id}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="slide-viewer">
                {slides.map((slide, index) => {
                    const slideNumber = index + 1;
                    return (
                        <div key={index} className={currentTemplate["slide-renders"]}>
                            <h2>{slide.inputs.title}</h2>
                            {slide.inputs.subtitle && <h3>{slide.inputs.subtitle}</h3>}
                            {slide.inputs.body && <p>{slide.inputs.body}</p>}
                            {imageMap[slideNumber] && (
                                <img
                                    src={`src/backend/generated_pictures/${imageMap[slideNumber]}`}
                                    alt={`Slide ${slideNumber}`}
                                    className={currentTemplate["slide-image"]}
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

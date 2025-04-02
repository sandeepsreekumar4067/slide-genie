import { useEffect, useState } from "react";
import "../style/slides.css";
import PptxGenJS from "pptxgenjs";

const Slides = () => {
    const [slides, setSlides] = useState([]);
    const [imageMap, setImageMap] = useState({});
    const [showTemplates, setShowTemplates] = useState(false);
    const [currentTemplate, setCurrentTemplate] = useState( { id: 1, "slide-renders": "template-1-renders", "slide-image": "template-1-image" });

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

    const handleExportSlides = () => {
        let pptx = new PptxGenJS();
    
        slides.forEach((slide, index) => {
            let slidePptx = pptx.addSlide();
            let templateId = currentTemplate.id;
    
            // Set background and text color based on template
            const templateStyles = {
                1: { bgColor: "1E3C72", textColor: "FFFFFF" },
                2: { bgColor: "FFFFFF", textColor: "000000" },
                3: { bgColor: "F8F9FA", textColor: "333333" },
                4: { bgColor: "000000", textColor: "FFFFFF" },
                5: { bgColor: "FFEEDD", textColor: "663300" },
                6: { bgColor: "222831", textColor: "EEEEEE" },
                7: { bgColor: "D8E3E7", textColor: "05386B" },
            };
    
            let template = templateStyles[templateId] || templateStyles[1];
            slidePptx.background = { fill: template.bgColor };
    
            // Layouts based on selected template
            if (templateId === 1 || templateId === 2) {
                // Centered text layout
                slidePptx.addText(slide.inputs.title, {
                    x: 1,
                    y: 1,
                    w: 8,
                    h: 1,
                    align: "center",
                    color: template.textColor,
                    fontSize: 24,
                    bold: true,
                });
    
                slidePptx.addText(slide.inputs.body, {
                    x: 1,
                    y: 2,
                    w: 8,
                    h: 3,
                    align: "center",
                    color: template.textColor,
                    fontSize: 18,
                });
    
                if (imageMap[index + 1]) {
                    slidePptx.addImage({
                        path: `src/backend/generated_pictures/${imageMap[index + 1]}`,
                        x: 2,
                        y: 4,
                        w: 6,
                        h: 3,
                    });
                }
            } 
            else if (templateId === 3 || templateId === 4) {
                // Left image, right text OR Right image, left text
                let isLeftImage = templateId === 3;
    
                if (imageMap[index + 1]) {
                    slidePptx.addImage({
                        path: `src/backend/generated_pictures/${imageMap[index + 1]}`,
                        x: isLeftImage ? 0.5 : 4.5,
                        y: 1,
                        w: 4,
                        h: 3,
                    });
                }
    
                slidePptx.addText(slide.inputs.title, {
                    x: isLeftImage ? 5 : 0.5,
                    y: 1,
                    w: 4,
                    h: 1,
                    align: "left",
                    color: template.textColor,
                    fontSize: 24,
                    bold: true,
                });
    
                slidePptx.addText(slide.inputs.body, {
                    x: isLeftImage ? 5 : 0.5,
                    y: 2,
                    w: 4,
                    h: 3,
                    align: "left",
                    color: template.textColor,
                    fontSize: 18,
                });
            } 
            else if (templateId === 5 || templateId === 6 || templateId === 7) {
                // Other unique layouts
                slidePptx.addText(slide.inputs.title, {
                    x: 1,
                    y: 0.5,
                    w: 8,
                    h: 1,
                    align: "center",
                    color: template.textColor,
                    fontSize: 26,
                    bold: true,
                });
    
                slidePptx.addText(slide.inputs.subtitle, {
                    x: 1,
                    y: 1.5,
                    w: 8,
                    h: 1,
                    align: "center",
                    color: template.textColor,
                    fontSize: 20,
                    italic: true,
                });
    
                slidePptx.addText(slide.inputs.body, {
                    x: 1,
                    y: 2.5,
                    w: 8,
                    h: 3,
                    align: "center",
                    color: template.textColor,
                    fontSize: 18,
                });
    
                if (imageMap[index + 1]) {
                    slidePptx.addImage({
                        path: `src/backend/generated_pictures/${imageMap[index + 1]}`,
                        x: 2,
                        y: 5.5,
                        w: 6,
                        h: 3,
                    });
                }
            }
        });
    
        // Save & Download the PPTX
        pptx.writeFile({ fileName: "Generated_Presentation.pptx" });
    };
    
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
                 <button className="template-button" onClick={handleExportSlides}>
                    Export Slides
                </button>
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

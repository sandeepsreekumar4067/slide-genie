import { useEffect } from 'react';
import '../style/slides.css'
const Slides = () => {
    // const [slides,setSlides] = useState({})
    useEffect(()=>{
        
    })
    return ( 
        <div className="slide-container">
            <div className="palette-container">

            </div>
            <div className="slide-viewer">
                <div className="slide-renders"></div>
                <div className="slide-renders"></div>

                <div className="slide-renders"></div>

                <div className="slide-renders"></div>


            </div>
        </div>
     );
}
 
export default Slides;
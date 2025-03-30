import { useEffect } from 'react';
import '../style/slides.css'
const Slides = () => {
    // const [slides,setSlides] = useState({})
    useEffect(()=>{
        const slideDetails = JSON.parse(localStorage.getItem('slide-info'))
        console.log(slideDetails);
        
    })
    return ( 
        <div className="slide-container">
            hello
        </div>
     );
}
 
export default Slides;
import '../style/home.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import {ScrollTrigger} from 'gsap/ScrollTrigger'
// gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)
const Home = () => {
    useGSAP(()=>{
        gsap.from('.detail-container',{
            xPercent:-100,
            duration:1,
            opacity:0,
            ease:'power3.inOut'
        })
        gsap.from('.detail-title',{
            duration:1.5,
            opacity:0,
            xPercent:-100,
            ease:'power3.inOut'
        })
        gsap.from('.detail-description',{
            duration:2,
            opacity:0,
            xPercent:-100,
            ease:'power3.inOut'
        })
        gsap.from('#inpbtn',{
            duration:2.2,
            opacity:0,
            scale:0,
            ease:'power3'
        })
        gsap.from('.st-words',{
            duration:1,
            stagger:0.3,
            yPercent:-100,
            opacity:0,
            ease:'power4.inOut',
            scrollTrigger:{
                trigger:'.second-container',
                start:"top 60%",
            }
        })
        gsap.from('.second-description',{
            duration:1,
            y:'-5rem',
            opacity:0,
            scrollTrigger:{
                trigger:'.second-container',
                start:"top 55%",
            }
        })
        gsap.from('.third-title',{
            duration:1,
            xPercent:-100,
            opacity:0,
            ease:'power4.inOut',
            scrollTrigger:{
                trigger:'.third-container',
                start:"top 65%",
            }
        })
        gsap.from('.td-containers',{
            duration:1,
            stagger:0.3,
            yPercent:-100,
            opacity:0,
            ease:'power4.inOut',
            scrollTrigger:{
                trigger:'.third-description',
                start:"top 60%",
            }
        })
    },[])
    return ( 
        <div className="home-container">
            <div className="initial-container">
                <div className="detail-container">
                    <div className="detail-title">Craft Stunning Presentations</div>
                    <input type="button" value="Get Started" id='inpbtn'/>
                    <div className="detail-description">Welcome to Slide Genie, where creating dynamic presentations is just a few clicks away. Let your ideas shine with our intuitive slide generation tool.</div>
                </div>
            </div>
            <div className="second-container">
                <div className="second-title">
                    <span className='st-words' >Discover</span> <span className='st-words' >the</span> <span className='st-words' >Magic</span> <span className='st-words' >Behind</span> <span className='st-words' >Slide</span> <span className='st-words' >Genie</span>
                </div>
                <div className="second-description">
                At Slide Genie, we believe in the power of seamless presentation creation. Our AI-powered platform allows users to transform their thoughts into captivating slides effortlessly. Join us on this journey of innovation and creativity.
                </div>
            </div>
            <div className="third-container">
                <div className="third-title">
                    Our Offerings
                </div>
                <div className="third-description">
                    <div className='td-containers'>Customization <span>Tailored Solutions</span></div>
                    <div className='td-containers'>Efficiency <span>Tailored Solutions</span></div>
                    <div className='td-containers'>Creativity <span>Tailored Solutions</span></div>
                    <div className='td-containers'>Support <span>Tailored Solutions</span></div>
                </div>
                <div className="get-started">
                    <input type="button" value="Get Started" />
                </div>
            </div>
        </div>
     );
}
 
export default Home;
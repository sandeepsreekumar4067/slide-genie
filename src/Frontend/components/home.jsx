import '../style/home.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP)
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
    })
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
                    Discover the Magic Behind Slide Genie
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
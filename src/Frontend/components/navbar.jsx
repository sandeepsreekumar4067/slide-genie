import '../style/navbar.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import {ScrollTrigger} from 'gsap/ScrollTrigger'
// gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)
const NavBar = () => {
    useGSAP(()=>{
        gsap.from('.navbar-container',{
            duration:1,
            y:'-5rem',
            opacity:0,
            ease:'power3.inOut'
        })
        gsap.from('.nb-spn',{
            duration:2,
            stagger:0.3,
            opacity:0,
            ease:'power3.inOut'
        })
    },[])
    return ( 
        <div className="navbar-container">
            <span className='nb-spn'>About</span>
            <span className='nb-spn'>Create</span>
            <span className='nb-spn'>Source Code</span>
        </div>
     );
}
 
export default NavBar;
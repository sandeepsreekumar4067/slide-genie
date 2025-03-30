import { useState } from 'react';
import '../style/promptpage.css'
import { useNavigate } from 'react-router-dom';




const PromptPage = () => {
    const navigate = useNavigate()
    const [prompt,setPrompt] = useState('')
    const [slide,setSlide] = useState(0)
    const updatePrompt = (event)=>{
        setPrompt(event.target.value)
    }
    const updateSlide = (event) =>{
        setSlide(event.target.value)
    }
    const fetchData = ()=>{
        fetch('http://127.0.0.1:5000/generate',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title:prompt,
                number:slide
            })
        }).then((response)=>{
            if(response.ok){
                return response.json()
            }
            else{
                throw new Error(`error status : ${response.status}`)
            }
        }).then((data)=>{
            localStorage.setItem('slide-info',JSON.stringify(data))
            navigate('/slides')
        }).catch((e)=>{
            console.log("error",e);
        })
    }
    return ( 
        <div className="prompt-page">
            <div className="prompt-container">
                <input type="text" placeholder="Enter the prompt" onChange={updatePrompt} />
                <input type="number" placeholder='no of slides' onChange={updateSlide}/>
                <input type="button" value="Generate" onClick={()=>{fetchData()}}/>
            </div>
        </div>
     );
}
 
export default PromptPage;
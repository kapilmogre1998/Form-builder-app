import React, { useEffect } from 'react'
import traingleShape from '../../assets/traingle-shape.png';
import semicircleShape from '../../assets/semicircle-shape.png';
import dummyImage from '../../assets/dummy-flow.png';
import {useNavigate} from 'react-router-dom';
import './HomePage.scss'

const HomePage = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){
            navigate('/form-dashboard')
        }
    },[])
    
    return (
        <div className='home-page-container' >
            <header className='home-page-header' >
                <div className='header-left' >
                    <svg width="28" height="28" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M31.5 0.5H3.5C1.567 0.5 0 2.067 0 4V32C0 33.933 1.567 35.5 3.5 35.5H31.5C33.433 35.5 35 33.933 35 32V4C35 2.067 33.433 0.5 31.5 0.5Z" fill="#0042DA" />
                        <path d="M28.4375 16.1827V14.1934C28.4375 13.7101 28.0457 13.3184 27.5625 13.3184H12.4855C12.0023 13.3184 11.6105 13.7101 11.6105 14.1934V16.1827C11.6105 16.6659 12.0023 17.0577 12.4855 17.0577H27.5625C28.0457 17.0577 28.4375 16.6659 28.4375 16.1827Z" fill="#FF8E20" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.43216 17.0577C9.46474 17.0577 10.3018 16.2206 10.3018 15.188C10.3018 14.1554 9.46474 13.3184 8.43216 13.3184C7.39957 13.3184 6.5625 14.1554 6.5625 15.188C6.5625 16.2206 7.39957 17.0577 8.43216 17.0577Z" fill="#FF8E20" />
                        <path d="M6.5625 19.8027V21.792C6.5625 22.2752 6.95425 22.667 7.4375 22.667H22.5145C22.9977 22.667 23.3895 22.2752 23.3895 21.792V19.8027C23.3895 19.3194 22.9977 18.9277 22.5145 18.9277H7.4375C6.95425 18.9277 6.5625 19.3194 6.5625 19.8027Z" fill="white" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M26.5679 18.9277C25.5353 18.9277 24.6982 19.7648 24.6982 20.7974C24.6982 21.83 25.5353 22.6671 26.5679 22.6671C27.6005 22.6671 28.4376 21.83 28.4376 20.7974C28.4376 19.7648 27.6005 18.9277 26.5679 18.9277Z" fill="white" />
                    </svg>
                    <div>FormBot</div>
                </div>
                <div className='header-right' >
                    <button className='sign-in-button' onClick={() => navigate('/login')} >Sign in</button>
                    <button className='create-formbot-button' onClick={() => navigate('/login')} >Create a FormBot</button>
                </div>
            </header>

            <section className='home-page-content' >
                <div className='heading' >
                    <div>Build advanced chatbots <br />visually </div>
                    <div>
                        Typebot gives you powerful blocks to create unique chat experiences. <br /> Embed them
                        anywhere on your web/mobile apps and start collecting results like magic.
                    </div>
                    <button onClick={() => navigate('/login')} >Create a FormBot  for free</button>
                </div>
                <img className='left-image' src={traingleShape} alt="" />
                <img className='right-image' src={semicircleShape} alt="" />
            </section>

            <img className='dummy-image' src={dummyImage} alt="" />

            <footer className='footer-container' >
                <div>
                    <div className='logo text-bold' >
                        <svg width="28" height="28" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M31.5 0.5H3.5C1.567 0.5 0 2.067 0 4V32C0 33.933 1.567 35.5 3.5 35.5H31.5C33.433 35.5 35 33.933 35 32V4C35 2.067 33.433 0.5 31.5 0.5Z" fill="#0042DA" />
                            <path d="M28.4375 16.1827V14.1934C28.4375 13.7101 28.0457 13.3184 27.5625 13.3184H12.4855C12.0023 13.3184 11.6105 13.7101 11.6105 14.1934V16.1827C11.6105 16.6659 12.0023 17.0577 12.4855 17.0577H27.5625C28.0457 17.0577 28.4375 16.6659 28.4375 16.1827Z" fill="#FF8E20" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.43216 17.0577C9.46474 17.0577 10.3018 16.2206 10.3018 15.188C10.3018 14.1554 9.46474 13.3184 8.43216 13.3184C7.39957 13.3184 6.5625 14.1554 6.5625 15.188C6.5625 16.2206 7.39957 17.0577 8.43216 17.0577Z" fill="#FF8E20" />
                            <path d="M6.5625 19.8027V21.792C6.5625 22.2752 6.95425 22.667 7.4375 22.667H22.5145C22.9977 22.667 23.3895 22.2752 23.3895 21.792V19.8027C23.3895 19.3194 22.9977 18.9277 22.5145 18.9277H7.4375C6.95425 18.9277 6.5625 19.3194 6.5625 19.8027Z" fill="white" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M26.5679 18.9277C25.5353 18.9277 24.6982 19.7648 24.6982 20.7974C24.6982 21.83 25.5353 22.6671 26.5679 22.6671C27.6005 22.6671 28.4376 21.83 28.4376 20.7974C28.4376 19.7648 27.6005 18.9277 26.5679 18.9277Z" fill="white" />
                        </svg>
                        <div>FormBot</div>
                    </div>
                    <div>Made with by</div>
                    <div>@kapil</div>
                </div>
                <div>
                    <div className='text-bold' >Product</div>
                    <div className='gap-1' >
                        <div>Status</div>
                        <div>Documentation</div>
                        <div>Roadmap</div>
                        <div>Pricing</div>
                    </div>
                </div>
                <div>
                    <div className='text-bold' >Community</div>
                    <div className='gap-1' >
                        <div>Discord</div>
                        <div>Github repository</div>
                        <div>Twitter</div>
                        <div>Linkedin</div>
                        <div>OSS Friends</div>
                    </div>
                </div>
                <div>
                    <div className='text-bold' >Company</div>
                    <div className='gap-1' >
                        <div>About us</div>
                        <div>Contact</div>
                        <div>Terms of Service</div>
                        <div>Privacy Policy</div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default HomePage
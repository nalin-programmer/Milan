// This is the donate page where we come and select clubs to donate an amount !

import React, { useEffect, useState } from 'react'
import donate_image1 from "../assets/pictures/donate_image1.svg"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import SingleClub from '../components/SingleClub'
import { GetAllClubs } from '../service/MilanApi'
import "../styles/Donate.css"

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Donate = () => {
    document.title = "Milan | Donate the needy";

    const [clubData, setClubData] = useState([]);

    useEffect(() => {
        const fetchClubData = async () => {
            const response = await GetAllClubs();
            setClubData(response);
        };
        fetchClubData();
    }, []);


    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    useEffect(() => {
        loadScript("https://checkout.razorpay.com/v1/checkout.js");
    });


    return (
        <>

            <Navbar />

            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                closeButton={false}
            />

            <div id="donate_banner"
                className="container"
            >

                <div id="donateCol2">
                    <img src={donate_image1} alt="" className="donate_img" />
                </div>


                <div
                    id="donatecol_1"
                    className="d-flex flex-column justify-content-center align-items-start me-5"
                >
                    <h1 className="mb-4">Yes, you help live !!</h1>
                    <p>Donations does play an important part as our annual funds, donations from your ends helps thousands of unfortunate people live their lives. </p>{" "}

                    <p>Choose any club, donate whatever you want, even 5 rupees helps !</p>


                </div>

            </div>


            <hr className="container" />

            <div className="cards justify-content-center">
                {clubData.map((club) => {
                    return <SingleClub key={club._id} club={club} />;
                })}
            </div>
            <Footer />
        </>
    )
}

export default Donate
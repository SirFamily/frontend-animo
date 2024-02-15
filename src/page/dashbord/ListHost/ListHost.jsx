import React, { useEffect, useState } from "react";
import DashCss from "../dashbordCss/DashCss.module.css";
import axios from "axios";
//import HostDetails from "./HostDetails"; // Import the new component

export default function ListHost(props) {
  const {userId}= props
    const [hostData, setHostData] = useState([]);
    const [selectedHost, setSelectedHost] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `http://localhost:8112/host/host/${userId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setHostData(response.data);
            } catch (error) {
                console.error("Error fetching host data:", error);
            }
        };

        getData();
    }, []);
    
    const handleHostClick = (host) => {
        setSelectedHost(host);
    };

    console.log(hostData)
    if(hostData != null ){
      console.log("1234564878",hostData)
    }
    return (
        <>
            {hostData.length > 0 ? (
                hostData.map((data) => (
                    <div key={data.id} className={DashCss.listPet}>
                        <div
                            className={DashCss.descPet}
                            style={{
                                background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.00) 100%), url(${
                                  data.description ||
                                    "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
                                }) lightgray 50% / cover no-repeat`,
                            }}
                            onClick={() => handleHostClick(data)}
                        >
                            <div className={DashCss.text}>{data?.hostName}</div>
                        </div>
                    </div>
                ))
            ) : (
                <div className={DashCss.listPet}>
                    <div className={DashCss.AddPet} style={{}}>
                        <div className={DashCss.add}>+</div>
                        <div className={DashCss.text} style={{ color: `#A4D9E0` }}>
                            เพิ่มที่พักสำหรับคุณ
                        </div>
                    </div>
                </div>
            )
            }
    
            {/* {selectedHost && (
                <HostDetails host={selectedHost} onClose={() => setSelectedHost(handleHostClick)} />
            )} */}
        </>
    );
}



  
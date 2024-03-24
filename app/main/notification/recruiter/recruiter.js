"use server"
import { getRecruitersNotification } from "@/service/notification";
import React from "react";

const RecruiterNotification = async () => {
  const notificationData = await getRecruitersNotification();
  return (
    <div className="container" style={{marginTop : 100}}>
        <h2>Hire</h2>
      {notificationData.map((item) => (
        <div key={item.id}>
            
            <div className="card my-2">
                <div className="card-body">
                <h3 className = "card-title">{item.message_purpose}</h3>
                    <h5 className="card-subtitle">{item.worker_name}</h5>
                    <p className="card-text">{item.worker_phone}</p>
                    
                    
                </div>
            </div>
        </div>
      ))}
    </div>
  );
};

export default RecruiterNotification;

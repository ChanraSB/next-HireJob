"use server"
import { getWorkersNotification } from '@/service/notification'
import React from 'react'

const WorkerNotification = async() => {
    const notificationData = await getWorkersNotification()
  return (
    <div className="container" style={{marginTop : 100}}>
    <h2>Notifikasi</h2>
  {notificationData.map((item) => (
    <div key={item.id}>
        
        <div className="card my-2">
            <div className="card-body">
            <h3 className = "card-title">{item.message_purpose}</h3>
                <h5 className="card-subtitle">{item.recruiter_company}</h5>
                
                <p className="card-text">{item.phone_request_hire}</p>
                
                
            </div>
        </div>
    </div>
  ))}
</div>
  )
}

export default WorkerNotification
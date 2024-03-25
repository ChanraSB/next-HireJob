"use client"
import React, {useState, useEffect}from 'react'

import { FaUser } from "react-icons/fa";
import HireForm from '@/component/module/form/formHire';
import { getWorkerById, getSkillsWorkers } from '@/service/workerClient';
const Hire =  ({params}) => {
  const id = params.id;
  const [profileData, setProfileData] = useState({});
  const [skillsData, setSkillsData] = useState([]);

  useEffect(() => {
    getWorkerById(id)
      .then(worker => {
        setProfileData(worker);
      })
      .catch(error => {
        console.error("Error fetching worker:", error);
      });
  }, [id]);

  useEffect(() => {
    getSkillsWorkers(id)
      .then(skills => {
        setSkillsData(skills);
      })
      .catch(error => {
        console.error("Error fetching skills:", error);
      });
  }, [id]);

  return (
    <div style={{ marginTop: "60px", position: "relative" }}>
      <div
        style={{
          background: "#5E50A1",
          height: "300px",
          width: "100%",
          position: "absolute",
          top: "0",
          zIndex: "-1",
        }}
      ></div>
      <div className="container" style={{ paddingTop: "50px" }}>
        <div className="row row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2 d-flex justify-content-center ">
          
            <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 d-flex justify-content-center">
              {profileData && (
                <div className="card py-3" style={{ width: "80%", borderRadius: "10px" }}>
                <div className="card-img" style={{ boxSizing: "border-box", width: "100px", height: "100px", marginLeft: "auto", marginRight: "auto", borderRadius: "50%" }}>
                  {profileData.photo ? <img src={profileData.photo} className="card-img " style={{ width: "100%", height: "100%", objectFit : "cover", borderRadius : "50%" }} /> : <FaUser className="card-img " style={{ width: "100%", height: "auto", borderRadius: "50%", color: "#9EA0A5" }} />}
                </div>
                <div className="card-body">
                  <h4 className="card-title ">{profileData.name || "-"}</h4>
                  <p className="card-subtitle text-secondary">{profileData.workplace || "-"}</p>
                  <p className="card-subtitle text-secondary">{profileData.domicile || "-"}</p>
                  
                  <p className="card-text text-secondary mt-2">{profileData.description || "-"}</p>
                  
                  
                  <h4 className="mt-3">Skill</h4>
                  
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {skillsData.map((item) => (
                    <div key={item.id} className=" text-center bg-warning me-2 py-2 px-3 mb-2" style={{ color: "white", display: "flex", flexWrap: "wrap" }}>
                      {item.skill_name}
                    </div>
                  ))}
                </div>
                </div>
              </div>
              )}
            </div>
          

          <div
            className="col-sm-12 col-md-12 col-lg-8 col-xl-8  pt-4 px-4"
            style={{ borderRadius: "10px", background: "white" }}
          >
            <h3 style={{ color: "#1F2A36" }}>Hubungi {profileData?.name}</h3>
            <p className='mt-4'>Jangan ragu untuk menghubungi {profileData?.name} hari ini untuk memulai percakapan yang mengarah ke kesuksesan bersama!</p>
          <HireForm id={id}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hire
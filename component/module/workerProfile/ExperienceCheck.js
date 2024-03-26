"use client"
import React, {useState, useEffect} from "react";
import CardExp from "../cardExp/CardExp";
import { getExperienceById } from "@/service/workerClient";

const Experience = ({id}) => {
  const [experience, setExperience] = useState([])
 const fetchExperienceById = async () => {
  try {
    const data = await getExperienceById(id)
setExperience(data)
  } catch (error) {
    console.log(error)
  }
 }
 useEffect(() => {
  fetchExperienceById()
 }, [])
  return (
    <div>
      {experience && experience.map((item) => (
    <CardExp key={item.id} company={item.company} position={item.position} month={item.work_month} year={item.work_year} desc={item.created_at}>
      
    </CardExp>
  ))}
   
      
    </div>
  );
};

export default Experience;

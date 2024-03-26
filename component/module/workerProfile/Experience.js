"use client"
import React, {useEffect, useState} from "react";
import CardExp from "../cardExp/CardExp";
import { getExp } from "@/service/profile";
const Experience = () => {
  const [exp, setExp] = useState("")

  const getExperience = async() => {
    try {
      const response = await getExp()
      setExp(response)
    } catch (error) {
      console.log(error)
    }
  }
useEffect(() => {getExperience()}
,[])
  return (
    <div>
     {exp && exp.map((item) => (
    <CardExp key={item.id} company={item.company} position={item.position} month={item.work_month} year={item.work_year} desc={item.created_at}>
      
    </CardExp>
  ))}
      
     
    </div>
  );
};

export default Experience;

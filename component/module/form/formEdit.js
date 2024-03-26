"use client";
import Input from "@/component/base/input/input";
import React, { useState, useEffect } from "react";
import Button from "@/component/base/button/button";
import FormSkill from "./formSkill";
import { useRouter } from "next/navigation";
import { editProfile, editExp, getExp, deleteExp } from "@/service/profile";
import CardExp from "../cardExp/CardExp";
const EditForm = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    name: "",
    job_desk: "",
    domicile: "",
    workplace: "",
    description: "",
  });
  const onChange = (e) => {
    setValues((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };
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
  const [experience, setExperience] = useState({
    position : "",
    company : "",
    work_month : "",
    work_year : "",
    description : "",
  })
  const onChangeExp = (e) => {
    setExperience((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };
  const handleEditProfile = async (e) => {
    try {
      e.preventDefault();
      await editProfile(values);
      router.push(`/main/profile`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditExperience = async (e) => {
    try {
      e.preventDefault()
      await editExp(experience)
      getExperience()
      // setExperience("")
    } catch (error) {
      console.log(error)
    }
  }
  const handleDeleteExperience = async (id) => {
    try {
      await deleteExp(id)
      getExperience()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div className="container">
        <h4>Data diri</h4>
        <hr />
        <form onSubmit={handleEditProfile}>
          <Input className="form-control" type="text" name="name" label="Nama Lengkap" placeholder="Masukkan nama lengkap" id="name" onChange={onChange} value={values.name} />
          <Input className="form-control" type="text" name="job_desk" label="Job Desk." placeholder="Masukkan Job Desk." id="jobDesc" onChange={onChange} value={values.jobDesc} />
          <Input className="form-control" type="text" name="domicile" label="Domisili" placeholder="Masukkan Domisili" id="address" onChange={onChange} value={values.domicile} />
          <Input className="form-control" type="text" name="workplace" label="Tempat Kerja" placeholder="Masukkan tempat kerja" id="companyAddress" onChange={onChange} value={values.workplace} />
          <label className="form-label mt-4" htmlFor="desc" style={{ color: "#9EA0A5" }}>
            Deskrpsi Singkat
          </label>
          <textarea id="desc" className="form-control" name="description" placeholder="Masukkan deskripsi singkat" value={values.description} onChange={onChange}></textarea>
          <Button className="mt-3" child="Simpan" style={{ backgroundColor: "#FBB017", color: "#fff", width: "100%" }} />
        </form>
      </div>
      <div className="container mt-3">
        <FormSkill />
      </div>
      <div className="container mt-3">
        <h4>Pengalaman kerja</h4>
        <hr />
        <div>
  {exp && exp.map((item) => (
    <CardExp key={item.id} company={item.company} position={item.position} month={item.work_month} year={item.work_year} desc={item.created_at}>
      <Button child= "delete" style={{backgroundColor: "#FBB017", color: "#fff", position : "absolute", top : 0, right : 0}} onClick={() => handleDeleteExperience(item.id)}/>
    </CardExp>
  ))}
</div>
        <form onSubmit={handleEditExperience}>
          <div className="row row-cols-2 mt-2">
            <div className="col-12">
              <Input className="form-control" type="text" name="position" label="Posisi" placeholder="Cth : Web Developer" onChange={onChangeExp} value={experience.position} />
            </div>
            <div className="col-6">
              <Input className="form-control" type="text" name="company" label="Nama perusahaan" placeholder="Cth : PT. Harus bisa" onChange={onChangeExp} value={experience.company}/>
            </div>
            <div className="col-3">
              <Input className="form-control" type="text" name="work_month" label="Bulan" placeholder="Cth : Januari" onChange={onChangeExp} value={experience.work_month}/>
            </div>
            <div className="col-3">
              <Input className="form-control" type="text" name="work_year" label="Tahun" placeholder="Cth : 2018" onChange={onChangeExp} value={experience.work_year}/>
            </div>
            <div className="col-12">
              <label className="form-label mt-4" htmlFor="desc" style={{ color: "#9EA0A5" }}>
                Deskrpsi Singkat
              </label>
              <textarea id="desc" name="description" className="form-control" placeholder="Masukkan deskripsi singkat" onChange={onChangeExp} value={experience.description}></textarea>
              <hr />
            </div>

            <div className="col-12">
              <Button className="btn-outline-warning py-3" child="Simpan" style={{ width: "100%" }} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;

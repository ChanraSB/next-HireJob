"use client";
import React, {useEffect, useState} from "react";

import { FaUser } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Button from "@/component/base/button/button";
import Input from "@/component/base/input/input";
import {getProfileRecruiter} from "@/service/recruiterClient";
import { useRouter } from "next/navigation";
import {  editProfileRecruiter } from "@/service/profile";
import { addAsset } from "@/service/asset";
const EditProfileRecruiter = () => {
    const router = useRouter();
    const [image, setImage] = useState(null);
  const [saveImage, setSaveImage] = useState("");
    const [profileData, setProfileData] = useState("");
    const [values, setValues] = useState({
        company: "",
        position: "",
        city: "",
        description: "",
        phone: "",
        instagram: "",
        linkedin: "",
        photo: ""
      });
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getProfileRecruiter();
         await setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);
  const onChange = (e) => {
    setValues((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };
  const handleUploadChange = (e) => {
    let uploaded = e.target.files[0];
    setImage(URL.createObjectURL(uploaded));
    setSaveImage(uploaded);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const form = new FormData();
      form.append("file", saveImage);
      const asset = await addAsset(form);
      console.log("image ", asset);
      await editProfileRecruiter({
        ...values,
        photo: asset,
      });
      fetchProfileData()
      
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div style={{ marginTop: "60px", position: "relative" }}>
      <div style={{ background: "#5E50A1", height: "300px", width: "100%", position: "absolute", top: "0", zIndex: "-1" }}></div>
      <div className="container" style={{ paddingTop: "50px" }}>
        <div className="row row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2 d-flex justify-content-center ">
          <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 d-flex justify-content-center">
          <div className="card py-3" style={{ width: "80%", height: "fit-content", borderRadius: "10px" }}>
      <div className="card-img" style={{ boxSizing: "border-box", width: "100px", height: "100px", marginLeft: "auto", marginRight: "auto", borderRadius: "50%" }}>
        {profileData && profileData.photo ? (
          <img src={profileData.photo || image}  className="card-img " style={{ width: "100%", height: "100%", objectFit : "cover", borderRadius : "50%" }} />
        ) : (
          <FaUser className="card-img " style={{ width: "100%", height: "auto", borderRadius: "50%", color: "#9EA0A5" }} />
        )}
      </div>
      <div className="d-flex justify-content-center mt-3" style={{ color: "#9EA0A5" }}>
        <MdEdit />
        Edit
      </div>
      <div className="card-body">
        <h4 className="card-title ">{profileData ? profileData.company || "-" : "-"}</h4>
        <p className="card-subtitle text-secondary">{profileData ? profileData.position || "-" : "-"}</p>
        <p className="card-subtitle text-secondary">{profileData ? profileData.city || "-" : "-"}</p>
        <Button className="mt-3" child="Kembali" style={{ color: "#5E50A1", backgroundColor: "#fff", width: "100%", border : "1px solid #5E50A1" }} onClick={() => router.push(`/main/profile`)}/>
      </div>
    </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8  pt-4 px-4" style={{ borderRadius: "10px", background: "white" }}>
          <div>
      <div className="container">
        <h4>Data diri</h4>
        <hr />
        <form onSubmit={handleSubmit}>
          <Input className="form-control" type="text" name="company" label="Company Name" placeholder="Masukkan Nama Perusahaan" id="name" onChange={onChange} value={values.company} />
          <Input className="form-control" type="text" name="position" label="Position" placeholder="Masukkan Posisi" id="jobDesc" onChange={onChange} value={values.position} />
          <Input className="form-control" type="text" name="city" label="City" placeholder="Masukkan Kota" id="address" onChange={onChange} value={values.city} />
          <Input className="form-control" type="number" name="phone" label="Phone Number" placeholder="Masukkan Nomor Telepon" id="companyAddress" onChange={onChange} value={values.phone} />
          <Input className="form-control" type="text" name="instagram" label="Instagram" placeholder="Masukkan Instagram" id="companyAddress" onChange={onChange} value={values.instagram} />
          <Input className="form-control" type="text" name="linkedin" label="LinkedIn" placeholder="Masukkan LinkedIn" id="companyAddress" onChange={onChange} value={values.linkedin} />
          <Input className="form-control" type="file" name="photo" label="Photo" placeholder="Masukkan Photo" id="companyAddress" onChange={handleUploadChange} value={values.photo} />
          <label className="form-label mt-4" htmlFor="desc" style={{ color: "#9EA0A5" }}>
            Deskrpsi Singkat
          </label>
          <textarea id="desc" className="form-control" name="description" placeholder="Masukkan deskripsi singkat" value={values.description} onChange={onChange}></textarea>
          <Button className="mt-3" child="Simpan" style={{ color: "white", backgroundColor: "#5E50A1", width: "100%" }} />
        </form>
      </div>
      
    </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileRecruiter;



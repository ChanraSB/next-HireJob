"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDriveFolderUpload } from "react-icons/md";
import Button from "@/component/base/button/button";
import { getProfileWorkers } from "@/service/workerClient";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";

import Input from "@/component/base/input/input";
import { editImage } from "@/service/profile";
const CardEditProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [savePhoto, setSavePhoto] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const fetchProfile = async () => {
    try {
      const response = await getProfileWorkers();
      setProfileData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  const handleUploadChange = (e) => {
    let uploaded = e.target.files[0];
    setPhoto(URL.createObjectURL(uploaded));
    setSavePhoto(uploaded);
  };

  const handleEditPhoto = async (e) => {
    try {
      e.preventDefault();
      if (!savePhoto) {
        console.log("Please select an image.");
        return;
      }
      const formData = new FormData();
      formData.append("photo", savePhoto);
      await editImage(formData);
      fetchProfile();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="card py-3"
      style={{ width: "80%", height: "fit-content", borderRadius: "10px" }}
    >
      <div
        className="card-img"
        style={{
          boxSizing: "border-box",
          width: "100px",
          height: "100px",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "50%",
        }}
      >
        {profileData && profileData.photo ? (
          <img
            src={profileData.photo}
            className="card-img "
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        ) : (
          <FaUser
            className="card-img "
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "50%",
              color: "#9EA0A5",
            }}
          />
        )}
      </div>
      <div
        className="d-flex justify-content-center mt-3"
        style={{ color: "#9EA0A5" }}
        onClick={handleShow}
      >
        <MdEdit />
        Edit
      </div>
      <div className="card-body">
        <h4 className="card-title " style={{color : "#1F2A36",  fontWeight : "bolder"}}>
          {profileData ? profileData.name || "-" : "-"}
        </h4>
        <p className="card-subtitle text-secondary" style={{color : "#1F2A36",  fontWeight : "bold"}}>
          {profileData ? profileData.job_desk || "-" : "-"}
        </p>
        <p className="card-subtitle text-secondary mt-2">
          {profileData ? profileData.domicile || "-" : "-"}
        </p>
        <p className="card-subtitle text-secondary mt-2">
          {profileData ? profileData.workplace || "-" : "-"}
        </p>
        
        <Link href="/main/profile">
          <Button
            className="mt-2"
            child="Batal"
            style={{
              color: "#5E50A1",
              backgroundColor: "white",
              border: "1px solid #5E50A1 ",
              width: "100%",
            }}
          />
        </Link>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>update Your Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={`container d-flex justify-content-center align-items-center`}>
            <form onClick={() => document.querySelector(".image").click()}>
              {photo ? (
                <img src={photo} style={{ width: "100%", height: "100%" }} />
              ) : (
                <MdDriveFolderUpload />
              )}
              <Input
                className="image"
                name="photo"
                type="file"
                placeholder="upload an Image"
                required={true}
                onChange={handleUploadChange}
                hidden
              />
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button child="cancel" onClick={handleClose} style={{
              color: "#5E50A1",
              backgroundColor: "white",
              border: "1px solid #5E50A1 ",
              width: "100%",
            }}>
            Close
          </Button>
          <Button child="save" onClick={handleEditPhoto} style={{ color: "white", backgroundColor: "#5E50A1", width: "100%" }}></Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CardEditProfile;

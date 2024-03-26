"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "@/component/base/button/button";
import Input from "@/component/base/input/input";

import { MdCloudUpload } from "react-icons/md";
import { addPortfolio, getPortfolio } from "@/service/portfolio";
import { addAsset } from "@/service/asset";

const AddNewPortofilio = (props) => {
  const { show, onHide, onGetPortfolio } = props;
  const [image, setImage] = useState(null);
  const [saveImage, setSaveImage] = useState("");
  const [values, setValues] = useState({
    application_name: "",
    link_repository: "",
    application: "",
    image: "",
  });
  const handleUploadChange = (e) => {
    let uploaded = e.target.files[0];
    setImage(URL.createObjectURL(uploaded));
    setSaveImage(uploaded);
  };

  const onChange = (e) => {
    setValues((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };
 
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const form = new FormData();
      form.append("file", saveImage);
      const asset = await addAsset(form);
      console.log("image ", asset);
      await addPortfolio({
        ...values,
        image: asset,
      });
      onGetPortfolio()
      onHide();
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Portofolio</Modal.Title>
          <hr />
        </Modal.Header>
        <Modal.Body>
          <form>
            <Input className="form-control" type="text" label="Nama aplikasi" placeholder="Masukkan nama aplikasi" name="application_name" onChange={onChange} />
            <Input className="form-control" type="text" label="Link repository" placeholder="Masukkan link repository" name="link_repository" onChange={onChange} />
            <p className="mt-4" style={{ color: "#9EA0A5" }}>
              Type portofolio
            </p>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="application" id="flexRadioDefault1" value="Aplikasi Mobile" onChange={onChange} />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Aplikasi Mobile
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="application" id="flexRadioDefault2" value="Aplikasi Web" onChange={onChange} />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Aplikasi Web
              </label>
            </div>
            <div className="container mt-3 d-flex justify-content-center" style={{ border: "1px dashed #9EA0A5", cursor: "pointer" }}>
              <form onClick={() => document.querySelector(".image").click()}>
                {image ? (
                  <img src={image} style={{ width: "100%", height: "100%" }} />
                ) : (
                  <div className="d-block justify-content-center my-3" style={{ color: "#9EA0A5" }}>
                    <MdCloudUpload style={{ width: "100%", height: "50px" }} />
                    <p className="text-center">
                      Drag & Drop untuk Upload Gambar Aplikasi Mobile
                      <br />
                      <small>Atau cari untuk mengupload file dari direktorimu.</small>
                    </p>
                  </div>
                )}
                <Input className="image" name="image" type="file" onChange={handleUploadChange} hidden />
              </form>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button child="Close" style={{ color: "#5E50A1", backgroundColor: "white", border: "1px solid #5E50A1 " }} onClick={onHide} />
          <Button child="Save" style={{ color: "white", backgroundColor: "#5E50A1" }} onClick={handleSubmit} />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddNewPortofilio;

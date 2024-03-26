"use client";

import React, { useState, useEffect } from "react";
import { MdOutlineAddToPhotos } from "react-icons/md";
import CardPortfolio from "../cardPortfolio/CardPortfolio";
import AddNewPortofilio from "../modal/addNewPortofilio";
import { deletePortfolio, getPortfolio } from "@/service/portfolio";
import { TiDeleteOutline } from "react-icons/ti";
const Portofolio = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [portfolio, setPortfolio] = useState([]);

  const handleGetPortfolio = async () => {
    try {
      
      const response = await getPortfolio();
      setPortfolio(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetPortfolio();
  }, []);
  const handleDeletePortfolio = async (id) => {
    try {
      await deletePortfolio(id);
      handleGetPortfolio();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-3">
      {portfolio?.map((item) => (
        <CardPortfolio key={item.id} src={item.image} name={item.application_name}>
          <TiDeleteOutline
            className="bg-warning text-danger"
            style={{ position: "absolute", top: "0", right: "0", width: "20px", height: "auto", borderRadius: "50%", transform: "translateX(20%)", cursor: "pointer" }}
            onClick={() => handleDeletePortfolio(item.id)}
          />
        </CardPortfolio>
      ))}

      <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
        <div className="Card d-flex justify-content-center align-items-center mb-4" style={{ background: "#CFCFCF", height: 200, cursor: "pointer" }} onClick={handleShow}>
          <MdOutlineAddToPhotos style={{ height: "100px", color: "gray" }} />
        </div>
        <AddNewPortofilio show={show} onHide={handleClose} onGetPortfolio={() => handleGetPortfolio()} />
      </div>
    </div>
  );
};

export default Portofolio;

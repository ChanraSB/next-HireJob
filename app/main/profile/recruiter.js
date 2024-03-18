import Image from "next/image";
import React from "react";
import image from "@/public/images/profilePicture.svg?url";
import styles from "./perekrut.module.css";
import Button from "@/component/base/button/button";
import { MdOutlineEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { LuGitlab } from "react-icons/lu";
import Link from "next/link";
import { getRecruitersProfile } from "@/service/recruiter";
const RecruiterProfile = async () => {
  const ProfileData = await getRecruitersProfile();
  return (
    <div className="container" style={{ marginTop: "120px" }}>
      <div className={`${styles.card} `}>
        <div className={styles.bg}></div>
        <div className={`${styles.imgWrapper} card-img d-flex justify-content-center `}>
          <Image className={`${styles.img}`} src={image} />
        </div>
        {ProfileData && (
          <div className="card-body  text-center mt-3 mx-auto" style={{ width: "80%" }}>
            <h3 className="card-title">{ProfileData.company}</h3>
            <p className="card-subtitle">{ProfileData.position}</p>
            <p className="card-text">{ProfileData.city || "-"}</p>
            <p className="card-text"> {ProfileData.description || "-"}</p>
            <Button child="Edit Profile" className="mt-3 py-3" style={{ color: "white", backgroundColor: "#5E50A1", width: "60%" }} />
            <ul className="nav  mt-3 mb-3 d-block">
              <li className="nav-item ">
                <Link className="nav-link text-secondary" href="#">
                  <MdOutlineEmail /> Louistommo@gmail.com
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-secondary" href="#">
                  <FaInstagram /> {ProfileData.instagram || "-"}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-secondary" href="#">
                  <FiGithub /> {ProfileData.linkedin || "-"}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-secondary" href="#">
                  <LuGitlab /> @Louistommo91
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterProfile;
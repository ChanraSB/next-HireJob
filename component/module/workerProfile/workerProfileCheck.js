"use client";
import { useState } from "react";
import TabButton from "../form/tabButton";
import Portofolio from "./PortofolioCheck";
import Experience from "./ExperienceCheck";

const WorkerProfile = (props) => {
  const {id} = props
  const [tab, setTab] = useState("portfolio");

  function selectTab(nextTab) {
    setTab(nextTab);
  }

  return (
    <div>
      <div className=" d-flex justify-content-start g-4 align-items-center mb-4">
        <TabButton isActive={tab === "portfolio"} onClick={() => selectTab("portfolio")}>
          Portofolio
        </TabButton>
        <TabButton isActive={tab === "experience"} onClick={() => selectTab("experience")}>
          Pengalaman
        </TabButton>
      </div>
      {tab === "portfolio" && <Portofolio id={id} />}
      {tab === "experience" && <Experience id={id}/>}
    </div>
  );
};
export default WorkerProfile;

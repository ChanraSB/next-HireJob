"use client";
import { useState } from "react";
import TabButton from "./tabButton.js";
import FormregisterWorker from "./formRegisterWorker.js";
import FormregisterRecruiter from "./formRegisterRecruiter.js";

const TabContainer = () => {
  const [tab, setTab] = useState("pekerja");

  function selectTab(nextTab) {
    setTab(nextTab);
  }

  return (
    <div>
      <div className=" d-flex justify-content-center g-4 align-items-center">
        <TabButton isActive={tab === "pekerja"} onClick={() => selectTab("pekerja")}>
          Pekerja
        </TabButton>
        <TabButton isActive={tab === "perekrut"} onClick={() => selectTab("perekrut")}>
          Perekrut
        </TabButton>
      </div>
      {tab === "pekerja" && <FormregisterWorker />}
      {tab === "perekrut" && <FormregisterRecruiter />}
    </div>
  );
};
export default TabContainer;

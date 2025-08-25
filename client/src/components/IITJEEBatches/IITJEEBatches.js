import React, { useState } from "react";
import "../../App.css";
import Class11Batches from "./Class11Batches";
import Class12Batches from "./Class12Batches";
import DropperBatches from "./DropperBatches";

const IITJEEBatches = () => {
  const [activeTab, setActiveTab] = useState("class11");

  return (
    <div className="batch-container">
      <h2>Choose Your Batch</h2>
      <div className="batch-tabs">
        <button
          className={activeTab === "class11" ? "active" : ""}
          onClick={() => setActiveTab("class11")}
        >
          Class 11
        </button>
        <button
          className={activeTab === "class12" ? "active" : ""}
          onClick={() => setActiveTab("class12")}
        >
          Class 12
        </button>
        <button
          className={activeTab === "dropper" ? "active" : ""}
          onClick={() => setActiveTab("dropper")}
        >
          Dropper
        </button>
      </div>

      <div className="batch-content">
        {activeTab === "class11" && <Class11Batches />}
        {activeTab === "class12" && <Class12Batches />}
        {activeTab === "dropper" && <DropperBatches />}
      </div>
    </div>
  );
};

export default IITJEEBatches;

import React, { useState } from "react";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {
  const [activeDrawer, setActiveDrawer] = useState(null);

  return (
    <>
      <TopBar
        activeDrawer={activeDrawer}
        setActiveDrawer={setActiveDrawer}
      />

      <Dashboard
        activeDrawer={activeDrawer}
        setActiveDrawer={setActiveDrawer}
      />
      
    </>
  );
};

export default Home;
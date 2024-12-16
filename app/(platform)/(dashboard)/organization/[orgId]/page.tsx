
import React, { Suspense, useEffect, useState } from "react";
import { Info } from "../components/info";
import { BoardList } from "../components/board-list";

const OrganizationDetailsPage = () => {
  // Empty dependency array ensures this runs only once on mount

  return (
    <div className="w-full">
      <Info/>
           <div className="pt-5">
            <Suspense fallback={<BoardList.Skeleton/>}>
            <BoardList />
            </Suspense>
           </div>
    </div>
  );
};

export default OrganizationDetailsPage;

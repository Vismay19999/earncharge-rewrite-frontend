import React from "react";
import ValidateProvider from "./ValidateProvider";
import FetchBill from "./FetchBill";

const IndexBillFlow = ({ providerId }: { providerId: string }) => {
  return (
    <div>
      {providerId && (
        <div>
          <ValidateProvider providerId={providerId} />
          {/* <FetchBill providerId={providerId} /> */}
        </div>
      )}
    </div>
  );
};

export default IndexBillFlow;

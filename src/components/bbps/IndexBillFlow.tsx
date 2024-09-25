import React from "react";
import ValidateProvider from "./ValidateProvider";

const IndexBillFlow = ({ providerId }: { providerId: string }) => {
  return (
    <div>
      {providerId && (
        <div>
          <ValidateProvider providerId={providerId} />
        </div>
      )}
    </div>
  );
};

export default IndexBillFlow;

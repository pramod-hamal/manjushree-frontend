"use client";

import { validateDomain } from "./validate.api";
import { useEffect } from "react";

const validateDomainHoc = (ValidatedComponent: any) => {
  const ValidateDomainWrapper = (props: any) => {
    const checkDomain = async () => {
      const host = window.location.host;
      const valid = await validateDomain(host);
      if (!valid) {
        // window.location.href = "leancx.io";
      }
    };

    useEffect(() => {
      checkDomain();
    }, []);

    return <ValidatedComponent {...props} />;
  };
  return ValidateDomainWrapper;
};

export default validateDomainHoc;

import { createApi } from "@reduxjs/toolkit/query/react";

import { protectedBaseQuery } from "@/store/baseQuery/protected.baseQueryleanq_support_coordinator";
import { endpoints } from "@/constants/endpointsleanq_support_coordinator";

export const importAPISlice = createApi({
    baseQuery: protectedBaseQuery,
    reducerPath: "importApi",
    tagTypes: ["Import"],
    endpoints: (build) => ({
        import: build.mutation<any, any>({
            query: (importData) => ({
                url: endpoints.settings.import.add,
                body: importData,
                method: "POST"
            })
        }),
    })
});

export const { useImportMutation } = importAPISlice;
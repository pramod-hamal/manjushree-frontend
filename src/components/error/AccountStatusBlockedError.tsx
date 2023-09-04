import React from "react";

export default function AccountStatusBlockedError() {
  return (
    <section className="flex items-center h-[98vh] p-16 dark:bg-gray-900 dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
            Error
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, your account is blocked.
          </p>
          <p className="mt-4 mb-8 dark:text-gray-400">
            Please contact Admin for further details
          </p>
        </div>
      </div>
    </section>
  );
}

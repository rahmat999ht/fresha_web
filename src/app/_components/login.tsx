"use client";

import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import { GoogleIcon } from "public/icons/GoogleIcon";
import { FreshaImage } from "public/images/FRESHA";
import React from "react";
// import

function LoginComponent() {
  return (
    <div
      className="centered-container mx-2 my-60 flex flex-wrap content-center items-center justify-center gap-x-4 gap-y-10"
      // style={{ height: "100vh" }}
    >
      <FreshaImage />

      <Card className="gap-y-4 py-4">
        <CardHeader className="flex-col items-center gap-y-4 px-4 pb-0 pt-2">
          <h1 className="text-4xl font-bold">Get started for Admin</h1>
          <div>
            <small className="text-lg text-default-500">Continue with</small>
            <div className="flex items-center justify-center">
              <GoogleIcon />
              <h4 className="text-xl">oogle</h4>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Button color="success" href="/api/auth/signin">
            Login
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}

export default LoginComponent;

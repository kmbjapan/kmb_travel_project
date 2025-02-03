import React from "react";
import PackageForm from "./sub/PackageForm";

const PackageCreate = () => {
  const handleCreate = async (data: any) => {
    console.log("生成する:", data);
    //TODO:API(POST)呼び出し
  };

  return <PackageForm />;
};

export default PackageCreate;

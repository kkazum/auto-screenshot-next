import { useEffect } from "react";
import Link from "next/link";
import { Layout } from "../components/shared/Layout";
import Button from "@mui/material/Button";
import { NextPage } from "next";
import { SettingTemplate } from "../components/settings/SettingTemplate";

const IndexPage: NextPage = () => {
  return (
    <Layout>
      <SettingTemplate />
    </Layout>
  );
};

export default IndexPage;

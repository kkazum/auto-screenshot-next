import { useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import Button from '@mui/material/Button';
import { NextPage } from 'next';
import { SettingTemplate } from '../components/settings/SettingTemplate';

const IndexPage: NextPage = () => {
  return (
    // TODO 最終的にLayoutもちゃんと整える
    // <Layout title="Home | Next.js + TypeScript + Electron Example">
    <SettingTemplate />
    // </Layout>
  );
};

export default IndexPage;

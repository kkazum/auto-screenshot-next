import { useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import Button from '@mui/material/Button';

const IndexPage = () => {
  useEffect(() => {
    const handleMessage = (_event: any, args: any) => alert(args);

    // add a listener to 'message' channel
    global.ipcRenderer.addListener('message', handleMessage);

    return () => {
      global.ipcRenderer.removeListener('message', handleMessage);
    };
  }, []);

  const onSayHiClick = () => {
    global.ipcRenderer.send('message', 'hi from next');
  };

  return (
    <Layout title="Home | Next.js + TypeScript + Electron Example">
      <h1>Hello Next.js 👋</h1>
      <Button variant="contained" onClick={onSayHiClick}>
        Say hi to electron
      </Button>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  );
};

export default IndexPage;

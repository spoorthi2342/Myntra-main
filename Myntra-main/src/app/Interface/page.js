import Head from 'next/head';
import Chatbot from '../ChatBott/page'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Chatbot</title>
        <meta name="description" content="A simple chatbot interface" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gray-100 flex items-center justify-center h-screen">
        <Chatbot/>
      </main>
    </div>
  );
}

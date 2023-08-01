import { NextSeo } from 'next-seo';
import toast, {
  Toaster,
  useToasterStore,
  ToastPosition,
} from 'every-notify';
import React, { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import Logo from '../assets/every-notify.svg';
import GitHub from '../assets/github.svg';
import Checkmark from '../assets/checkmark.svg';
import { ToastExample } from '../components/sections/toast-example';
import { Footer } from '../components/sections/footer';
import { ToasterExample } from '../components/sections/toaster-example';

import packageInfo from '../../package.json';
const version = packageInfo.version;

const Feature: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="flex gap-1 items-center">
    <Checkmark />
    <span className="font-bold">{children}</span>
  </div>
);

const Step: React.FC<{
  count: number;
  title: string;
  subTitle: string;
  code: JSX.Element;
}> = (props) => (
  <div className="flex flex-col gap-1 items-center">
    <div className="h-6 w-6 mb-2 text-sm rounded-full bg-gradient-900 text-gradient-50 flex items-center justify-center">
      {props.count}
    </div>
    <div className="font-bold">{props.title}</div>
    <div className="text-green-700 text-sm">{props.subTitle}</div>
    <code className="mt-2 border border-gradient-200 py-2 px-4 rounded font-bold bg-white w-full text-center">
      {props.code}
    </code>
  </div>
);

const Steps = () => (
  <div className="grid  grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-8 my-12">
    <Step
      count={1}
      title="Install package"
      subTitle="It weighs less than 5kb"
      code={
        <code>
          <span className="text-gradient-600">yarn add</span>{' '}
          <span className="text-gradient-800">every-notify</span>
        </code>
      }
    ></Step>
    <Step
      count={2}
      title="Add Toaster to your app"
      subTitle="Make sure it's placed at the top"
      code={
        <>
          <span className="text-gradient-600">{'<div>'}</span>
          <span className="text-gradient-800">{'<Toaster/>'}</span>
          <span className="text-gradient-600">{'</div>'}</span>
        </>
      }
    ></Step>
    <Step
      count={3}
      title="Start toasting!"
      subTitle="Call it from anywhere"
      code={
        <>
          <span className="text-gradient-600">{'toast'}</span>
          <span className="text-gradient-800">{'("Hello World")'}</span>
        </>
      }
    ></Step>
  </div>
);

const Features = () => (
  <div className="my-12 grid gap-x-8 gap-y-5 grid-cols-2 md:grid-cols-3">
    <Feature>Easy to use</Feature>
    <Feature>Customizable</Feature>
    <Feature>Emoji Support</Feature>
  </div>
);

export default function Home() {
  const [position, setPosition] = useState<ToastPosition>('top-center');
  const [reverse, setReverse] = useState(false);
  const { toasts: allToasts } = useToasterStore();

  const shouldFade =
    allToasts.filter((t) => t.visible).length && position.includes('top');
  return (
    <div className="overflow-x-hidden">
      <NextSeo
        title={'every-notify - a T-Every lib'}
        openGraph={{
          images: [
            {
              url: `https://i.imgur.com/8rodcFL.png`,
              width: 1200,
              height: 630,
            },
          ],
        }}
        description="Add beautiful notifications to your React app with every-notify. Lightweight. Smoking hot by default."
      />
      <header className="bg-gradient-to-b from-gradient-50 to-white bg-opacity-10">
        <div className="container  flex flex-col items-center relative">
          <div>
            <Logo
              role="img"
              className="relative animate-slide-in transition-all duration-200 -mt-8 md:mt-10"
              style={{
                willChange: 'filter',
                opacity: shouldFade ? 0.2 : 1,
                filter: `blur(${shouldFade ? 6 : 0}px)`,
              }}
            />
          </div>
          <div className="text-center my-12 relative duration-200">
            <h1 className="text-3xl md:text-4xl animate-enter font-bold text-gradient-900">
              A T-Every library
            </h1>
            <h2 className="text-xl md:text-2xl font-bold text-gradient-600 mt-2">
              Enjoy
            </h2>
          </div>

          <div className="text-gradient-600 my-2">
            <Link href="/docs">
              <a className="underline">Documentation</a>
            </Link>
            {' · '}
            <span>v{version}</span>
          </div>

          <Features />
          <Steps />
          <div className="w-full max-w-4xl">
            <div className="my-14">
              <h2 className="ml-5 text-2xl font-bold">Examples</h2>
              <ToastExample />
            </div>
            <div className="my-14">
              <h2 className="ml-5 mr-5 mb-4 text-2xl font-bold">
                Change Position
              </h2>

              <ToasterExample
                onReverse={setReverse}
                reverse={reverse}
                position={position}
                onPosition={setPosition}
              />
            </div>
          </div>
        </div>
      </header>
      <Toaster position={position} reverseOrder={reverse} toastOptions={{}} />
      <Footer noBadge />
    </div>
  );
}

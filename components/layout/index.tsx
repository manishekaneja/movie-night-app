import { nanoid } from "nanoid";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useRef, useState } from "react";

const Layout: FC<{ title?: string }> = ({
  title = "Movie Night",
  children,
}) => {
  const [state, setState] = useState(false);
  const navigationRef = useRef<
    Array<{ id: string; title: string; to: string }>
  >([
    {
      id: nanoid(),
      title: "Home",
      to: "/",
    },
    {
      id: nanoid(),
      title: "Category",
      to: "/category",
    },
    {
      id: nanoid(),
      title: "Bookmarked",
      to: "/bookmark",
    },
  ]);

  return (
    <>
      <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col overflow-y-auto relative overflow-x-hidden">
        <Head>
          <title>{title}</title>
          <meta
            name="description"
            content="Get updated List of Trending Movies, TV Show, etc."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className="bg-black fixed w-full top-0 text-white flex items-center justify-center h-14 flex-none z-50 shadow-md">
          <div className="w-20 flex-b"></div>
          <h2 className="font-medium text-2xl flex-1 px-4 text-center  lg:text-left">
            Movie Night
          </h2>
          <div className="hidden lg:flex h-full">
            {navigationRef.current.map((navLink) => (
              <Link href={navLink.to} key={navLink.id}>
                <div className="hover:bg-white hover:text-black h-full flex items-center justify-center px-2">
                  <p className="text-center p-1 text-xl">{navLink.title}</p>
                </div>
              </Link>
            ))}
          </div>
          <button
            className="text-white bg-white h-full lg:hidden"
            onClick={() => setState((ps) => !ps)}
          >
            {state ? (
              <Image
                src="/assets/icons/close.svg"
                alt="close-menu"
                width={72}
                height={25}
              />
            ) : (
              <Image
                src="/assets/icons/burger-menu.svg"
                alt="burger-menu"
                width={72}
                height={25}
              />
            )}
          </button>
          <div
            className={`bg-gray-200  lg:hidden divide-y divide-gray-800 text-black absolute left-full top-14 w-full h-auto p-2 z-10 shadow-md transform ${
              state ? "-translate-x-full" : ""
            } duration-200`}
          >
            {navigationRef.current.map((navLink) => (
              <Link href={navLink.to} key={navLink.id}>
                <p className="text-center p-1 text-xl">{navLink.title}</p>
              </Link>
            ))}
          </div>
        </header>
        <div className="h-14 flex-none" />
        <main className="flex-1 z-0">{children}</main>
        <footer className="flex-none z-50 p-4 bg-black text-white text-center shadow-lg tracking-wider">
          <p className="space-x-5">
            <span>Movie Night</span>
            <span>|</span>
            <span>
              <span>Made by </span>
              <a
                className="underline"
                target="_blank"
                href="https://me.manishaneja.com"
              >
                Manish Aneja
              </a>
            </span>
          </p>
        </footer>
      </div>
    </>
  );
};

export default Layout;

import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const token = window.localStorage.getItem("token");

  return (
    <>
      <nav class="block text-black w-full max-w-screen-xl px-4 py-2 mx-auto bg-white border shadow-md rounded-xl border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
        <div class="container flex items-center justify-between mx-auto text-blue-gray-900">
          <div class="mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased">
            <Link to={"/"}>MelodyVerse</Link>
          </div>
          <div class="hidden lg:block"></div>
          <div class="flex items-center gap-x-1">
            <button
              class="hidden px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
              type="button">
              {token ? (
                ""
              ) : (
                <Link to={"/signin"}>
                  <span>Sign In</span>
                </Link>
              )}
            </button>
            <button
              class="hidden select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
              type="button">
              {token ? (
                  <div>Log Out</div>
              ) : (
                <Link to={"/signup"}>
                  <span>Sign up</span>
                </Link>
              )}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

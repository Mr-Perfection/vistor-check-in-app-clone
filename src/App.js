import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./App.scss";

function App() {
  return (
    <div class="container mx-auto mt-12 p-8 border  min-h-screen max-w-3xl">
      <div class="clearfix">
        <button class="btn  btn--brand float-right ml-2">
          <i class="fas fa-user"></i>&nbsp;&nbsp;New visitor
        </button>
        <input
          type="text"
          class="p-2 text-sm border float-right max-w-xs w-full"
          placeholder="Search"
        />
        <img
          src="https://dashboard.envoy.com/assets/images/logo-small-red-ba0cf4a025dd5296cf6e002e28ad38be.svg"
          alt="Envoy Logo"
          width="31"
          class="py3 block"
        />
      </div>
      <div class="flex-grow h-screen overflow-y-scroll">
        <div class="mx-auto">
          <div class="mt-8">
            <table class="w-full">
              <thead>
                <tr>
                  <th class="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">
                    Name
                  </th>
                  <th class="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">
                    Notes
                  </th>
                  <th class="text-sm font-semibold text-grey-darker p-1 bg-grey-lightest">
                    Signed out
                  </th>
                </tr>
              </thead>
              <tbody class="align-baseline">
                <tr>
                  <td class="p-2 border-t border-grey-light font-mono text-xs">
                    Esteban Arango
                  </td>
                  <td class="p-2 border-t border-grey-light font-mono text-xs">
                    Frisbee and Vegan food
                  </td>
                  <td class="p-1 border-t border-grey-light font-mono text-xs">
                    04 / 24 / 2019 11:00pm
                  </td>
                </tr>
                <tr>
                  <td class="p-2 border-t border-grey-light font-mono text-xs">
                    Ryan Labouve
                  </td>
                  <td class="p-2 border-t border-grey-light font-mono text-xs">
                    Everything about Oklahoma
                  </td>
                  <td class="p-1 border-t border-grey-light font-mono text-xs">
                    <button class="btn btn--smaller btn--outline">
                      Sign out
                    </button>
                  </td>
                </tr>
                <tr>
                  <td class="p-2 border-t border-grey-light font-mono text-xs">
                    David Kroondyk
                  </td>
                  <td class="p-2 border-t border-grey-light font-mono text-xs">
                    Tennis 🎾
                  </td>
                  <td class="p-1 border-t border-grey-light font-mono text-xs">
                    <button class="btn disabled btn--smaller btn--outline">
                      Signing out <i class="fas fa-spinner"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td class="p-2 border-t border-grey-light font-mono text-xs">
                    Bill Heaton
                  </td>
                  <td class="p-2 border-t border-grey-light font-mono text-xs">
                    Motorcycles 🏍
                  </td>
                  <td class="p-1 border-t border-grey-light font-mono text-xs">
                    04 / 24 / 2019 11:00pm
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="mt-8 mb-8">
              <p class="mt-2">
                <div class="flex">
                  <a href="#" class="mr-4 px-1">
                    {" "}
                    <i class="fas fa-angle-left"></i>{" "}
                  </a>
                  <div class="flex text-center mr-4">
                    <span class="w-20">1</span>
                    <span class="w-20">&nbsp;/&nbsp;</span>
                    <span class="w-20">2</span>
                  </div>
                  <a href="#" class="mr-4 px-1">
                    <i class="fas fa-angle-right"></i>
                  </a>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

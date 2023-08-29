"use client";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-stone-800">
      <div className="flex flex-col items-center space-y-3">
        <Menu as="div">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-stone-500 px-4 py-2 text-sm font-bold text-black hover:bg-amber-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              Quiz Level 4
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute ml-9 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-stone-500 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/form_submission"
                      passHref
                      rel="no-referrer"
                      target="_blank"
                    >
                      <button
                        className={`${
                          active ? "bg-amber-500 font-bold" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {active ? (
                          <FolderIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <FolderIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        )}
                        Form Submission
                      </button>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/blog_website"
                      passHref
                      rel="no-referrer"
                      target="_blank"
                    >
                      <button
                        className={`${
                          active ? "bg-amber-500 font-bold" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {active ? (
                          <FolderIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <FolderIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        )}
                        Blog Website
                      </button>
                    </Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}

function FolderIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        fill="#000000"
        stroke="#000000"
        strokeLinejoin="round"
        d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z"
      />
    </svg>
  );
}

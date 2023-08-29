"use client";
import { useState } from "react";
import { Tab } from "@headlessui/react";
import { DM_Sans } from "next/font/google";
import Image from "next/image";

const dm_sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm_sans",
});

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  function handleNextButton() {
    if (selectedIndex < 3) {
      setSelectedIndex(selectedIndex + 1);
    }
  }

  function handlePreviousButton() {
    if (selectedIndex >= 1) {
      setSelectedIndex(selectedIndex - 1);
    }
  }
  return (
    <div
      className={`${dm_sans.variable} font-custom text-neutral-600 flex flex-col justify-center items-center w-full mt-4 mb-16`}
    >
      <div
        className={`flex flex-col justify-center items-center w-custom text-center`}
      >
        <div className="font-bold text-custom700_34 pb-3 text-custom_neutral_800">
          Get a project quote
        </div>
        <div className="text-custom400_18 pb-10">
          Please fill the form below to receive a quote for your project. Feel
          free to add as much detail as needed.
        </div>
        <div
          className={`flex flex-col justify-normal items-center w-custom h-[37.875rem] text-center pt-8 rounded-3xl border border-slate-200 shadow-lg`}
        >
          <Tab.Group selectedIndex={selectedIndex}>
            <Tab.List className="flex space-x-4 px-2 py-2">
              <Tab as="div">
                <ProcessStep
                  number={1}
                  selectedNumber={selectedIndex}
                  rightLine={true}
                />
              </Tab>
              <Tab as="div">
                <ProcessStep
                  number={2}
                  selectedNumber={selectedIndex}
                  rightLine={true}
                />
              </Tab>
              <Tab as="div">
                <ProcessStep
                  number={3}
                  selectedNumber={selectedIndex}
                  rightLine={true}
                />
              </Tab>
              <Tab as="div">
                <ProcessStep number={4} selectedNumber={selectedIndex} />
              </Tab>
            </Tab.List>
            <div className="w-[37.25rem] h-px mt-8 mb-16 bg-custom_neutral_400"></div>
            <div className="flex flex-col w-full h-full px-11">
              <Tab.Panels>
                <Tab.Panel>
                  <ContactDetail />
                </Tab.Panel>
                <Tab.Panel>
                  <OurService />
                </Tab.Panel>
                <Tab.Panel>
                  <ProjectBudget />
                </Tab.Panel>
                <Tab.Panel>
                  <Submit />
                </Tab.Panel>
              </Tab.Panels>
            </div>
          </Tab.Group>
        </div>
        <div className="flex flex-row-reverse w-full justify-between mt-8">
          <button
            onClick={handleNextButton}
            className={`bg-custom_primary_color text-white px-10 py-5 rounded-[56px] text-custom700_18 drop-shadow-[0px_3px_12px_rgba(74,58,255,0.18)] ${
              selectedIndex == 3 ? "invisible" : "visible"
            }`}
          >
            Next Step
          </button>
          <button
            onClick={handlePreviousButton}
            className={`border border-custom_primary_color text-custom_primary_color px-10 py-5 rounded-[66px] text-custom400_18 ${
              selectedIndex == 0 ? "invisible" : "visible"
            }`}
          >
            Previous Step
          </button>
        </div>
      </div>
    </div>
  );
}

function ProcessStep({ number, selectedNumber, rightLine = false }) {
  function line() {
    if (number == selectedNumber + 1) {
      return (
        <div className="w-[6.125rem] h-1.5 rounded-[40px] bg-custom_neutral_300">
          <div className="w-1/2 h-1.5 rounded-[40px] bg-custom_primary_color"></div>
        </div>
      );
    } else if (number < selectedNumber + 1) {
      return (
        <div className="w-[6.125rem] h-1.5 rounded-[40px] bg-custom_neutral_300">
          <div className="w-full h-1.5 rounded-[40px] bg-custom_primary_color"></div>
        </div>
      );
    } else {
      return (
        <div className="w-[6.125rem] h-1.5 rounded-[40px] bg-custom_neutral_300"></div>
      );
    }
  }
  return (
    <div className="flex flex-row justify-center items-center text-custom500_18 space-x-4">
      <div
        className={`flex flex-col justify-center rounded-full w-8 h-8  ${
          number <= selectedNumber + 1
            ? "bg-custom_primary_color text-white"
            : "bg-custom_neutral_300 text-custom_neutral_600"
        }`}
      >
        {number}
      </div>
      {rightLine && line()}
    </div>
  );
}

function ContactDetail() {
  return (
    <div className="flex flex-col w-full justify-start items-start">
      <div className="text-custom_neutral_800 text-custom700_24">
        Contact details
      </div>
      <div className="text-custom_neutral_600 text-custom400_18">
        Lorem ipsum dolor sit amet consectetur adipisc.
      </div>
    </div>
  );
}

function OurService() {
  return (
    <div className="flex flex-col w-full justify-start items-start">
      <div className="text-custom_neutral_800 text-custom700_24">
        Our Service
      </div>
      <div className="text-custom_neutral_600 text-custom400_18">
        Please select which service you are interested in.
      </div>
    </div>
  );
}

function ProjectBudget() {
  return (
    <div className="flex flex-col w-full justify-start items-start">
      <div className="text-custom_neutral_800 text-custom700_24">
        What’s your project budget?
      </div>
      <div className="text-custom_neutral_600 text-custom400_18">
        Please select the project budget range you have in mind.
      </div>
    </div>
  );
}
function Submit() {
  return (
    <div className="flex flex-col w-full justify-start items-center px-14">
      <Image
        src="/images/Group_37301.svg"
        width={157.359}
        height={143.415}
        alt="Submit Image"
      />
      <div className="text-custom_neutral_800 text-custom700_24">
        Submit your quote request
      </div>
      <div className="text-custom_neutral_600 text-custom400_18 pb-5 mt-2">
        Please review all the information you previously typed in the past
        steps, and if all is okay, submit your message to receive a project
        quote in 24 - 48 hours.
      </div>
      <button className="bg-custom_primary_color text-white px-10 py-5 rounded-[56px] text-custom700_18 drop-shadow-[0px_3px_12px_rgba(74,58,255,0.18)]">
        Submit
      </button>
    </div>
  );
}

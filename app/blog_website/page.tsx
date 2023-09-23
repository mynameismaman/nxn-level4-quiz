import { Open_Sans } from "next/font/google";
import Image from "next/image";
import useSWRInfinite from "swr/infinite";
import type {
  InferGetServerSidePropsType,
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";

const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-openSans" });

// const fetcher = (url: any) => fetch(url).then((r) => r.json());
// const PERPAGE = 4;

// type subData = {
//   id: number;
//   category: any;
//   author: any;
//   thumbnail: string;
//   slug: string;
//   title: string;
//   summary: string;
// };
//
// type Repo = {
//   meta: any;
//   data: subData[];
// };
//
// async function getServerSideProps(
//   context: GetServerSidePropsContext,
// ): Promise<Repo> {
//   const { query } = context;
//   const res = await fetch("https://hsi-sandbox.vercel.app/api/articles");
//   return res.json();
// }

export default async function Home() {
  return (
    <div
      className={`${openSans.variable} font-custom text-custom400_16 flex flex-col justify-center items-center w-full mt-4 mb-16`}
    >
      <div className="w-10/12 ">
        <div className="w-1/2 border-black flex flex-row h-12">
          <div className="w-2/3 flex flex-row justify-between place-items-center">
            <div className="flex flex-row justify-between place-items-center px-5 rounded-xl text-custom600_16 h-9">
              Popular
            </div>
            <div className="flex flex-row justify-between place-items-center px-5 bg-custom_pink rounded-xl text-custom600_16 text-white h-9">
              New
            </div>
          </div>
          <div className="w-full flex flex-row justify-end">
            <Image src="/images/logo.svg" width={99} height={29} alt="logo" />
          </div>
        </div>
        <div className="w-full my-20 flex flex-row justify-center">
          <h1></h1>
        </div>
        <div className="w-full flex flex-row justify-center place-items-center">
          <div className="text-custom500_18 text-custom_pink border-2 border-custom_pink rounded-full px-8 py-3">
            Load More
          </div>
        </div>
      </div>
    </div>
  );
}

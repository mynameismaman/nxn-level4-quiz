import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

type Data = {
  data: {
    title: string;
    summary: string;
    content: string;
    author: {
      firstName: string;
      middleName: string;
      lastName: string;
    };
    category: { name: string; id: number };
    thumbnail: string;
    slug: string;
  };
};

const fetcher = (url: any) => fetch(url).then((r) => r.json());
const PERPAGE = 4;

export default function Detail({ repo }: { repo: Data }) {
  if (!repo) {
  }
  return (
    <div
      className={`font-custom text-custom400_16 flex flex-col justify-center items-center w-full mt-4 mb-16`}
    >
      <div className="w-10/12 ">
        <div className="w-full border-black flex flex-row h-12 max-sm:flex-col max-sm:w-full">
          <div className="w-full flex flex-row justify-center">
            <Link href="/">
              <Image
                src="/images/logo.svg"
                width={99}
                height={29}
                alt="logo"
                className="w-[6.188rem] h-[1.813rem]"
                priority={true}
              />
            </Link>
          </div>
        </div>
        <div className="w-full mt-20 flex flex-col justify-center place-items-center">
          <div className="flex flex-col w-[46.875rem] max-sm:w-full">
            <div className="text-custom700_28 leading-8 text-[#4A4A4A]">
              {repo.data.title}
            </div>
            <div className="text-custom600_16 my-5">{repo.data.summary}</div>
            <div className="mt-3 flex flex-row text-custom400_14 mb-20">
              <div className="pr-2 text-[#9B9B9B]">BY</div>
              <div className="pr-1">{repo.data.author.firstName}</div>
              <div
                className={`pr-1 ${
                  repo.data.author.middleName == "" && "hidden"
                }`}
              >
                {repo.data.author.middleName}
              </div>
              <div className="pr-2">{repo.data.author.lastName}</div>
              <div className="pr-2 text-[#9B9B9B]">IN</div>
              <div className="pr-2">{repo.data.category.name}</div>
            </div>
            <Image
              src={repo.data.thumbnail}
              width={750}
              height={500}
              alt="Image"
              className="rounded-md"
            />
            <div className="text-custom400_20 text-[#4A4A4A] mt-16">
              {repo.data.content}
            </div>
            <ArtikelByKategori
              categoryId={repo.data.category.id}
              slug={repo.data.slug}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

//Static Generation
type Slug = { slug: string };
type Res = { meta: any; data: any };

export const getStaticPaths = (async () => {
  const res = await fetch(
    `https://hsi-sandbox.vercel.app/api/articles/?perPage=999`,
  );

  const slugs: Res = await res.json();

  const slug = slugs.data.map((value: Slug) => {
    return { params: { detail: value.slug } };
  });

  return {
    paths: slug,
    fallback: false, // false or "blocking"
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const res = await fetch(
    `https://hsi-sandbox.vercel.app/api/articles/${context?.params?.detail}`,
  );
  const repo = await res.json();
  if (!res.ok) {
    return { notFound: true };
  }
  return { props: { repo } };
}) satisfies GetStaticProps;

//Client-side data fetching menggunakan swr
type DataByCategory = {
  id: number;
  category: DataCategory;
  author: DataAuthor;
  thumbnail: string;
  slug: string;
  summary: string;
  title: string;
};

type DataAuthor = {
  firstName: string;
  middleName: string;
  lastName: string;
};

type DataCategory = { id: number; name: string };

function ArtikelByKategori({
  categoryId,
  slug,
}: {
  categoryId: number;
  slug: string;
}) {
  const { data: getPagination } = useSWR(
    `https://hsi-sandbox.vercel.app/api/articles?perPage=${PERPAGE}`,
    fetcher,
  );
  const { data: getByKategori } = useSWR(
    () =>
      `https://hsi-sandbox.vercel.app/api/articles?perPage=${
        getPagination.meta.pagination.totalPages * PERPAGE
      }`,
    fetcher,
  ); //Ambil demua data pada api

  if (!getByKategori) {
    return <p>Loading</p>;
  }

  const dataByKategori = getByKategori.data.filter(
    (data: any) => data.category.id === categoryId && data.slug !== slug,
  );

  return (
    <div
      className={`flex flex-col w-full mt-24 ${
        dataByKategori.length === 0 && "invisible"
      }`}
    >
      <div className="flex flex-row">
        <div className="basis-1/2 text-custom600_30">
          You might also like...
        </div>
        <div className="basis-1/2 flex text-custom400_14 text-[#9B9B9B] place-items-center justify-end">
          <Link href={slug + "/relates"}>More</Link>
        </div>
      </div>
      <div className="flex flex-row justify-between mt-14">
        {dataByKategori.map(
          (value: DataByCategory, index: number) =>
            index < 2 && (
              <div key={value.id} className="flex flex-col w-[23rem]">
                <Image
                  src={value.thumbnail}
                  width={370}
                  height={400}
                  alt="Image"
                  className="rounded-md"
                />
                <div className="mt-3 flex flex-row text-custom400_14">
                  <div className="pr-2 text-[#9B9B9B]">BY</div>
                  <div className="pr-1">{value.author.firstName}</div>
                  <div
                    className={`pr-1 ${
                      value.author.middleName == "" && "hidden"
                    }`}
                  >
                    {value.author.middleName}
                  </div>
                  <div className="pr-2">{value.author.lastName}</div>
                  <div className="pr-2 text-[#9B9B9B]">IN</div>
                  <div className="pr-2">{value.category.name}</div>
                </div>
                <div className="text-custom600_24 leading-8 my-4">
                  <Link href={value.slug}>{value.title}</Link>
                </div>
                <div className="text-[#9B9B9B] text-custom400_14">
                  {value.summary}
                </div>
              </div>
            ),
        )}
      </div>
    </div>
  );
}

"use client";
import Image from "next/image";
import useSWRInfinite from "swr/infinite";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link";

const fetcher = (url: any) => fetch(url).then((r) => r.json());
const PERPAGE = 4;

type category = { name: string };

type author = {
  firstName: string;
  middleName: string;
  lastName: string;
};

type subData = {
  id: number;
  category: any;
  author: any;
  thumbnail: string;
  slug: string;
  title: string;
  summary: string;
};

type Repo = {
  meta: any;
  data: any;
};

//Server Side Rendering
export const getServerSideProps = (async (context) => {
  const { query } = context;
  const sort = query.sort ? query.sort : "new";
  const res = await fetch(
    `https://hsi-sandbox.vercel.app/api/articles/?sort=${sort}`,
  );
  const repo = await res.json();
  return { props: { repo, sort } };
}) satisfies GetServerSideProps<{
  repo: Repo;
}>;

export default function Home({
  repo,
  sort,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // Client-side data fething with usr
  const {
    data: dataMore,
    size,
    setSize,
    isLoading,
  } = useSWRInfinite(
    (index) =>
      `https://hsi-sandbox.vercel.app/api/articles?perPage=${PERPAGE}&page=${
        index + 1
      }&sort=${sort}`,
    fetcher,
  );
  const articles = dataMore ? [].concat(...dataMore) : [];
  const isLoadingMore =
    isLoading ||
    (size > 0 && typeof dataMore?.[size - 1]?.data === "undefined");
  const isEmpty =
    dataMore?.[size - 1]?.data.length === 0 ||
    dataMore?.[size - 1]?.data.length < 0;

  const handleClick = () => setSize(size + 1);

  function ButtonMore({
    loading,
    empty,
  }: {
    loading: boolean;
    empty: boolean;
  }) {
    if (loading) {
      return (
        <div className="text-custom500_18 text-custom_pink border-2 border-custom_pink rounded-full px-8 py-3 cursor-default">
          Loading...
        </div>
      );
    } else if (!loading) {
      return (
        <div
          className={`text-custom500_18 text-custom_pink border-2 border-custom_pink rounded-full px-8 py-3 cursor-pointer ${
            empty ? "invisible" : "visible"
          }`}
          onClick={handleClick}
        >
          Load More
        </div>
      );
    }
  }

  return (
    <div
      className={`font-custom text-custom400_16 flex flex-col justify-center items-center w-full mt-4 mb-16`}
    >
      <div className="w-10/12 ">
        <div className="w-1/2 border-black flex flex-row h-12 max-sm:flex-col max-sm:w-full">
          <div className="w-2/3 flex flex-row justify-between place-items-center max-sm:justify-start">
            <div
              className={`flex flex-row justify-between place-items-center px-5 ${
                sort == "popular"
                  ? "bg-custom_pink text-white"
                  : "bg-white text-black"
              } rounded-xl text-custom600_16 h-9`}
            >
              <Link href="?sort=popular">Popular</Link>
            </div>
            <div
              className={`flex flex-row justify-between place-items-center px-5 ${
                sort == "new"
                  ? "bg-custom_pink text-white"
                  : "bg-white text-black"
              } rounded-xl text-custom600_16 h-9`}
            >
              <Link href="?sort=new">New</Link>
            </div>
          </div>
          <div className="w-full flex flex-row justify-end max-sm:order-first max-sm:justify-center max-sm:mb-5">
            <Image
              src="/images/logo.svg"
              width={99}
              height={29}
              alt="logo"
              className="w-[6.188rem] h-[1.813rem]"
              priority={true}
            />
          </div>
        </div>
        <div className="w-full mt-20 flex flex-col justify-center place-items-center">
          {repo.data.map((value: subData) => (
            <Article
              key={value.id}
              id={value.id}
              title={value.title}
              thumbnail={value.thumbnail}
              author={value.author}
              category={value.category}
              slug={value.slug}
            />
          ))}
          {articles.map(
            (article: any, index) =>
              index !== 0 &&
              article.data.map((value: subData) => (
                <Article
                  key={value.id}
                  id={value.id}
                  title={value.title}
                  thumbnail={value.thumbnail}
                  author={value.author}
                  category={value.category}
                  slug={value.slug}
                />
              )),
          )}
        </div>
        <div className="w-full flex flex-row justify-center place-items-center">
          <ButtonMore loading={isLoadingMore} empty={isEmpty} />
        </div>
      </div>
    </div>
  );
}

function Article({
  id,
  title,
  thumbnail,
  author,
  category,
  slug,
}: {
  id: number;
  title: string;
  thumbnail: string;
  author: author;
  category: category;
  slug: string;
}) {
  return (
    <div key={id} className="mb-14 w-[40.625rem] max-sm:w-full">
      <Image
        src={thumbnail}
        height={400}
        width={600}
        alt="Image"
        priority={true}
        className="h-[25rem] w-[37.5rem] rounded-md"
      />
      <div className="mt-3 flex flex-row text-custom400_14">
        <div className="pr-2 text-[#9B9B9B]">BY</div>
        <div className="pr-1">{author.firstName}</div>
        <div className={`pr-1 ${author.middleName == "" && "hidden"}`}>
          {author.middleName}
        </div>
        <div className="pr-2">{author.lastName}</div>
        <div className="pr-2 text-[#9B9B9B]">IN</div>
        <div className="pr-2">{category.name}</div>
      </div>
      <p className={`text-custom600_30`}>
        <Link href={slug}>{title}</Link>
      </p>
    </div>
  );
}

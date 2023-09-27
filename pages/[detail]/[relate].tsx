import Link from "next/link";
import Image from "next/image";
import useSWRInfinite from "swr/infinite";
import { useState } from "react";
import { GetServerSideProps } from "next";

const fetcher = (url: any) => fetch(url).then((res) => res.json());
const PERPAGE = 4;

type Data = {
  data: {
    id: number;
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

export default function Relate({ data }: { data: Data }) {
  return (
    <div
      className={`font-custom text-custom400_16 flex flex-col justify-center items-center w-full mb-16`}
    >
      <div className="pt-4 pb-10 mb-10 bg-white w-full flex flex-col justify-center">
        <div className="w-full ">
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
        </div>
        <div className="w-full mt-20 flex flex-col place-items-center">
          <div className="flex flex-col w-[46.875rem] max-sm:w-full">
            <div className="text-custom700_24 mb-5">Related Post List</div>
            <div className="flex flex-row">
              <Image
                src={data.data.thumbnail}
                width={500}
                height={300}
                alt="Image"
                className="w-44 h-48 object-cover object-center rounded-md"
              />
              <div className="flex flex-col ml-5">
                <div className="text-custom700_28 text-[#4A4A4A] leading-10">
                  <Link href={`/${data.data.slug}`}>{data.data.title}</Link>
                </div>
                <div className="text-custom600_16 leading-6 mt-4">
                  {data.data.summary}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RelatedList
        articleId={data.data.id}
        kategoriId={data.data.category.id}
      />
      <style jsx global>{`
        body {
          background: #f9f9fb;
          margin: unset;
        }
      `}</style>
    </div>
  );
}

//Server Side Rendering
export const getServerSideProps = (async (context) => {
  const dataDetail = await fetch(
    `https://hsi-sandbox.vercel.app/api/articles/${context?.params?.detail}`,
  );
  const data = await dataDetail.json();

  if (context?.params?.relate !== "relates" || !dataDetail.ok) {
    return {
      notFound: true,
    };
  }

  return { props: { data } };
}) satisfies GetServerSideProps<{
  data: Data;
}>;

function RelatedList({
  kategoriId,
  articleId,
}: {
  kategoriId: number;
  articleId: number;
}) {
  const {
    data: getByKategori,
    error,
    isLoading,
  } = useSWRInfinite(
    () => "https://hsi-sandbox.vercel.app/api/articles?perPage=999",
    fetcher,
  );
  const [listNumber, setListNumber] = useState(PERPAGE);
  if (error) {
    return <div className="more">Error Load</div>;
  } else if (isLoading) {
    return <div className="more">Loading...</div>;
  }

  const relatedArticles =
    getByKategori &&
    getByKategori?.[0].data?.filter(
      (data: any) => data?.category?.id === kategoriId && articleId != data?.id,
    );

  return (
    <div className="card-section">
      {relatedArticles &&
        relatedArticles.map((article: any, index: number) => {
          if (index < listNumber) {
            return (
              <div
                key={article.id}
                className="w-[46.875rem] max-sm:w-full flex flex-row bg-white mb-10 rounded-md shadow-[0_0_8px_0px_rgba(0,0,0,0.08)]"
              >
                <div className="m-3.5">
                  <div className="text-custom400_18">
                    {index + 1 > 9 ? index + 1 : "0" + (index + 1)}
                  </div>
                  <Link
                    href={`/${article.slug}`}
                    className="text-custom600_24 leading-snug"
                  >
                    {article.title}
                  </Link>
                  <div className="mt-5 text-[#9B9B9B] text-custom400_14 leading-relaxed">
                    {article.summary.substring(0, 120)}
                    {article.summary.length > 120 && " ..."}{" "}
                  </div>
                </div>
                <Image
                  src={article.thumbnail}
                  width={330}
                  height={230}
                  alt={article.title}
                  priority={false}
                  className="image-related-section"
                />
              </div>
            );
          }
        })}
      {/**Tampilkan jika data masih lebih banyak dari jumlah listNumber**/}
      <div className="w-full flex flex-row justify-center place-items-center">
        <div
          onClick={() => setListNumber(listNumber + PERPAGE)}
          hidden={
            (relatedArticles && relatedArticles.length) < listNumber
              ? true
              : false
          }
          className="text-custom500_18 text-custom_pink border-2 border-custom_pink rounded-full px-8 py-3 cursor-pointer"
          style={{ marginTop: "20px" }}
        >
          Load More
        </div>
      </div>
    </div>
  );
}

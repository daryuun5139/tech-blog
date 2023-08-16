//月別記事一覧ページ（/archive/[yymm]/page/[number]/page.tsx）
import ArticleCard from "@/components/ArticleCard";
import { getList, publishAtGroup } from "@/lib/dataQuery";
import { Pagination } from "@/components/Paginaiton";
import { Blog } from "@/types/blog";

type paramsType = {
  yymm: string;
  number: string;
};

// generateStaticParams：ビルド時にreturnの内容に基づいて静的ルートを生成する。
export async function generateStaticParams(): Promise<paramsType[]> {
  const PER_PAGE = 5;
  const { totalCount } = await getList();
  const { archiveData } = await publishAtGroup();
  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);
  const paths = Object.keys(archiveData).flatMap((item) =>
    range(1, Math.ceil(totalCount / PER_PAGE)).map((number) => ({
      yymm: item,
      number: number.toString(),
    }))
  );
  // console.log(paths);
  return [...paths];
}

//paramsはURLのパスパラメータが格納されている。
//{ params: { id } }: { params: { id: string }は前半分が分割代入引数、後半部分は型注釈。
export default async function ArchivePage({
  params: { yymm, number },
}: {
  params: { yymm: string; number: string };
}) {
  const pageName1 = "archive";
  const currentNumber = Number(number);
  const yymm_split = yymm.split("");
  yymm_split.splice(4, 0, "-");
  const targetArchive = yymm_split.join("");
  const filterContents = await getList({
    offset: (currentNumber - 1) * 5,
    limit: 5,
    filters: `publishedAt[contains]${targetArchive}`,
  });
  // console.log(filterContents);
  const contentsCount = filterContents.totalCount;

  return (
    <>
      {/* 新着記事一覧ラッパー */}
      <h2 className="text-center text-xl font-bold">{`${yymm.slice(0, 4)}年${yymm.slice(
        4
      )}月の記事一覧`}</h2>
      <div className="flex flex-col justify-center p-2">
        <ul>
          {filterContents.contents.map((post: Blog) => {
            return (
              <li key={post.id}>
                <ArticleCard
                  id={post.id}
                  content={post.content}
                  title={post.title}
                  imagePath={post.eyecatch?.url ?? ""}
                  date={post.publishedAt ?? ""}
                  upDate={post.revisedAt ?? ""}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <Pagination totalCount={contentsCount} pageName1={pageName1} pageName2={yymm} />
    </>
  );
}
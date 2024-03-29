"use client";
// NavBar下のカテゴリーボックス（md以下のときに出現）
import "src/styles/components.css";
import { CategoryType, categoryArray } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";

type Props = {
  list: CategoryType[];
  count: categoryArray;
};

const CategoryBox = ({ list, count }: Props) => {
  const { lng } = useParams();

  return (
    <div className="mt-5 flex w-[88%] flex-col items-center justify-between rounded-md border-[1px] border-[#773b01] py-3 lg:hidden">
      <input id="category-acd-check1" className="acd-check" type="checkbox" />
      <label
        className="acd-label text-center text-lg font-medium text-black dark:text-[#773B01]"
        htmlFor="category-acd-check1"
      >
        CATEGORY
      </label>
      <div className="acd-content flex w-full flex-row flex-wrap justify-center ">
        {list.map((item: CategoryType) => {
          return (
            <div key={item.id}>
              <Link
                href={`/${lng}/category/${item.category}/page/1`}
                className="label-hover m-1 flex w-fit rounded-xl border-[1px] border-gray-300 p-1 text-center text-sm dark:border-[#773B01] dark:text-[#773B01] sm:m-2 sm:p-2 sm:pl-1"
              >
                <Image
                  className="mr-1"
                  width={20}
                  height={20}
                  src={item.iconimage.url}
                  alt={item.category}
                />
                <span>{item.category}</span>
                <span>({count[item.category]})</span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryBox;

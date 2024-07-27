"use client";

import { fetchApi } from "@/api";
import { BannerCaroussel } from "@/components/banners-caroussel";
import { CategoryArea } from "@/components/category-area";
import { Header } from "@/components/header";
import { HeaderBannerMobile } from "@/components/header-banner-mobile";
import { LoadingModal } from "@/components/loader";
import { SearchBar } from "@/components/search-bar";
import { SocialMediaHeader } from "@/components/social-media-header";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);

  const getBanners = async () => {
    const data = await fetchApi({
      method: "get",
      path: "/banners/get-all",
    });
    if (data) {
      return setBanners(data);
    }
    return toast.error(
      "Não foi possivel carregar os banners, atualize a página!"
    );
  };
  const getCategories = async () => {
    const data = await fetchApi({
      method: "get",
      path: "/categories/list",
    });
    if (data) {
      setCategories(data);
      return;
    }
    return toast.error(
      "Não foi possivel carregar as categorias, atualize a página!"
    );
  };
  useEffect(() => {
    Promise.all([getCategories(), getBanners()]).then(() =>
      setIsLoading(false)
    );
  }, []);
  return isLoading ? (
    <LoadingModal loading={isLoading} />
  ) : (
    <main className="w-screen md:overflow-hidden">
      <Header animation categories={categories} />
      <div className="pt-16 max-w-full w-full">
        <HeaderBannerMobile />
        <SocialMediaHeader />
        <SearchBar categories={categories} />
        <div className="w-[92%] hidden lg:flex lg:mt-24 md:max-w-[1400px] mx-auto justify-between -z-0 max-w-full">
          <div className="w-[20%] border-[0.5px]">
            <h2 className="text-white font-bold bg-primary text-center p-4">
              Categorias
            </h2>
            <ul className="flex flex-col mt-8 gap-4">
              {categories.map((category: any) => (
                <li
                  key={category.id}
                  className="text-primary text-center hover:text-zinc-400 hover:font-bold cursor-pointer"
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-[75%]">
            <BannerCaroussel banners={banners} />
          </div>
        </div>
        <div className="lg:hidden">
          <BannerCaroussel banners={banners} />
        </div>
        <div className="flex bg-white lg:py-10 flex-col pb-16 md:pb-96 lg:pb-0 gap-16 ">
          {categories.map((category: any) => (
            <CategoryArea key={category.id} category={category} />
          ))}
        </div>
      </div>
    </main>
  );
}

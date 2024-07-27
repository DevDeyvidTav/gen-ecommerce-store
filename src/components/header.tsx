import {
    IoBag,
    IoLogoFacebook,
    IoLogoInstagram,
    IoLogoWhatsapp,
    IoMenu,
    IoPerson,
    IoSearch,
  } from "react-icons/io5";
  import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
  import Image from "next/image";
  import { useContext, useEffect, useState } from "react";
  import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
  } from "@/components/ui/navigation-menu";
  import { CompanyDetails } from "@/info/company-details";
  import { Cart } from "./cart";
  import { useRouter } from "next/navigation";
  import Link from "next/link";
  import { CartContext } from "@/contexts";
import { BiUser } from "react-icons/bi";
  
  interface IHeader {
    animation: boolean;
    categories?: any[];
  }
  
  export function Header({ animation, categories }: IHeader) {
    const [isVisible, setIsVisible] = useState(true);
    const { cart } = useContext(CartContext);
    const [search, setSearch] = useState("");
  
    function handleScrollToggleVisibility() {
      if (window.scrollY < 120) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  
    useEffect(() => {
      window.addEventListener("scroll", handleScrollToggleVisibility);
      return () => {
        window.removeEventListener("scroll", handleScrollToggleVisibility);
      };
    });
  
    const router = useRouter();
  
    return (
      <header className="bg-primary px-6 lg:px-0 fixed z-50 w-full">
        <div
          className={`flex justify-between items-center max-w-[1400px] mx-auto pt-2 text-white ${
            isVisible ? "h-20" : "h-16"
          } transition-all duration-300`}
        >
          <Link href="/" className="flex items-center">
            <Image
              src={CompanyDetails.logo}
              alt="Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
          </Link>
  
          <div className="flex-grow flex justify-center">
            <div className="hidden lg:flex w-[40%] items-center bg-zinc-100 rounded text-black">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                className="w-full h-10 pl-4 rounded bg-transparent outline-none"
                placeholder="Pesquisar..."
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  search !== "" &&
                  router.push(`/pesquisa/${search}`)
                }
              />
              <button
                onClick={() =>
                  search !== "" && router.push(`/pesquisa/${search}`)
                }
                className="text-xl p-2 text-zinc-500"
              >
                <IoSearch />
              </button>
            </div>
          </div>
  
          <div className="flex items-center  space-x-8">
            <div className="flex space-x-4">
                <IoPerson className="text-xl cursor-pointer" />
              <a href={CompanyDetails.facebook} target="_blank" rel="noreferrer">
                <IoLogoFacebook className="text-xl" />
              </a>
              <a href={CompanyDetails.instagram} target="_blank" rel="noreferrer">
                <IoLogoInstagram className="text-xl" />
              </a>
              <a href={CompanyDetails.whatsapp} target="_blank" rel="noreferrer">
                <IoLogoWhatsapp className="text-xl" />
              </a>
            </div>
  
            <Sheet>
              <SheetTrigger>
                <div className="relative">
                  {cart.length > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white flex w-4 h-4 rounded-full justify-center items-center text-xs">
                      {cart.length}
                    </div>
                  )}
                  <IoBag className="text-3xl" />
                </div>
              </SheetTrigger>
              <SheetContent side={"right"}>
                <Cart />
              </SheetContent>
            </Sheet>
          </div>
        </div>
  
        {isVisible && (
          <div className="border-b-[0.5px] bg-white text-black mt-4">
            <div className="hidden lg:flex w-full justify-between items-center mx-auto max-w-[1400px]">
              <NavigationMenu className="w-full">
                <NavigationMenuList className="flex items-center">
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-primary">
                      Categorias
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="w-56 flex flex-col bg-primary text-white py-4">
                      {categories?.map((category) => (
                        <Link
                          key={category.id}
                          href={`/categoria/${category.id}`}
                          className="hover:bg-zinc-400 h-10 flex items-center justify-center hover:text-black bg-opacity-20 text-sm px-4 rounded"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <button
                    onClick={() => router.push("/categoria/promocoes")}
                    className="hover:bg-zinc-400 h-10 hover:text-black bg-opacity-20 text-sm px-4 rounded"
                  >
                    Promoções
                  </button>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        )}
      </header>
    );
  }
  
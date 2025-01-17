import {
  IoBag,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
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
import { ArrowRight, User } from "lucide-react";

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
    <header
      className="bg-primary px-6 lg:px-0
       fixed z-50 w-full"
    >
      <div
        className={`flex justify-between items-center max-w-[1400px] mx-auto pt-2 text-white ${
          isVisible ? "h-20" : "h-16"
        } transition-all duration-300`}
      >
        <Link href="/" className="lg:flex hidden items-center">
          <Image
            src={CompanyDetails.logo}
            alt="Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
        </Link>
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger>
              <IoMenu className="text-3xl cursor-pointer" />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetClose />
              <div className="flex gap-4 items-center font-bold text-xl">
                <Image
                  src={CompanyDetails.logo}
                  alt="Logo"
                  className="rounded-full"
                  width={70}
                  height={70}
                />
                <h2>
                  <Link href="/">{CompanyDetails.name}</Link>
                </h2>
              </div>
              <Link className="flex items-center mt-6 gap-2 font-medium" href="/"><User />Login</Link>
              <h3 className="text-xl font-medium mt-6">
                Categorias
              </h3>
              <ul className="flex flex-col gap-4 mt-4 min-h-[300px]">
                {categories?.map((category) => (
                  <li key={category.id}>
                    <Link
                      className="w-full flex justify-between items-center"
                      href={`/categoria/${category.id}`}
                    >
                      {category.name} <ArrowRight />
                    </Link>
                  </li>
                ))}
              </ul>
              <div>
                <h3 className="text-xl font-medium mt-6">
                  Redes Sociais
                </h3>
                <div className="flex items-center gap-6 mt-4">
                  <IoLogoInstagram className="w-6 h-6" />
                  <IoLogoFacebook className="w-6 h-6" />
                  <IoLogoWhatsapp className="w-6 h-6" />
                  <IoLogoTwitter className="w-6 h-6" />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex-grow flex justify-center">
          <div className="flex lg:w-[40%] ml-7 w-[60%] items-center bg-zinc-100 rounded text-black">
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

        <div className="flex items-center   space-x-8">
          <div className="lg:flex hidden space-x-4">
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

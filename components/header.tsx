"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

interface HeaderProps {
    page: any;
    lang: string;
}

export const scrollToContent = (e:any, contentId:string) => {
    e.preventDefault();
  
    const content = document.getElementById(contentId);
    if (content) {
      content.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

const Header: React.FunctionComponent<HeaderProps> = ({ page, lang }) => {
    function ChangeLanguage() {}

    const router = useRouter();

    function changeVal(e: any) {
        router.push(`/${e}`)
    }

    return (
        <header className=" w-full p-4 bg-[#3ba4ec]">
            <div className="container m-auto flex items-center justify-between">
                <div className="flex items-center text-white gap-4">
                    {/* <img
                        src="https://cdn-icons-png.flaticon.com/512/3942/3942104.png"
                        alt="qwerty"
                        className="h-10 max-[530px]:hidden"
                    /> */}
                    <p className="text-xl cursor-pointer">VISTA TOUR</p>
                </div>
                <nav>
                    <div className="flex gap-5 text-white items-center">
                        <p
                            onClick={(e)=> scrollToContent(e, "tours")}
                            className="cursor-pointer max-[580px]:hidden"
                        >
                            {page.toursText}
                        </p>
                        <p
                            onClick={(e)=> scrollToContent(e, "question")}
                            className="cursor-pointer max-[580px]:hidden"
                        >
                            {page.QuestionText}
                        </p>
                        <p
                            onClick={(e)=> scrollToContent(e, "footer")}
                            className="cursor-pointer max-[580px]:hidden"
                        >
                            {page.ContactsText}
                        </p>
                        <Select onValueChange={changeVal}>
                            <SelectTrigger className="w-[70px] rounded-lg text-black">
                                <SelectValue placeholder={lang.toUpperCase()} />
                            </SelectTrigger>
                            <SelectContent className="">
                                <SelectItem value="ru">RU</SelectItem>
                                <SelectItem value="en">EN</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;

"use client";

import { scrollToContent } from "@/components/header";

interface FirstSectionProps {
    page:any
}

const FirstSection: React.FunctionComponent<FirstSectionProps> = ({page}) => {
    return (
        <section className="flex items-center justify-center px-6 m-auto w-fll py-28 text-white max-xl:py-[50px] max-lg:py-12 max-md:py-11 max-md:gap-10 max-sm:py-5">
            <div className="max-w-3xl w-full mt-24 max-sm:mt-16 max-[430px]:mt-0 sm:backdrop-blur-sm p-5 rounded-lg">
                <h1 className="text-start text-5xl max-xl:text-3xl max-lg:text-2xl max-md:text-2xl">
                    {page.h1}
                </h1>
                <ul className="mt-10 max-sm:mt-5 max-md:grid-cols-2">
                    <li className="text-2xl max-lg:text-base max-sm:text-sm">
                        - {page.text}
                    </li>
                    <li className="text-2xl max-lg:text-base max-sm:text-sm">
                        - {page.text2}
                    </li>
                    <li className="text-2xl max-lg:text-base max-sm:text-sm">
                        - {page.text3}
                    </li>
                </ul>
                <div className="select-none flex max-[639px]:justify-center">
                    <button className="p-2 rounded-full bg-[#3ba4ec] animate-bounce mt-10" onClick={(e) => scrollToContent(e, "tours")}>
                        <svg
                            className=" w-9 h-9 text-white"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>{" "}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FirstSection;

import Card from "@/components/cards";
import Header from "@/components/header";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import Image from "next/image";

export default async function Home({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const { tours, page } = await getDictionary(lang);

    return (
        <div>
            <Header page={page} lang={lang} />
            <img
                className="w-full absolute -z-10 h-[800px] max-[680px]:h-[400px] max-[500px]:h-[300px] max-[400px]:h-[250px] max-xl:h-[600px] max-lg:h-[500px] object-cover "
                src={
                    "https://kommers.uz/wp-content/uploads/2022/01/m7yklxzwo9xtoxnsb2fjejc5mxib2coq-20.jpg"
                }
                alt=""
            />
            <section className="flex items-center justify-center px-6 m-auto w-fll py-28 text-white max-xl:py-[50px] max-lg:py-12 max-md:py-11 max-md:gap-10 max-sm:py-5">
                <div
                    className="max-w-3xl w-full mt-24 max-sm:mt-16 max-[430px]:mt-0 sm:backdrop-blur-sm p-5 rounded-lg"
                >
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
                    <div className="select-none flex max-[639px]:justify-center ">
                        <button className="p-2 rounded-full bg-[#3ba4ec] animate-bounce mt-10">
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
            {/* <div className="w-[100%] bg-[#3ba4ec] h-14 mt-60"></div> */}
            <section className="container px-5 m-auto w-[100%] overflow-x-hidden mt-52 max-xl:mt-24 max-md:mt-0">
                <div className="max-w-5xl">
                    <h2
                        data-aos="fade-left"
                        className="text-3xl font-medium text"
                        data-aos-offset="300"
                        data-aos-easing="ease-in-sine"
                        data-aos-duration="500"
                    >
                        {page.me}
                    </h2>
                    <p
                        data-aos="fade-left"
                        className="mt-3 mb-3 text-xl max-lg:text-lg max-md:text-sm"
                        data-aos-offset="300"
                        data-aos-easing="ease-in-sine"
                        data-aos-duration="500"
                    >
                        {page.infoText}
                        <button
                            className="text-blue-500"
                            // onClick={() => handleClickOpen("paper")}
                        >
                            {page.readMore}...
                        </button>
                    </p>
                </div>

                <div id="tours" className="mb-10"></div>
                <div className="mb-20">
                    <h1
                        data-aos="fade-right"
                        data-aos-offset="300"
                        data-aos-easing="ease-in-sine"
                        data-aos-duration="500"
                        className="text-3xl font-medium text mb-5"
                    >
                        {page.ActualTours}
                    </h1>

                    <section className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-5 mb-5">
                        {tours.map((item, indx) => (
                            <Card item={item} key={indx} />
                        ))}
                    </section>
                </div>

                <h2 className="text-3xl mb-5 max-lg:text-xl max-sm:text-sm">
                    {page.Answers}
                </h2>
                <Accordion
                    className="bg-[#F7F7F7] border px-3 py-1 rounded-md"
                    type="single"
                    collapsible
                >
                    <AccordionItem value="item-1">
                        <AccordionTrigger>{page.question1}</AccordionTrigger>
                        <AccordionContent>
                            {page.questionAnswer1}
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>{page.question2}</AccordionTrigger>
                        <AccordionContent>
                            {page.questionAnswer2}
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>{page.question3}</AccordionTrigger>
                        <AccordionContent>
                            {page.questionAnswer3}
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>{page.question4}</AccordionTrigger>
                        <AccordionContent>
                            {page.questionAnswer4}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section>
        </div>
    );
}

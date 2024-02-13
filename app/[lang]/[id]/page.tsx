import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import Link from "next/link";
import { BiLeftArrowAlt } from "react-icons/bi";

const IdPage = async ({
    params: { lang, id },
}: {
    params: { lang: Locale; id: string };
}) => {
    const tours = await (await getDictionary(lang)).tours[+id - 1];
    const page = await (await getDictionary(lang)).page

    return (
        <>
            <section className="overflow-hidden w-full bg-cover bg-center mb-10 h-[600px] max-[680px]:h-[400px] max-[500px]:h-[300px] max-[500px]:mb-0 max-[400px]:h-[250px] ">
                <div className="div w-full absolute -z-10 h-[600px] max-[680px]:h-[400px] max-[500px]:h-[300px] max-[400px]:h-[250px] after:absolute after:inset-0 after:bg-[rgba(0,0,0,.5)] after:z-[2]">
                    <img
                        className="w-full absolute -z-10 h-[600px] max-[680px]:h-[400px] max-[500px]:h-[300px] max-[400px]:h-[250px] object-cover"
                        src={tours.img2}
                        alt=""
                    />
                </div>
                <div className="m-auto container text-white pt-48 max-[680px]:pt-14 max-[680px]:py-5 max-[500px]:py-3 px-6">
                    <h1 className="text-5xl font-bold mb-10 max-[500px]:mb-5 max-[680px]:text-3xl max-sm:text-4xl max-[500px]:text-2xl max-[500px]:mt-10 max-[450px]:text-xl">
                        {tours.title}
                    </h1>
                    <p className=" text-4xl font-medium max-[680px]:text-3xl max-[500px]:text-xl  max-[390px]:text-base ">
                        {page.infoSubTitle}
                    </p>
                    <Link href={"/"}>
                        <BiLeftArrowAlt className=" absolute top-2" size={40} />
                    </Link>
                </div>
            </section>
            <section className="w-full">
                <div className="m-auto container max-[680px]:py-5 flex gap-1 max-lg:block px-6 relative pt-5">
                    <div className="w-3/4 max-lg:w-full max-lg:mb-5 ">
                        <p className=" text-xl mb-10 w-[95%] max-sm:text-base">
                            {tours.body}
                        </p>
                        <h1 className=" text-2xl font-bold mb-5 max-sm:text-lg">
                            {page.infoh1}
                        </h1>
                        <div
                            // ref={takeHeigth}
                            className="relative plcesss flex flex-col gap-4 mb-14 max-md:before:hidden before:absolute before:top-0 before:-left-5 before:h-[95%] before:w-[5px] before:rounded-full before:bg-[#3ba4ec]"
                        >
                            {tours.places.map((item, indx) => (
                                <div
                                    key={indx}
                                    className="places w-[95%] max-lg:w-full relative"
                                >
                                    <h1 className=" text-xl font-bold max-sm:text-lg max-[450px]:text-base mt-10 mb-3 max-md:mt-5 max-md:mb-2">
                                        {item.title}
                                    </h1>
                                    <div className=" flex justify-between h-fit max-[700px]:flex-col max-[820px]:gap-0 max-md:block max-md:before:hidden max-md:h-fit before:absolute before:top-11 before:-left-[25px] before:w-4 before:h-4 before:shadow-xl before:bg-white before:rounded-full gap-5 ">
                                        <p className="text-ellipsis text-lg max-xl:mb-3 max-lg:text-base max-md:text-sm max-[450px]:text-xs max-[360px]:text-[10px]">
                                            {item.body}
                                        </p>
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className=" rounded-xl w-[25%] h-[15%] max-md:w-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="sticky top-16 left-5 h-fit w-1/3 bg-[#3ba4ec] p-5 rounded-lg text-white max-lg:w-full max-md:mt-10">
                        <div className="top border-b border-white">
                            {tours.price.includes("тур") ||
                            tours.price.toLowerCase().includes("tour") ? (
                                ""
                            ) : (
                                <div className="duration flex justify-between mb-3">
                                    <h1 className=" font-bold max-xl:font-semibold">
                                    {page.stick.title}
                                    </h1>
                                </div>
                            )}
                            <div className="duration flex justify-between mb-3">
                                <h1 className=" font-bold max-xl:font-semibold">
                                {page.stick.durationH1}
                                </h1>
                                <p>{page.stick.time}</p>
                            </div>
                            {tours.price.includes("тур") ||
                            tours.price.toLowerCase().includes("tour") ? (
                                ""
                            ) : (
                                <div className="duration flex justify-between mb-3">
                                    <h1 className=" font-bold max-xl:font-semibold ">
                                    {page.stick.howH1}
                                    </h1>
                                    <p>{page.stick.how}</p>
                                </div>
                            )}
                        </div>
                        <div className="bot pt-3">
                            <div className="prices flex justify-between">
                                <h1 className="font-bold">{page.stick.price}</h1>
                                <p className="font-bold text-lg max-[400px]:text-base max-[400px]:font-medium">
                                    {tours.price}
                                </p>
                            </div>
                            {tours.price.includes("тур") ||
                            tours.price.toLowerCase().includes("tour") ? (
                                ""
                            ) : (
                                <span
                                    // onClick={() => handleClickOpen("paper")}
                                    className=" underline cursor-pointer text-white"
                                >
                                    readMore. . .
                                </span>
                            )}
                            <a href="https://t.me/fevzie_ablaeva">
                                <button className="w-full bg-[#00000030] p-3 rounded-lg text-center mt-2">
                                {page.stick.button}
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default IdPage;

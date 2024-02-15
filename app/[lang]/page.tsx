import Card from "@/components/cards";
import FirstSection from "@/components/firstSection";
import Header from "@/components/header";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

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
            <FirstSection page={page}/>
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
                            <Card lang={lang} item={item} key={indx} />
                        ))}
                    </section>
                </div>

                <h2 id="question" className="text-3xl mb-5 max-lg:text-xl max-sm:text-sm">
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

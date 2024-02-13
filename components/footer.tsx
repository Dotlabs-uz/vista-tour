
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTelegram } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

interface FooterProps {}

const Footer: React.FunctionComponent<FooterProps> = () => {
    return (
        <footer className="p-4 bg-transparent mt-10 border-t-2 rounded-lg shadow md:px-6 md:py-8">
            <div className="flex items-center justify-center gap-5 flex-col">
                <div className="flex items-center gap-2 ">
                    <p className="text-xl font-medium max-sm:text-sm">
                        Контакты
                    </p>
                    <a href="tel:+998507154050" className="text-xl font-bold max-sm:text-sm">
                        +998 50 715 40 50
                    </a>
                </div>
                <div className="flex items-center gap-2 flex-col">
                    <div className="flex items-center gap-4 max-md:gap-2">
                        <Link
                            href="https://t.me/fevzie_ablaeva"
                            className="text-gray-400 hover:text-[#3ba4ec]"
                        >
                            <FaTelegram size={30} />
                        </Link>
                        <Link
                            href="https://www.instagram.com/fevzie_ablaeva/"
                            className="text-gray-400 hover:text-[#3ba4ec]"
                        >
                            <FaInstagram size={30} />
                        </Link>
                        <Link
                            href="https://www.facebook.com/fewzie.ablaewa"
                            className="text-gray-400 hover:text-[#3ba4ec]"
                        >
                            <FaFacebook size={30} />
                        </Link>
                        <Link
                            href="mailto:afevzie@inbox.ru"
                            className="text-gray-400 hover:text-[#3ba4ec]"
                        >
                            <FiMail size={30} />
                        </Link>
                    </div>
                </div>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-aut lg:my-8" />
            <span className="block text-sm text-gray-500 text-center">
                ©<span className="hover:underline">VISTA TOUR™</span>. All Rights
                Reserved.
            </span>
        </footer>
    );
};

export default Footer;

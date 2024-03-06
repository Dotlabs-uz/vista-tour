"use client";

import InputMask from "react-input-mask";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

type Inputs = {
    name: string;
    number: string;
    from: string;
    to: string;
};

const URL = `https://api.telegram.org/bot7037880212:AAGBcUj8muyAYR7xoAD0TyxxTwvxaiZexGI/sendMessage`;

const FormSubmit = ({ page }: any) => {
    const [number, setNumber] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        let msg = `🆕 Заявка\n`;
        msg += `👨 Имя: ${data?.name} \n`;
        msg += `📞 Номер телефона: ${data.number} \n`;
        msg += `ОТ: ${data.from} \n`;
        msg += `ДО: ${data.to} \n`;

        axios
            .post(URL, {
                chat_id: "-1002037558412",
                parse_mode: "html",
                text: msg,
            })
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    setNumber("");
                    reset()
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="text-black">
            <input
                type="text"
                className="w-full p-3 rounded-lg mt-2"
                placeholder="Имя"
                required
                {...register("name", { required: true })}
            />
            <InputMask
                mask="+\9\98-(99)-999-99-99"
                required
                placeholder="Номер"
                {...register("number", { required: true })}
                value={number}
                onChange={(e: any) => setNumber(e.target.value)}
                className="w-full p-3 rounded-lg mt-2"
            ></InputMask>
            <div className="flex items-center justify-between mt-5 text-white">
                <div className="w-full">
                    <span>От:</span>
                </div>
                <div className="w-full">
                    <span>До:</span>
                </div>
            </div>
            <div className="flex items-center">
                <input
                    type="date"
                    className="w-full p-3 rounded-l-lg mt-2 border-l"
                    required
                    {...register("from", {
                        required: true,
                    })}
                />
                <input
                    type="date"
                    className="w-full p-3 rounded-r-lg mt-2 border-l"
                    required
                    {...register("to", { required: true })}
                />
            </div>
            <button
                type="submit"
                className="w-full bg-[#00000030] p-3 rounded-lg text-center mt-2 text-white"
            >
                {page.stick.button}
            </button>
        </form>
    );
};

export default FormSubmit;

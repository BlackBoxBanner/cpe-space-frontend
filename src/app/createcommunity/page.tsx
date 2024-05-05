import Image from "next/image";
import commuimage from '@/assets/welcome/comuphoto.png';
import { BiCamera } from "react-icons/bi";
import { Button } from "@/components/common/button";

const CreateCommunity = () => {

    return (
        <>
            <div className="text-[35px] font-bold mb-4 font-sans">Create community</div>
            <div className="bg-white border border-[#0D0D0D] rounded-2xl p-3 flex mb-3">
                <input type="text" className="outline-none w-full" placeholder="Community name" />
            </div>
            <div className="relative">
                <Image src={commuimage} width={7372} height={1392} alt="" className="" />
                <div className="absolute bottom-3 right-3">
                    <label>
                        <div className="bg-liberty w-10 h-10 flex justify-center items-center cursor-pointer rounded-full">
                            <BiCamera className="text-white text-xl" />
                        </div>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            id="image-register-input"
                            className="hidden absolute"
                        />
                    </label>
                </div>
            </div>
            <Button type="submit" className="px-9 h-10 flex items-center justify-center w-30 ml-auto mt-4 rounded-2xl text-sm">Save</Button>
        </>
    );
};

export default CreateCommunity;

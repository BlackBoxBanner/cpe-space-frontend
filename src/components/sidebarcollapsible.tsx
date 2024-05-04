import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/common/collapsible"
import { BiChevronUp } from "react-icons/bi";
import Image from "next/image";
import Line from "@/assets/welcome/line.png";

type SideBarCollapsibleProps = {
    Icon: () => React.ReactNode
    title: string
    active?: boolean
}

const SideBarCollapsible = ({ Icon, title, active }: SideBarCollapsibleProps) => {
    return (
        <>
            <Collapsible>
                <CollapsibleTrigger className="flex text-liberty hover:text-timberwolf items-center w-full">
                    <div className="m-2 flex gap-5 items-center flex-grow">
                        <Icon /> {title}
                    </div>
                    <div className="justify-end">
                        <BiChevronUp />
                    </div>
                </CollapsibleTrigger>
                <div className="ml-1.5">
                    <CollapsibleContent>
                        <div className="flex align-bottom">
                            <Image src={Line} width={30} height={50} alt="" className="mb-2"/>
                            <div className="mt-3">what should i eat</div>
                        </div>
                    </CollapsibleContent>
                </div>
            </Collapsible>
        </>
    );
};

export default SideBarCollapsible;

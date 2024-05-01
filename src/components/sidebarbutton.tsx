import { Button } from "./common/button";

type SideBarButtonProps = {
    Icon: () => React.ReactNode
    title: string
    active?: boolean
}

const SideBarButton = ({ Icon, title, active }: SideBarButtonProps) => {
    return (
        <>
            <Button
                buttonStyle={{
                    color: "ghost",
                    border: "none",
                    active: active ? "orange" : undefined
                }}>
                <div className="flex items-center gap-3">
                    <Icon />
                    {title}
                </div>
            </Button>
        </>
    );
};

export default SideBarButton;

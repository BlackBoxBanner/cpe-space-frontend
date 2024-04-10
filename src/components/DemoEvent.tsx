import { Button } from "@/components/demo";
import { getMenyEvents } from "@/lib/utils/events";

export const DemoEvent = () => {
	const handleClickGetEvents = async () => {
		console.log(await getMenyEvents());
	};
	return (
		<>
			<Button onClick={handleClickGetEvents} type="button">
				Get Events
			</Button>
		</>
	);
};

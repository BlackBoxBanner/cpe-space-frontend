import { Button } from "@/components/common/button";

const SearchPage = () => {
	return (
		<>
			<section>
				<div>
					<Button
						buttonStyle={{
							size: "min-width",
							color: "ghost",
							active: "orange",
						}}
					>
						Accounts
					</Button>
					<Button
						buttonStyle={{
							size: "min-width",
							color: "ghost",
						}}
					>
						Community
					</Button>
					<Button
						buttonStyle={{
							size: "min-width",
							color: "ghost",
						}}
					>
						Topic
					</Button>
				</div>
			</section>
		</>
	);
};

export default SearchPage;

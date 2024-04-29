import { axios } from "@/libs/axiosInstance";
import { getUsers } from "@/libs/utils/users/get";

const ChangePasswordPage = async ({ params }: { params: { slug: string } }) => {
	const { slug } = params;

	const getParams = async () => {
		try {
			const res = await axios.get(`/api/auth/change-password/${slug}`);

			return res.data.data as string;
		} catch (_) {
			console.error("Invalid Link");
		}
	};

	const studentid = await getParams();

	if (!studentid) throw new Error("Invalid Link");

	const userData = await getUsers();

	if (userData.error) throw new Error("Invalid Link");

	return <div>Change Password Page</div>;
};

export default ChangePasswordPage;

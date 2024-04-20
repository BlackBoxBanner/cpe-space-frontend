import { env } from "@/libs/env";
import { SigninPropsServer } from "@/libs/utils/auth/signin";
import { ReturnResponse } from "@/types/ResponseType";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json() as SigninPropsServer;

  const data = body.data;

  const res = await fetch(`${env.BACKEND_URL}/api/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${env.API_TOKEN}`,
    },
    body: JSON.stringify({ data }),
  })

  const resData = await res.json() as { data: { session: string, userId: string } }

  const cookieStore = cookies();

  cookieStore.set("cpe_space_session", resData.data.session);
  cookieStore.set("user-id", resData.data.userId);


  return NextResponse.json(body);
}

function parseCookieString(cookieString: string): { [key: string]: string } {
  const cookiePairs = cookieString.split('; ');
  const cookieObject: { [key: string]: string } = {};

  for (const pair of cookiePairs) {
    const [key, value] = pair.split('=');
    cookieObject[key] = value;
  }

  return cookieObject;
}

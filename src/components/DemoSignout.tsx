import {Button} from "@/components/demo";
import {signout} from "@/lib/utils/auth/signout";

const DemoSignout = () => {
  return <Button onClick={() => signout()}>Sign out</Button>
}

export default DemoSignout
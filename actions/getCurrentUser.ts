import getProfileByUserId from "@/actions/getProfileByUserId";
import { account, ID } from "@/libs/AppWriteClient";
// import {} from 'node-appwrite'

export default async function getCurrentUser() {
  try {
    const session = await account.getSession("current");

    if (!session) return;

    const userResponse = await account.get();
    if (!userResponse) throw Error;

    const user = await getProfileByUserId(userResponse.$id);

    return {
      ...user,
    };
  } catch (error: any) {
    console.log(`getCurrentUser error: ${error.message}`);
    return null;
  }
}

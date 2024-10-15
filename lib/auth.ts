import { account, OAuthProvider } from "./appwrite";

export const loginInWithGoogle = async () => {
  try {
    const session = account.createOAuth2Session(OAuthProvider.Google);
    console.log("session is", session);
  } catch (error) {
    console.log("could not login with google", error);
  }
};

export const logoutUser = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async () => {
  try {
    return await account.get();
  } catch (error) {
    console.error(error);
  }
};

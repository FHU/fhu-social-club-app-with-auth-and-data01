import { Account, Client, Databases, ID, Models, Query } from "react-native-appwrite";

const APPWRITE_ENDPOINT = "https://nyc.cloud.appwrite.io/v1"
const APPWRITE_PROJECT_ID = "68f8ec9400054fdf0c05"
const APPWRITE_PLATFORM_NAME = "edu.fhu.fhusocialclub"
const DATABASE_ID = "social-club-db"
const MEMBERS_TABLE_ID = "members"

export interface MemberRow extends Models.Document {
    firstName: string,
    lastName: string,
    userID: string,
    club?: string,
    phone: string,
    email: string,
}

const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID)
    .setPlatform(APPWRITE_PLATFORM_NAME)

const account = new Account(client)
const databases = new Databases(client)

async function registerWithEmail(email: string, password: string, name: string) {
  try {
    await account.create(ID.unique(), email, password, name);
    await account.createEmailPasswordSession(email, password);
    const user = await account.get<Models.User<Models.Preferences>>();
    return user;
  }
  catch (error) {
    console.error("Appwrite registration error:", error);
    throw error;
  }
}

async function loginWithEmail(email: string, password: string) {
  try {
    await account.createEmailPasswordSession(email, password);
    const user = await account.get<Models.User<Models.Preferences>>();
    return user;
  }
  catch (error) {
    console.error("Appwrite login error:", error);
    throw error;
  }
}

async function getCurrentUser() {
    try {
        const user = await account.get();
        return user
    }
    catch {
        return null
    }
}

async function logoutCurrentDevice() {
  try {
    await account.deleteSession("current");
  }
  catch (error) {
    console.error("Appwrite logout error:", error);
  }
}

async function getMembersByUserId(userID: string): Promise<MemberRow | null> {
  try {
    const response = await databases.listDocuments<MemberRow>(
      DATABASE_ID,
      MEMBERS_TABLE_ID,
      [Query.equal("userID", userID), Query.limit(1)]
    );

    return response.documents[0] ?? null;
  } catch (error) {
    console.error("Error fetching member by userID:", error);
    return null;
  }
}

export const appwrite = {
  client,
  account,
  databases,

  registerWithEmail,
  loginWithEmail,
  getCurrentUser,
  logoutCurrentDevice,

  getMembersByUserId,
};
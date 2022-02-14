import { App, AppPayload } from "./model";
import { DBSchema, IDBPDatabase, openDB } from "idb";

interface DatabaseSchema extends DBSchema {
  ["apps"]: {
    value: App;
    key: NonNullable<App["id"]>;
  };
}

async function getDatabase(): Promise<IDBPDatabase<DatabaseSchema>> {
  const database = await openDB<DatabaseSchema>("firebase-test-util", 1, {
    upgrade(database, old, current) {
      database.createObjectStore("apps", {
        autoIncrement: true,
        keyPath: "id",
      });
    },
    blocked() {
      throw Error("Cannot open database. Please refresh the page.");
    },
    blocking() {
      console.warn("The database wont be opened from a future version.");
    },
  });
  return database;
}

const database = await getDatabase();

export async function loadList(): Promise<App[]> {
  return await database.getAll("apps");
}

export async function createApp(payload: AppPayload): Promise<App> {
  const newId = await database.add("apps", payload);
  const newApp = await database.get("apps", newId);
  if (!newApp) {
    throw Error(
      "An unknown error has been detected while trying to add the app."
    );
  }
  return newApp;
}

type AppID = DatabaseSchema["apps"]["key"];

export async function getApp(id: AppID): Promise<App | undefined> {
  const app = await database.get("apps", id);
  return app;
}

export async function updateApp(payload: {
  id: AppID;
  data: AppPayload;
}): Promise<App> {
  try {
    const transaction = database.transaction("apps", "readwrite");
    const app = await transaction.store.get(payload.id);
    await transaction.store.put({ ...app, ...payload.data });
    await transaction.commit();
  } catch (err) {}
  const updatedApp = await getApp(payload.id);
  return updatedApp!;
}

export async function removeApp(id: AppID): Promise<void> {
  await database.delete("apps", id);
}

import { describe, expect, it } from "vitest";
import { readFirebaseConfigFromEnv } from "../firebaseConfig";

const FULL_ENV = {
  VITE_FIREBASE_API_KEY: "key",
  VITE_FIREBASE_AUTH_DOMAIN: "app.firebaseapp.com",
  VITE_FIREBASE_PROJECT_ID: "app",
  VITE_FIREBASE_STORAGE_BUCKET: "app.appspot.com",
  VITE_FIREBASE_MESSAGING_SENDER_ID: "123",
  VITE_FIREBASE_APP_ID: "1:123:web:abc",
  VITE_FIREBASE_MEASUREMENT_ID: "G-ABC123",
} as unknown as ImportMetaEnv;

describe("readFirebaseConfigFromEnv", () => {
  it("returns null when no Firebase env vars are set (this repo's actual state)", () => {
    expect(readFirebaseConfigFromEnv({} as ImportMetaEnv)).toBeNull();
  });

  it.each(["VITE_FIREBASE_API_KEY", "VITE_FIREBASE_PROJECT_ID", "VITE_FIREBASE_APP_ID", "VITE_FIREBASE_MEASUREMENT_ID"])(
    "returns null when the required var %s is missing",
    (missingKey) => {
      const partial = { ...FULL_ENV, [missingKey]: undefined };
      expect(readFirebaseConfigFromEnv(partial)).toBeNull();
    },
  );

  it("returns a full config object when all required vars are present", () => {
    expect(readFirebaseConfigFromEnv(FULL_ENV)).toEqual({
      apiKey: "key",
      authDomain: "app.firebaseapp.com",
      projectId: "app",
      storageBucket: "app.appspot.com",
      messagingSenderId: "123",
      appId: "1:123:web:abc",
      measurementId: "G-ABC123",
    });
  });

  it("tolerates missing optional fields (authDomain/storageBucket/messagingSenderId) with empty strings", () => {
    const minimal = {
      VITE_FIREBASE_API_KEY: "key",
      VITE_FIREBASE_PROJECT_ID: "app",
      VITE_FIREBASE_APP_ID: "1:123:web:abc",
      VITE_FIREBASE_MEASUREMENT_ID: "G-ABC123",
    } as unknown as ImportMetaEnv;
    expect(readFirebaseConfigFromEnv(minimal)).toEqual({
      apiKey: "key",
      authDomain: "",
      projectId: "app",
      storageBucket: "",
      messagingSenderId: "",
      appId: "1:123:web:abc",
      measurementId: "G-ABC123",
    });
  });
});

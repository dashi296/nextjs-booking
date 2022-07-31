import { google } from "googleapis";
import { Credentials } from "../types/Credentials";

const scopes = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.events",
];

const GOOGLE_SERVICE_KEY = process.env.GOOGLE_SERVICE_KEY as string;

const parseKey = (key: string) => {
  const decoded = Buffer.from(key, "base64").toString();
  const credentials: Credentials = JSON.parse(decoded.replace(/\n/g, "\\n"));

  return {
    ...credentials,
    private_key: credentials.private_key.replaceAll("\\n", "\n"),
  };
};

const credentials = parseKey(GOOGLE_SERVICE_KEY);

console.warn("credentials: ", credentials);

const { client_email, private_key } = credentials;

export const jwt = new google.auth.JWT(
  client_email,
  undefined,
  private_key,
  scopes
);

export const calendar = google.calendar({ version: "v3", auth: jwt });

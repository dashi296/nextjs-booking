import { google } from 'googleapis'

const CLIENT_EMAIL = process.env.CLIENT_EMAIL
const PRIVATE_KEY = process.env.PRIVATE_KEY

const SCOPES = ["https://www.googleapis.com/auth/calendar", 'https://www.googleapis.com/auth/calendar.events'];

export const jwt = new google.auth.JWT(
  CLIENT_EMAIL,
  undefined,
  PRIVATE_KEY,
  SCOPES
);

export const calendar = google.calendar("v3");
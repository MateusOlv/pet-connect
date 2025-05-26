import 'dotenv/config';
import appJson from './app.json';

export default ({ config }) => {
  return {
    ...appJson,
    extra: {
      WEB_API_URL: process.env.WEB_API_URL,
      MOBILE_API_URL: process.env.MOBILE_API_URL,
    },
  };
};

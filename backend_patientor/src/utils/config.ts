import 'dotenv/config';
const PORT = process.env.PORT;
const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

export {PORT, MONGODB_URI};
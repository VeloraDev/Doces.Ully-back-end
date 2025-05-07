import path from "path";
const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default {
  config: path.resolve(__dirname, "src", "config", "database.js"),
  "models-path": path.resolve(__dirname, "src", "models"),
  "migrations-path": path.resolve(__dirname, "src", "database", "migrations"),
  "seeders-path": path.resolve(__dirname, "src", "database", "seeds"),
};

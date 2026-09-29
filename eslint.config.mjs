import next from "eslint-config-next";

const config = [...next, { ignores: [".next/", "node_modules/", "tools/", "assets-src/"] }];

export default config;

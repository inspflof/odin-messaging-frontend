type Env = {
    VITE_API_URL: string;
    VITE_NODE_ENV: "development" | "production";
}

function requireEnv(name: string) {
    const value = import.meta.env[name];

    if(!value) {
        throw new Error(`Missing env variable: ${name}`)
    }

    return value
}

export const env: Env = {
    VITE_API_URL: requireEnv("VITE_API_URL"),
    VITE_NODE_ENV: requireEnv("VITE_NODE_ENV")
}
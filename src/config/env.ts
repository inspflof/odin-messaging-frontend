type Env = {
    VITE_API_URL: string
}

function requireEnv(name: string): string {
    const value = import.meta.env[name];

    if(!value) {
        throw new Error(`Missing env variable: ${name}`)
    }

    return value
}

export const env: Env = {
    VITE_API_URL: requireEnv("VITE_API_URL")
}
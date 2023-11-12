export {}
declare global{
    namespace NodeJS{
        interface ProcessEnv {
            ADMIN_EMAIL: string
            ADMIN_PASSWORD: string
        }
    }
}
import callEndpoint from "@/utils/callEndpoint"
const API_BASE_URL = process.env.NEXT_PUBLIC_BOT_SERVER_URL+"/game"

export const fetchOpenGames = async (token: string) => {
    try {
        const res: any = await callEndpoint(API_BASE_URL, `/all`, "GET", {}, token)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}


export const joinGame = async (chatId: number, player1Id: number, token: string) => {
    try {
        const res: any = await callEndpoint(API_BASE_URL, `/join/${chatId}`, "POST", { player1Id }, token)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export const beginGameSession = async (chatId: number, token: string) => {
    try {
        const res: any = await callEndpoint(API_BASE_URL, `/${chatId}/beginSession`, "POST", {}, token)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}


export const registerTossStart = async (chatId: number, token: string) => {
    // return console.log(API_BASE_URL)
    try {
        const res: any = await callEndpoint(API_BASE_URL, `/${chatId}/tossStart`, "POST", {}, token)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}



export const registerTossEnd = async (chatId: number, tossResult: "Head" | "Tail", token: string) => {
    // return console.log(API_BASE_URL)
    try {
        const res: any = await callEndpoint(API_BASE_URL, `/${chatId}/tossEnded`, "POST", {tossResult}, token)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

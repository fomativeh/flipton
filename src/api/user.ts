import callEndpoint from "@/utils/callEndpoint"
const API_BASE_URL = process.env.NEXT_PUBLIC_BOT_SERVER_URL

export const fetchUserAccount = async (chatId: number, token: string) => {
    // return console.log(API_BASE_URL)
    try {
        const res: any = await callEndpoint(API_BASE_URL, `/user/${chatId}`, "GET", {}, token)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}


export const createNewGame = async (chatId: number, token: string, wagerAmount: number, creatorChosenSide: "Head" | "Tail") => {
    // return console.log(API_BASE_URL)
    try {
        const res: any = await callEndpoint(API_BASE_URL, `/user/${chatId}/newGame`, "POST", { wagerAmount, creatorChosenSide }, token)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}


export const updateWalletAddress = async (chatId: number, walletAddress: string, token: string) => {
    // return console.log(API_BASE_URL)
    try {
        const res: any = await callEndpoint(API_BASE_URL, `/user/${chatId}/updateWalletAddress`, "POST", { walletAddress }, token)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}
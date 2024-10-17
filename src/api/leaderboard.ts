import callEndpoint from "@/utils/callEndpoint"
const API_BASE_URL = process.env.NEXT_PUBLIC_BOT_SERVER_URL

export const fetchLeaderboard = async (token: string) => {
    try {
        const res: any = await callEndpoint(API_BASE_URL, `/leaderboard`, "GET", {}, token)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}
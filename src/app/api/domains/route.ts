import { getServerSession } from "next-auth"
import { google } from "googleapis"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const session = await getServerSession()
    if (!session?.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const auth = new google.auth.OAuth2()
    auth.setCredentials({ access_token: session.accessToken })

    const webmasters = google.webmasters("v3")
    const { data } = await webmasters.sites.list({ auth })

    return NextResponse.json(data.siteEntry?.map(site => site.siteUrl) || [])
  } catch (error) {
    console.error("Domains API Error:", error)
    return NextResponse.json({ error: "Failed to fetch domains" }, { status: 500 })
  }
}

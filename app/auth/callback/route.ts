// app/auth/callback/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    // This exchanges the "code" from Google for a real user session
    await supabase.auth.exchangeCodeForSession(code)
  }

  // After login, send them to the homepage (or your dashboard)
  return NextResponse.redirect(requestUrl.origin)
}

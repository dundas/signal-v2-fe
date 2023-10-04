'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getGoogleAccessToken } from '@/utils/actions/auth/getGoogleAccessToken';
import { savePlatformPermission } from '@/utils/actions/auth/savePlatformPermission';
import { useEffect, useState } from 'react';

export default function QueryStringPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  console.log("SESSION: ", session);

  // set session 
  const [sessionData, setSessionData] = useState(session);


  // Convert searchParams to an object
  const query = Object.fromEntries(searchParams);

  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    async function fetchAccessToken() {
      const token = await getGoogleAccessToken(query.code);
      console.log("ACCESS TOKEN: ", token)
      const permissions = {
        platform: 'google',
        accessToken: token.access_token,
        refreshToken: token.refresh_token,
        scope: token.scope,
        tokenType: token.token_type,
        accessTokenExpires: token.expiry_date,
        userId : sessionData.userId
      }
      await savePlatformPermission(permissions);
      setAccessToken(token);
    }

    fetchAccessToken();
  }, [query.code]);

  console.log("ACCESS TOKEN: ", accessToken)

  console.log("QUERY STRING PAGE: ", pathname, query);

  return (
    <div>
      <h1>Query String Parameters:</h1>
      <p>URL: {pathname}</p>
      <ul>
        {Object.entries(query).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
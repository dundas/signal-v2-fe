import { getSession } from 'next-auth/react';
import { getGoogleUpdatePermissionUrl  } from '@/utils/actions/auth/getGoogleUpdatePermissionUrl';
import Link from 'next/link';
import { getServerSession } from "next-auth";
import { getUserSession } from '@/utils/actions/auth/getUserSession';
export default async function UpdateGooglePermissionsButton() {
    const session = await getServerSession();
    console.log("GET PERMISSION SESSION: ", session)
    const userSession = await getUserSession(session);
    console.log("GET PERMISSION USER SESSION: ", userSession)
    let link = '';

    if (userSession) {
        const userId = userSession.userId;
        console.log("GET PERMISSION USER ID: ", userId)
        const scopes = [
            'https://www.googleapis.com/auth/drive',
        ];
        const authUrl  = await getGoogleUpdatePermissionUrl(userId, scopes);
        console.log("GET PERMISSION RESPONSE: ", authUrl)
        link = authUrl;
    }

    return (
        <div>
            {link ? (
                <Link href={link}>
                    
                        <button>Update Google Drive Permissions</button>
                   
                </Link>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
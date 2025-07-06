import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';

/**
 * Downloads a file
 * @param {string} realFileId file ID
 * @return {object} file status
 */
async function downloadFile(realFileId) {
    // Get credentials and build service
    // TODO (developer) - Use appropriate auth mechanism for your app

    const auth = new GoogleAuth({
        scopes: 'https://www.googleapis.com/auth/drive',
    });
    const service = google.drive({ version: 'v3', auth });

    const fileId = realFileId;
    try {
        const file = await service.files.get({
            fileId: fileId,
            alt: 'media',
        });
        console.log(file.status);
        return file.status;
    } catch (err) {
        // TODO(developer) - Handle error
        throw err;
    }
}
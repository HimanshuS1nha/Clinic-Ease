import admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv'
dotenv.config()

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "clinic-ease-6bf59.appspot.com"
});

const storage = admin.storage();

export const uploadImageToFirebase = async (file) => {
    if (!file) {
        throw new Error('No image uploaded');
    }

    const originalFilename = file.originalname;
    const contentType = file.mimetype;

    try {
        const bucket = storage.bucket();
        const imageRef = bucket.file(originalFilename);

        await imageRef.save(file.buffer, {
            contentType,
            metadata: {
                firebaseStorageDownloadTokens: uuidv4()
            }
        });

        const imagePath = await imageRef.getSignedUrl({
            action: 'read',
            expires: '03-09-2491'
        }).then(urls => urls[0]);

        return imagePath;
    } catch (error) {
        console.error(error);
        throw new Error('Error uploading image');
    }
};
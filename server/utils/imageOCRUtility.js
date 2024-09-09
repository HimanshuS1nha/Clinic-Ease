import tesseract from 'tesseract.js';

export const ocrImageWithTesseract = async (imageUrl) => {
    try {
        const { data: { text } } = await tesseract.recognize(imageUrl, 'eng');
        return text;
    } catch (error) {
        console.log('Tesseract OCR error:', error);
        throw new Error('OCR processing failed');
    }
};

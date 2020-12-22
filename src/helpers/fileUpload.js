export const fileUpload = async ( file ) => {
    const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dt4vb9dul/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'udemy-react-journalapp');
    formData.append('file', file);

    try {
        const response = await fetch( cloudinaryUrl, { method: 'POST', body: formData});

        if ( response.ok) {
            const cloudResponse = await response.json();
            return cloudResponse.secure_url;
        } else {
            throw await response.json();
        }
    } catch (error) {
        // console.log(error);
        throw error;
    }
}
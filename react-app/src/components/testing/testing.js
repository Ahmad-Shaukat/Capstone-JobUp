import S3FileUpload from 'react-s3';
import {uploadFile} from 'react-s3'
import { useSelector } from 'react-redux';



export default function Testing () {
    let user = useSelector((store) => store.session.user);
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        const fileInput = document.querySelector('input[type="file"]');
        formData.append('file-to-save', fileInput.files[0]);
    
        try {
          const response = await fetch(`/api/users/${user.id}/uploadImage`, {
            method: 'PUT',
            body: formData,
          });
    
          if (response.ok) {
            console.log('Image uploaded successfully');
            // Handle success as needed
          } else {
            console.error('Image upload failed');
            // Handle error as needed
          }
        } catch (error) {
          console.error('Error while uploading image', error);
          // Handle error as needed
        }
      };
    
    return <>
    <div>
        <form method='PUT' encType='multipart/form-data' onSubmit={handleSubmit}>
            <input type='file' name='file-to-save'></input>
            <button type='submit'>Upload</button>
        </form>
    </div>
    </>
}
import './SaveProduct.css';
import { useState } from 'react'
import { FaImages,RiUploadCloud2Fill } from 'react-icons/all'
import { db, storage } from '../../firebase';
import makeid from '../../helper/function'
import firebase from 'firebase'

const SaveProduct = () => {
    const [images, setimages] = useState([]);
    const [imagesUrl, setimagesUrl] = useState([])
    const [imagesnumber,setimagesnumber] = useState(0)
    const [displayimages, setdisplayimages] = useState([]);
    const [text, settext] = useState({
        title: '',
        description: ''
    })

    const [progress, setProgress] = useState(0);
    const textupdated = (e) => {
        var name = e.target.name;
        var value = e.target.value;

        settext((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const addingImages = (e) => {
        var imagesdisplay = URL.createObjectURL(e.target.files[0]);
        setdisplayimages((preve) => {
                return [
                    ...preve,
                    imagesdisplay
                ]
            })

        var name = e.target.files[0].name
        var imagesUrls = e.target.files[0];
        var data =  {
                    name: name,
                    url: imagesUrls
                }

        setimages((preve) => {
            return [
                ...preve,
                data
            ]
        });
        
    }
    

    const UploadImageToFirestore = async (images) => {
        var metadata = {
            contentType: 'image/jpeg',
        };
        var imageName = makeid(10)
        await storage.ref(`ProductImages/${imageName}${images.name}`).put(images.url, metadata)
            .on('state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress(progress);
                    console.log(progress)
                }, (err) => {
                    console.log(err);
                }, () => {
                    storage.ref('ProductImages').child(`${imageName}${images.name}`).getDownloadURL()
                        .then(fireBaseUrl => {
                            setimagesUrl((preve) => {
                                return [
                                    ...preve,
                                    fireBaseUrl
                                ]
                            })
                        })
                })
    }
    const handleUpload = async () => {

        images.forEach((image,i) => {
            UploadImageToFirestore(image);
            setimagesnumber(i+1)
        });

    }
    return (
        <div>
            <div style={{ display: 'block', margin: '20px' }}><h1>Register your Product</h1></div>
            <div className="saveProduct">
                <div className="taking-inputs">
                    <div>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="title" onChange={textupdated} value={text.title}/>
                            <label for="floatingInput">Product Title</label>
                        </div>
                        <div class="form-floating">
                            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: '100px' }} name="description" onChange={ textupdated} value={text.description}></textarea>
                            <label for="floatingTextarea2">Description</label>
                        </div>
                        <div style={{ display: 'flex', justifyContent:"center",alignItems:"center"}}>
                            <div className="image-input" style={{ margin: '20px' }}>
                                <label htmlFor='fileInput' className="images-upload-button">
                                    <FaImages style={{
                                        cursor: 'pointer', fontSize: '20px'
                                    }} />
                         Upload Images here
                    </label>
                                <input
                                    id='fileInput'
                                    type='file'
                                    accept='images/*'
                                    style={{ display: 'none' }}
                                    onChange={addingImages}
                                />
                            </div>
                            <button onClick={handleUpload} style={{ height: '40px' }} type="button" class="btn btn-success"><RiUploadCloud2Fill /> Submit {progress != 0 ? (`${imagesnumber}/${progress}`):null}</button>
                        </div>
                    </div>
                    <div className="images-upload">
                        {
                            displayimages.map((image, i) => {
                                return(<img key={i} src={image} id='image-preview' height="100px" width='100px' />)
                            })
                        }
                    
                    </div>
                </div>
            
            </div>
        </div>
    )
}

export default SaveProduct;
import './SaveProduct.css';
import { useState } from 'react'
import { FaImages, RiUploadCloud2Fill, GiStamper } from 'react-icons/all'
import { db, storage } from '../../firebase';
import makeid from '../../helper/function'
import firebase from 'firebase'

const SaveProduct = () => {
    // this is getting the image from the user
    const [images, setimages] = useState([]);

    // this is collecting the images firebase urls
    const [imagesUrl, setimagesUrl] = useState([])

    // this is getting the numbers of images user is want ta add in firestore
    const [imagesnumber, setimagesnumber] = useState(0)

    // ḍisplaying the image of user provided
    const [displayimages, setdisplayimages] = useState([]);

    // this is getting the text input
    const [text, settext] = useState({
        title: '',
        description: ''
    })

    const [price, setPrice] = useState(null);
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
        var data = {
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
        setProgress(0)
    }

    const passdataToFirebase = () => {
        setimagesUrl(imagesUrl.reverse());
        if (text.title != '' && text.description != ''&&price != null) {
            console.log(text);
            console.log(imagesUrl);

            db.collection('products').add({
                details: text,
                price: price,
                images: imagesUrl
            })
            alert('Registered Successfully')
            // returning back to normal
            setPrice(0);
            setimagesUrl([])
            setimages([])
            settext({
                title: '',
                description: ''
            })
            setimagesnumber(0)
            setdisplayimages([]);
            setProgress(0)
        } else {
            alert('Title , description and price should not be empty')
        }
        
    }

    const priceChanged = (e) => {
        var value = e.target.value;
        setPrice(value);

    }
    const handleUpload = async () => {

        if (images.length != 0) {
            await images.forEach((image, i) => {
                UploadImageToFirestore(image);
                setimagesnumber(i + 1)
            
            });
        } else {
            alert('Provide minimum one image for your product')
        }
        
    }
    return (
        <div>
            <div style={{ display: 'block', margin: '20px' }}><h1>Register your Product</h1></div>
            <div className="saveProduct">
                <div className="taking-inputs">
                    <div>
                        <div  style={{display:'flex',width:'100%'}}>
                            <div className="form-floating mb-3" style={{width:'100%',marginRight:'20px'}}>
                                <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" name="title" onChange={textupdated} value={text.title} />
                                <label for="floatingInput">Product Title</label>
                            </div>
                            <div className="form-floating mb-3">
                            
                                <input type="number" className="form-control" id="floatingInput" placeholder="name@example.com" name="price" onChange={priceChanged} value={price} />
                                <label for="floatingInput">Price in Rupees</label>
                            </div>
                        </div>
                        <div className="form-floating">
                            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: '100px' }} name="description" onChange={textupdated} value={text.description}></textarea>
                            <label for="floatingTextarea2">Description</label>
                        </div>
                        <div style={{ opacity: '50%', textTransform: 'capitalize', textAlign: 'center' }}>
                            Recommended to upload images first
                        </div>
                        <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                            
                            <div className="image-input" style={{ margin: '20px', cursor: 'pointer' }}>
                                <label htmlFor='fileInput' className="images-upload-button" style={{ border: 'none', transition: '0.4s', cursor: 'pointer' }}>
                                    <FaImages style={{
                                        cursor: 'pointer', fontSize: '20px'
                                    }} /> Provide Images here
                                        </label>
                                <input
                                    id='fileInput'
                                    type='file'
                                    accept='images/*'
                                    style={{ display: 'none' }}
                                    onChange={addingImages}
                                />
                            </div>
                            <button onClick={handleUpload} style={{ height: '40px', backgroundColor: 'rgb(91, 50, 205)', color: 'white', paddingBottom: '15px' }} type="button" className="btn images-upload-button"><RiUploadCloud2Fill /> Upload Images {(`${imagesnumber}/${progress}`)}</button>
                        </div>
                    </div>
                    <button onClick={passdataToFirebase} style={{ height: '40px', width: '100%' }} type="button" className="btn btn-success"><GiStamper /> Register Your Product</button>
                    <div className="images-upload">
                        {
                            displayimages.map((image, i) => {
                                return (<img key={i} src={image} id='image-preview' height="100px" width='100px' />)
                            })
                        }
                    </div>
                </div>
            </div>
            
        </div>
        
    )
}

export default SaveProduct;
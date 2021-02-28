export default function makeid(lenght) {
    var result = ''
    var char =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charlenght = char.length;
    for (var i = 0; i < lenght; i++){
        result += char.charAt(Math.floor(Math.random()*charlenght))
    }
    return result
}

 // if (images) {
        //     var imageName = makeid(10)
        //     const uploadTask = storage.ref(`images/${imageName}.jpg`)
        //         .put(images);
        //     uploadTask.on('state_changed', (snapshot) => {
        //         const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        //         setProgress(progress);
        //         console.log(progress)
        //     }, (err) => {
        //             console.log(err);
        //     }, () => {
        //             storage.ref('images').child(`${imageName}.jpg`)
        //                 .getDownloadURL()
        //                 .then((imageurl) => {
        //                     db.collection('product').add({
        //                         info: text,
        //                         productImages: imageurl 
        //                     })
        //             })
        //     })
        // }
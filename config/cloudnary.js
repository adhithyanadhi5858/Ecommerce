const v2 = require( 'cloudinary')
const cloudinary = v2()

cloudinary.config({ 
    cloud_name: 'dffkofdui', 
    api_key: '483673411592632', 
    api_secret: '<your_api_secret>'
});

const cloudinaryInstance = cloudinary

module.exports = {cloudinaryInstance}

require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'villatranquila', 
    api_key: '186314118576239', 
    api_secret: '29DVPufUG52OvVY90R39yO7KPBw' 
  });

  module.exports ={cloudinary};
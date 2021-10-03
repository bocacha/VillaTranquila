const { cloudinary } = require('../utils/cloudinary');
const { Router } = require('express');
const router = Router();

router.get('/images',async (req, res) => {
    try {
    const { resources } = await cloudinary.search
    .expression('folder:Cabins')
    .sort_by('public_id','desc')
    .max_results(30)
    .execute();
    
    const publicIds = resources.map((file) => file.public_id);
    res.send(publicIds);
    }
    catch(error){
        console.log(error);
    }
})

module.exports = router;


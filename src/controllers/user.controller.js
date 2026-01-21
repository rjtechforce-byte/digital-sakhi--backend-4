const User = require('../modals/user.modal');
// POST /api/users 

const createUser = async (req, res) => {
    try {
        const { name, phone, email, address } = req.body;

           const isUserExist = await User.findOne({phone});

       if (isUserExist) {
        return res.status(400).json({ message: 'सुरक्षा एवं पारदर्शिता के उद्देश्य से, प्रत्येक मोबाइल नंबर पर केवल एक ही उपयोगकर्ता का पंजीकरण मान्य है।' });
       }

        if (!name || !phone || !email || !address) {
            return res.status(400).json({ message: 'कृपया आगे बढ़ने से पहले सभी आवश्यक जानकारी भरना सुनिश्चित करें।' });
        }

        if (phone.length !== 10) {
            return res.status(400).json({ message: 'कृपया सुनिश्चित करें कि मोबाइल नंबर 10 अंकों का हो तथा उसमें किसी प्रकार का स्पेस न हो।' });
        }

    

        const newUser = await User.create({ name, phone, email, address });
        const { addRowToSheet } = require("../utils/googleSheet.helper");

        await addRowToSheet({
          name,
          phone,
          email,
          address
        });

        res.status(201).json({ message: 'उपयोगकर्ता का पंजीकरण सफलतापूर्वक पूरा हो गया है।', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'उपयोगकर्ता पंजीकरण के दौरान कोई त्रुटि हुई। कृपया पुनः प्रयास करें।', error });
    }
}

async function loginUser (req, res) {

    const {phone} = req.body;

    const user = await User.findOne({ phone });

    if (!user ) {
         return res.status(404).json({
      message: "यह उपयोगकर्ता पंजीकृत नहीं है। कृपया पहले पंजीकरण करें।"
    });
    }

    if (user.examAttempts >= 3) {
       return res.status(403).json({
      message: "आप 3 बार परीक्षा दे चुके हैं, अब अनुमति नहीं है"
    });
    }

    return res.status(200).json({
    message: "आप सफलतापूर्वक लॉगिन हो गए हैं।",
    User: {
        phone: user.phone,
        name: user.name,
        address: user.address,
        _id: user._id, 
    }
  });


}

 

module.exports = {
    createUser,
    loginUser
};

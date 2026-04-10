const questions = [
{
id: 1,
question: "डिजिटल मार्केटिंग किस माध्यम से होती है?",
options: ["टीवी","रेडियो","इंटरनेट","पोस्टर"],
correctAnswer: 2
},
{
id: 2,
question: "डिजिटल मार्केटिंग का मुख्य लाभ क्या है?",
options: ["अधिक खर्च","कम लागत व तेज परिणाम","धीमी प्रक्रिया","केवल स्थानीय क्षेत्र"],
correctAnswer: 1
},
{
id: 3,
question: "डिजिटल मार्केटिंग में Analytics किसके लिए होता है?",
options: ["प्रिंटिंग","डेटा ट्रैकिंग","बिल बनाने","पैकिंग"],
correctAnswer: 1
},
{
id: 4,
question: "पारंपरिक मार्केटिंग कैसी होती है?",
options: ["ग्लोबल","तेज","सीमित पहुंच","24×7 सक्रिय"],
correctAnswer: 2
},
{
id: 5,
question: "डिजिटल मार्केटिंग किस प्रकार का संवाद देती है?",
options: ["एकतरफा","दोतरफा","केवल आवाज","कोई नहीं"],
correctAnswer: 1
},
{
id: 6,
question: "पारंपरिक माध्यम कौन सा है?",
options: ["Facebook","TV","Instagram","Google Ads"],
correctAnswer: 1
},
{
id: 7,
question: "डिजिटल मार्केटिंग में कौन-सा टूल आता है?",
options: ["Poster","YouTube Ads","Sticker","Pamphlet"],
correctAnswer: 1
},
{
id: 8,
question: "ब्रांडिंग का मुख्य उद्देश्य क्या है?",
options: ["ग्राहक भ्रमित करना","पहचान और विश्वास बनाना","ज्यादा रंग लगाना","महंगा दिखाना"],
correctAnswer: 1
},
{
id: 9,
question: "ब्रांडिंग का हिस्सा क्या है?",
options: ["दुकान की पुताई","लोगो डिजाइन","माइक खरीदना","नया फोन"],
correctAnswer: 1
},
{
id: 10,
question: "“Tagline” कैसी होनी चाहिए?",
options: ["लंबी","कठिन","छोटी व प्रभावशाली","केवल अंग्रेजी में"],
correctAnswer: 2
},
{
id: 11,
question: "ब्रांड के रंग क्यों महत्वपूर्ण हैं?",
options: ["सजावट के लिए","स्थिर पहचान के लिए","फोटो लेने के लिए","WhatsApp स्टेटस के लिए"],
correctAnswer: 1
},
{
id: 12,
question: "एक ब्रांड का सबसे पहला तत्व क्या होता है?",
options: ["पैकिंग","स्टिकर","लोकेशन","नाम (Name)"],
correctAnswer: 3
},
{
id: 13,
question: "पैकेजिंग का उद्देश्य क्या है?",
options: ["उत्पाद छुपाना","सुरक्षा और आकर्षण","महंगा करना","बड़ा दिखाना"],
correctAnswer: 1
},
{
id: 14,
question: "कौन-सा ब्रांड भारतीय देसी छवि से प्रसिद्ध है?",
options: ["Coca-Cola","Pepsi","Patanjali","Apple"],
correctAnswer: 2
},
{
id: 15,
question: "फोटो के लिए सबसे अच्छी लाइट कौन सी है?",
options: ["प्राकृतिक रोशनी","गहरी","लाल","फ्लैश"],
correctAnswer: 0
},
{
id: 16,
question: "प्रोडक्ट फोटो का बैकग्राउंड कैसा हो?",
options: ["भड़कीला","रंग-बिरंगा","गहरा","सादा"],
correctAnswer: 3
},
{
id: 17,
question: "प्रोडक्ट फोटो में फोकस कैसा होना चाहिए?",
options: ["धुंधला","साफ","हिलता हुआ","कहीं भी"],
correctAnswer: 1
},
{
id: 18,
question: "धातु वाले उत्पाद की फोटो लेते समय किससे बचना चाहिए?",
options: ["फोकस","शॉर्पनेस","क्लोज अप","रिफ्लेक्शन"],
correctAnswer: 3
},
{
id: 19,
question: "फोटो कितने एंगल से लेनी चाहिए?",
options: ["एक","दो","तीन या अधिक","केवल नीचे से"],
correctAnswer: 2
},
{
id: 20,
question: "Snapseed किसके लिए होता है?",
options: ["बिल बनाने","फोटो एडिट","लोकेशन ट्रैक","पैकिंग"],
correctAnswer: 1
},
{
id: 21,
question: "WhatsApp Business का लोगो कैसा होता है?",
options: ["लाल फोन","नीला W","हरे रंग का फोन + B","C में सफेद लाइन"],
correctAnswer: 2
},
{
id: 22,
question: "WhatsApp Business किसके लिए उपयोगी है?",
options: ["व्यवसाय के लिए","गाने सुनने","वीडियो डाउनलोड करने","गेम खेलने"],
correctAnswer: 0
},
{
id: 23,
question: "कैटलॉग क्या दिखाता है?",
options: ["ग्राहक का नाम","उत्पाद सूची","गाने","कॉल हिस्ट्री"],
correctAnswer: 1
},
{
id: 24,
question: "Quick Reply किसके लिए होती है?",
options: ["लंबा मैसेज लिखने","तैयार उत्तर भेजने","रिंगटोन बदलने","फोटो सेव करने"],
correctAnswer: 1
},
{
id: 25,
question: "Welcome Message कब भेजा जाता है?",
options: ["ग्राहक पहली बार मैसेज करे","मोबाइल बंद हो","WhatsApp बंद हो","ग्रुप लेफ्ट हो"],
correctAnswer: 0
},
{
id: 26,
question: "Broadcast का मुख्य उपयोग क्या है?",
options: ["वीडियो भेजना","प्रमोशन छुपाना","एक साथ कई ग्राहकों को संदेश भेजना","नंबर बदलना"],
correctAnswer: 2
},
{
id: 27,
question: "WhatsApp में दो-चरणीय सत्यापन क्यों ज़रूरी है?",
options: ["गेम अनलॉक","अकाउंट सुरक्षा","स्टेटस बढ़ाना","डेटा छुपाना"],
correctAnswer: 1
},
{
id: 28,
question: "Personal अकाउंट को Business में बदलने का विकल्प क्या है?",
options: ["VIP Mode","Convert Mode","Power Mode","Switch to Professional Account"],
correctAnswer: 3
},
{
id: 29,
question: "Instagram पर सबसे ज्यादा Reach किससे मिलती है?",
options: ["Photos","Reels","Notes","IGTV"],
correctAnswer: 1
},
{
id: 30,
question: "Bio में क्या होना चाहिए?",
options: ["साफ जानकारी + CTA","केवल इमोजी","5 लाइन का कोड","लंबा पैराग्राफ"],
correctAnswer: 0
},
{
id: 31,
question: "Instagram का उपयोग किसके लिए होता है?",
options: ["बिजनेस प्रमोशन","खाना बनाने","गाना लिखने","गेमिंग"],
correctAnswer: 0
},
{
id: 32,
question: "Instagram Shopping के लिए क्या आवश्यक है?",
options: ["Facebook Page","TV","printer","bumper"],
correctAnswer: 0
},
{
id: 33,
question: "Instagram पर हैशटैग क्यों उपयोग होते हैं?",
options: ["पोस्ट छुपाने","Reach बढ़ाने","बैकअप लेने","अकाउंट बंद करने"],
correctAnswer: 1
},
{
id: 34,
question: "Amazon FBA का पूरा नाम क्या है?",
options: ["Fast Buy Amazon","Free Buy Amazon","Fulfilled By Amazon","Find Best App"],
correctAnswer: 2
},
{
id: 35,
question: "Flipkart किस देश की कंपनी है?",
options: ["USA","India","China","UK"],
correctAnswer: 1
},
{
id: 36,
question: "Meesho किसके लिए सबसे अच्छा है?",
options: ["बड़े उद्योग","सरकारी ऑफिस","गृहिणियाँ और छोटे व्यवसाय","स्कूल"],
correctAnswer: 2
},
{
id: 37,
question: "Meesho पर उत्पाद डालने का पहला स्टेप?",
options: ["मोबाइल बदलना","App डाउनलोड करना","फोटो हटाना","वीडियो बनाना"],
correctAnswer: 1
},
{
id: 38,
question: "Amazon, Flipkart और Meesho किसके उदाहरण हैं?",
options: ["बैंक","टेलीविजन चैनल","प्रिंट मीडिया","ई-कॉमर्स प्लेटफॉर्म"],
correctAnswer: 3
},
{
id: 39,
question: "Meesho में पब्लिश करने के लिए क्या जरूरी है?",
options: ["3–4 स्पष्ट फोटो","गाना","वीडियो गेम","कोई नहीं"],
correctAnswer: 0
},
{
id: 40,
question: "Flipkart Seller Hub किसके लिए है?",
options: ["फोटो एडिट","प्रोडक्ट सेलिंग","गाने डाउनलोड","मूवी देखने"],
correctAnswer: 1
},
{
id: 41,
question: "Chat Backup का उपयोग क्यों होता है?",
options: ["स्टेटस सेव","चैट सुरक्षित रखने","फोटो ब्लर","इमोजी बढ़ाना"],
correctAnswer: 1
},
{
id: 42,
question: "अच्छा कंटेंट किसे कहा जाता है?",
options: ["स्पष्ट व उपयोगी जानकारी","बेकार पोस्ट","धुंधली फोटो","लंबी वीडियो"],
correctAnswer: 0
},
{
id: 43,
question: "Content Marketing में क्या शामिल है?",
options: ["ब्लॉग, वीडियो, फोटो","केवल PDF","केवल Excel","केवल SMS"],
correctAnswer: 0
},
{
id: 44,
question: "सोशियल मीडिया पोस्ट कितने दिन में करनी चाहिए?",
options: ["3–4 बार सप्ताह","साल में एक बार","महीने में एक बार","कभी भी"],
correctAnswer: 0
},
{
id: 45,
question: "ग्राहक पहले क्या करता है?",
options: ["पढ़ता","देखता","चुप रहता","गाना सुनता"],
correctAnswer: 1
},
{
id: 46,
question: "अच्छी फोटो का क्या फायदा है?",
options: ["ग्राहक आकर्षित","मेमोरी भर जाती है","फोन खराब","कैमरा टूट जाता है"],
correctAnswer: 0
},
{
id: 47,
question: "Instagram Ads किसके लिए होते हैं?",
options: ["Reach और Sales बढ़ाने","फोन हैक करने","ID हटाने","Storage बढ़ाने"],
correctAnswer: 0
},
{
id: 48,
question: "WhatsApp Catalog किस तरह का टूल है?",
options: ["Product Marketing","Video Editing","Recharge","Gaming"],
correctAnswer: 0
},
{
id: 49,
question: "ऑनलाइन व्यापार में सबसे महत्वपूर्ण क्या है?",
options: ["पैकेजिंग","केवल डिस्काउंट","ऐप बदलना","भरोसा और सेवा"],
correctAnswer: 3
},
{
id: 50,
question: "डिजिटल मार्केटिंग का अंतिम लक्ष्य क्या है?",
options: ["ग्राहक तक पहुँचना और बिक्री बढ़ाना","केवल फोटो एडिट","फोन बदलना","ऐप बंद करना"],
correctAnswer: 0
}
];

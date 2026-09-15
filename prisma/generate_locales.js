const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../src/locales');

const en = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'));

const translations = {
  kn: {
    appName: "Farmer Docx",
    appTagline: "ನಿಮ್ಮ ಕೃಷಿ ಸಾಲದ ದಾಖಲೆಗಳನ್ನು ಸರಳ ಕನ್ನಡದಲ್ಲಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ",
    helpline: "ಕರೆ ಮಾಡಿ 434 - ಗ್ರಾಮೀಣ ಸಾಲ ನೆರವು ಸಹಾಯವಾಣಿ",
    nav: {
      home: "ಮುಖಪುಟ",
      dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      documents: "ನನ್ನ ದಾಖಲೆಗಳು",
      upload: "ದಾಖಲೆ ಅಪ್‌ಲೋಡ್",
      assistant: "AI ಸಾಲ ಸಹಾಯಕ",
      eligibility: "ಅರ್ಹತೆ ಪರಿಶೀಲನೆ",
      repayment: "ಮರುಪಾವತಿ ವಿವರಗಳು",
      glossary: "ಕೃಷಿ ಶಬ್ದಕೋಶ",
      ruralAccess: "ಗ್ರಾಮೀಣ ಸಹಾಯವಾಣಿ (434)",
      callSimulation: "434 ಕರೆ ಸಿಮ್ಯುಲೇಟರ್",
      adminDashboard: "ಏರಿಯಾ ಅಡ್ಮಿನ್ ಪೋರ್ಟಲ್",
      superAdmin: "ಸೂಪರ್ ಅಡ್ಮಿನ್",
      login: "ಲಾಗಿನ್",
      register: "ನೋಂದಣಿ",
      logout: "ಲಾಗ್‌ಔಟ್",
      settings: "ಸೇಟಿಂಗ್ಸ್",
      profile: "ಪ್ರೊಫೈಲ್"
    },
    onboarding: {
      title: "ರೈತ ಖಾತೆ ನೋಂದಣಿ",
      subtitle: "ವೈಯಕ್ತಿಕ ಸಹಾಯಕ್ಕಾಗಿ ನಿಮ್ಮ ಸ್ಥಳ ಮತ್ತು ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      step1: "ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      step2: "ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      step3: "ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      step4: "ಸಂಪರ್ಕ ಮಾಧ್ಯಮ",
      text: "ಪಠ್ಯ ಮಾತ್ರ",
      voice: "ಧ್ವನಿ ಮಾತ್ರ",
      both: "ಪಠ್ಯ ಮತ್ತು ಧ್ವನಿ",
      fullName: "ಪೂರ್ಣ ಹೆಸರು",
      mobileNumber: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
      password: "ಪಾಸ್‌ವರ್ಡ್",
      village: "ಗ್ರಾಮ / ಪಂಚಾಯತ್",
      taluk: "ತಾಲೂಕು / ಬ್ಲಾಕ್",
      pincode: "ಪಿನ್‌ಕೋಡ್",
      consent: "ನನ್ನ ಸಾಲದ ದಾಖಲೆಗಳ ವಿಶ್ಲೇಷಣೆಗೆ ನಾನು ಸಮ್ಮತಿಸುತ್ತೇನೆ."
    }
  },
  ml: {
    appName: "Farmer Docx",
    appTagline: "നിങ്ങളുടെ കാർഷിക വായ്പ രേഖകൾ ലളിതമായ മലയാളത്തിൽ മനസ്സിലാക്കുക",
    helpline: "വിളിക്കുക 434 - ഗ്രാമീണ വായ്പ സഹായ ഹെൽപ്‌ലൈൻ",
    nav: {
      home: "ഹോം",
      dashboard: "ഡാഷ്‌ബോർഡ്",
      documents: "എന്റെ രേഖകൾ",
      upload: "രേഖ അപ്‌ലോഡ് ചെയ്യുക",
      assistant: "AI വായ്പ സഹായി",
      eligibility: "യോഗ്യത പരിശോധന",
      repayment: "തിരിച്ചടവ് വിവരങ്ങൾ",
      glossary: "കാർഷിക പദാവലി",
      ruralAccess: "ഗ്രാമ സഹായം (434)",
      callSimulation: "434 കോൾ സിമുലേറ്റർ",
      adminDashboard: "ഏരിയ അഡ്മിൻ പോർട്ടൽ",
      superAdmin: "സൂപ്പർ അഡ്മിൻ",
      login: "ലോഗിൻ",
      register: "രജിസ്റ്റർ",
      logout: "ലോഗ്ഔട്ട്",
      settings: "സെറ്റിംഗ്സ്",
      profile: "പ്രൊഫൈൽ"
    }
  },
  mr: {
    appName: "Farmer Docx",
    appTagline: "तुमची शेती कर्ज कागदपत्रे सोप्या मराठीत समजून घ्या",
    helpline: "कॉल करा 434 - ग्रामीण कर्ज मदत हेल्पलाइन",
    nav: {
      home: "मुख्यपृष्ठ",
      dashboard: "डॅशबोर्ड",
      documents: "माझी कागदपत्रे",
      upload: "कागदपत्र अपलोड करा",
      assistant: "AI कर्ज सहाय्यक",
      eligibility: "पात्रता तपासणी",
      repayment: "परतफेड तपशील",
      glossary: "शेती शब्दकोश",
      ruralAccess: "ग्रामीण हेल्पलाइन (434)",
      callSimulation: "434 कॉल सिम्युलेटर",
      adminDashboard: "क्षेत्र प्रशासक पोर्टल",
      superAdmin: "मुख्य प्रशासक",
      login: "लॉगिन",
      register: "नोंदणी",
      logout: "लॉगआउट",
      settings: "सेटिंग्ज",
      profile: "प्रोफाइल"
    }
  },
  or: {
    appName: "Farmer Docx",
    appTagline: "ଆପଣଙ୍କର କୃଷି ଋଣ ଦଲିଲସମୂହ ସହଜ ଓଡ଼ିଆରେ ବୁଝନ୍ତୁ",
    helpline: "କଲ୍ କରନ୍ତୁ ୪୩୪ - ଗ୍ରାମୀଣ ଋଣ ସହାୟତା ହେଲ୍ପଲାଇନ୍",
    nav: {
      home: "ମୁଖ୍ୟ ପୃଷ୍ଠା",
      dashboard: "ଡ୍ୟାସବୋର୍ଡ",
      documents: "ମୋର ଦଲିଲ",
      upload: "ଦଲିଲ ଅପଲୋଡ୍",
      assistant: "AI ଋଣ ସହାୟକ",
      eligibility: "ଯୋଗ୍ୟତା ଯାଞ୍ଚ",
      repayment: "ପରିଶୋଧ ବିବରଣୀ",
      glossary: "କୃଷି ଶବ୍ଦକୋଷ",
      ruralAccess: "ଗ୍ରାମୀଣ ହେଲ୍ପଲାଇନ୍ (୪୩୪)",
      callSimulation: "୪୩୪ କଲ୍ ସିମୁଲେଟର",
      adminDashboard: "ଅଞ୍ଚଳ ଆଡମିନ୍ ପୋର୍ଟାଲ୍",
      superAdmin: "ମୁଖ୍ୟ ଆଡମିନ୍",
      login: "ଲଗଇନ୍",
      register: "ପଞ୍ଜୀକରଣ",
      logout: "ଲଗଆଉଟ୍",
      settings: "ସେଟିଂସ",
      profile: "ପ୍ରୋଫାଇଲ୍"
    }
  },
  pa: {
    appName: "Farmer Docx",
    appTagline: "ਆਪਣੇ ਖੇਤੀਬਾੜੀ ਕਰਜ਼ੇ ਦੇ ਦਸਤਾਵੇਜ਼ਾਂ ਨੂੰ ਸਰਲ ਪੰਜਾਬੀ ਵਿੱਚ ਸਮਝੋ",
    helpline: "ਕਾਲ ਕਰੋ 434 - ਗ੍ਰਾਮੀਣ ਕਰਜ਼ਾ ਸਹਾਇਤਾ ਹੈਲਪਲਾਈਨ",
    nav: {
      home: "ਮੁੱਖ ਪੰਨਾ",
      dashboard: "ਡੈਸ਼ਬੋਰਡ",
      documents: "ਮੇਰੇ ਦਸਤਾਵੇਜ਼",
      upload: "ਦਸਤਾਵੇਜ਼ ਅੱਪਲੋਡ ਕਰੋ",
      assistant: "AI ਕਰਜ਼ਾ ਸਹਾਇਕ",
      eligibility: "ਯੋਗਤਾ ਜਾਂਚ",
      repayment: "ਮੁੜ-ਭੁਗਤਾਨ ਵੇਰਵੇ",
      glossary: "ਖੇਤੀਬਾੜੀ ਸ਼ਬਦਾਵਲੀ",
      ruralAccess: "ਗ੍ਰਾਮੀਣ ਹੈਲਪਲਾਈਨ (434)",
      callSimulation: "434 ਕਾਲ ਸਿਮੂਲੇਟਰ",
      adminDashboard: "ਖੇਤਰ ਐਡਮਿਨ ਪੋਰਟਲ",
      superAdmin: "ਸੁਪਰ ਐਡਮਿਨ",
      login: "ਲੌਗਇਨ",
      register: "ਰਜਿਸਟਰ",
      logout: "ਲੌਗਆਉਟ",
      settings: "ਸੈਟਿੰਗਾਂ",
      profile: "ਪ੍ਰੋਫਾਈਲ"
    }
  },
  gu: {
    appName: "Farmer Docx",
    appTagline: "તમારા કૃષિ લોન દસ્તાવેજો સરળ ગુજરાતીમાં સમજો",
    helpline: "કૉલ કરો 434 - ગ્રામીણ લોન સહાયતા હેલ્પલાઇન",
    nav: {
      home: "હોમ",
      dashboard: "ડેશબોર્ડ",
      documents: "મારા દસ્તાવેજો",
      upload: "દસ્તાવેજ અપલોડ કરો",
      assistant: "AI લોન સહાયક",
      eligibility: "પાત્રતા ચકાસણી",
      repayment: "ચુકવણી વિગતો",
      glossary: "કૃષિ શબ્દકોશ",
      ruralAccess: "ગ્રામીણ હેલ્પલાઇન (434)",
      callSimulation: "434 કૉલ સિમ્યુલેટર",
      adminDashboard: "એરિયા એડમિન પોર્ટલ",
      superAdmin: "સુપર એડમિન",
      login: "લૉગિન",
      register: "રજિસ્ટર",
      logout: "લૉગઆઉટ",
      settings: "સેટિંગ્સ",
      profile: "પ્રોફાઇલ"
    }
  }
};

// Deep merge with fallback to EN
function mergeWithFallback(target, fallback) {
  const result = { ...fallback };
  for (const key in target) {
    if (typeof target[key] === 'object' && target[key] !== null && !Array.isArray(target[key])) {
      result[key] = mergeWithFallback(target[key], fallback[key] || {});
    } else {
      result[key] = target[key];
    }
  }
  return result;
}

Object.keys(translations).forEach(lang => {
  const fullLoc = mergeWithFallback(translations[lang], en);
  fs.writeFileSync(path.join(localesDir, `${lang}.json`), JSON.stringify(fullLoc, null, 2), 'utf8');
  console.log(`Generated locale: ${lang}.json`);
});

console.log('Locales generation complete!');

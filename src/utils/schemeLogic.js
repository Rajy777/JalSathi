export const getEligibleSchemes = (farmerData) => {
    const { landSize, district, irrigation } = farmerData;

    const schemes = [
        {
            id: 1,
            name: {
                en: "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
                hi: "प्रधानमंत्री कृषि सिंचाई योजना",
                mr: "प्रधानमंत्री कृषी सिंचन योजना"
            },
            description: {
                en: "Per Drop More Crop - Focus on water use efficiency @ farm level through Micro Irrigation.",
                hi: "प्रति बूंद अधिक फसल - सूक्ष्म सिंचाई के माध्यम से कृषि स्तर पर जल उपयोग दक्षता पर ध्यान केंद्रित करें।",
                mr: "प्रति थेंब अधिक पीक - सूक्ष्म सिंचनाद्वारे शेत स्तरावर पाणी वापर कार्यक्षमतेवर लक्ष केंद्रित करा."
            },
            minLand: 0,
            maxLand: 10,
            documents: ["Aadhar Card", "7/12 Extract", "Bank Passbook"],
            benefits: "Up to 80% subsidy for drip installation",
            link: "https://pmksy.gov.in/"
        },
        {
            id: 2,
            name: {
                en: "Chief Minister Solar Agriculture Pump Scheme",
                hi: "मुख्यमंत्री सौर कृषि पंप योजना",
                mr: "मुख्यमंत्री सौर कृषी पंप योजना"
            },
            description: {
                en: "Subsidy for solar pumps to ensure daytime irrigation power.",
                hi: "दिन के समय सिंचाई शक्ति सुनिश्चित करने के लिए सौर पंपों के लिए सब्सिडी।",
                mr: "दिवसा सिंचन ऊर्जा सुनिश्चित करण्यासाठी सौर पंपांसाठी सबसिडी."
            },
            minLand: 0.5,
            maxLand: 5,
            benefits: "90% subsidy for SC/ST farmers, 95% for others",
            documents: ["Caste Certificate (if applicable)", "Land Documents"],
            link: "#"
        }
    ];

    return schemes.filter(scheme => {
        const landEligible = landSize >= scheme.minLand && landSize <= scheme.maxLand;
        return landEligible;
    });
};

// Mock location utility functions for demo purposes

export const updateUserLocation = async (userId: string, locationData: {
  village?: string;
  district?: string;
  state?: string;
}) => {
  const { village, district, state } = locationData;
  
  // Get display names for state and district
  const stateDisplayName = getStateDisplayName(state || '');
  const districtDisplayName = district ? district.charAt(0).toUpperCase() + district.slice(1) : '';
  
  // Construct full address
  const location = [
    village,
    districtDisplayName,
    stateDisplayName
  ].filter(Boolean).join(", ");
  
  // Simulate API delay
  return new Promise(resolve => {
    setTimeout(() => {
      // Log the update that would happen in a real app
      console.log('Location updated for user:', userId, { location, village, district, state });
      
      // Return mock success response
      resolve({ success: true, location });
    }, 500);
  });
};

export const getStateDisplayName = (stateCode: string): string => {
  const stateMap: Record<string, string> = {
    'andhra': 'Andhra Pradesh',
    'arunachal': 'Arunachal Pradesh',
    'assam': 'Assam',
    'bihar': 'Bihar',
    'chattisgarh': 'Chhattisgarh',
    'delhi': 'Delhi',
    'goa': 'Goa',
    'gujarat': 'Gujarat',
    'haryana': 'Haryana',
    'himachal': 'Himachal Pradesh',
    'j&k': 'Jammu & Kashmir',
    'jharkhand': 'Jharkhand',
    'karnataka': 'Karnataka',
    'kerala': 'Kerala',
    'mp': 'Madhya Pradesh',
    'maharashtra': 'Maharashtra',
    'manipur': 'Manipur',
    'meghalaya': 'Meghalaya',
    'mizoram': 'Mizoram',
    'nagaland': 'Nagaland',
    'orissa': 'Odisha',
    'punjab': 'Punjab',
    'rajasthan': 'Rajasthan',
    'sikkim': 'Sikkim',
    'tamil': 'Tamil Nadu',
    'telangana': 'Telangana',
    'tripura': 'Tripura',
    'up': 'Uttar Pradesh',
    'uttarakhand': 'Uttarakhand',
    'wb': 'West Bengal'
  };
  
  return stateMap[stateCode.toLowerCase()] || stateCode;
};

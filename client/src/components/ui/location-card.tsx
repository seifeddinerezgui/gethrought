import { Location } from "@shared/schema";

interface LocationCardProps {
  location: Location;
}

const LocationCard = ({ location }: LocationCardProps) => {
  // Function to create a Google Maps link
  const getGoogleMapsLink = (location: Location) => {
    const address = `${location.address}, ${location.postalCode} ${location.city}, ${location.country}`;
    return `https://maps.google.com/?q=${encodeURIComponent(address)}`;
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow h-full">
      <h4 className="text-xl font-bold mb-3">{location.title}</h4>
      <address className="not-italic text-gray-600 mb-3">
        {location.address}<br />
        {location.postalCode && `${location.postalCode} `}{location.city}
      </address>
      <div className="flex flex-col space-y-2">
        <a 
          href={`tel:${location.phone.replace(/\s/g, '')}`} 
          className="text-[#E00000] hover:underline"
        >
          {location.phone}
        </a>
        <a 
          href={`mailto:${location.email}`} 
          className="text-[#E00000] hover:underline"
        >
          {location.email}
        </a>
        <a 
          href={getGoogleMapsLink(location)} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[#E00000] hover:underline inline-flex items-center mt-2"
        >
          <i className="fas fa-map-marker-alt mr-2"></i>
          Voir sur la carte
        </a>
      </div>
    </div>
  );
};

export default LocationCard;

import { Country } from "@/types";
import { useNavigate } from "react-router-dom";

interface CountryCardProps {
  country: Country;
}

export function CountryCard({ country }: CountryCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/country/${country.code}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow duration-200 flex flex-col items-center min-h-[120px] justify-center"
    >
      <div className="text-6xl mb-2">{country.emoji}</div>
      <h3 className="font-semibold text-center text-sm">{country.name}</h3>
    </div>
  );
}

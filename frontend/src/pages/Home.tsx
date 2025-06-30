import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "@/api/graphql";
import { Country } from "@/types";
import { CountryCard } from "@/components/CountryCard";
import { AddCountryForm } from "@/components/AddCountryForm";

export function HomePage() {
  const { loading, error, data } = useQuery<{ countries: Country[] }>(
    GET_COUNTRIES
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-lg text-red-500">Erreur: {error.message}</div>
      </div>
    );
  }

  const countries = data?.countries || [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Formulaire d'ajout */}
      <div className="mb-8">
        <AddCountryForm />
      </div>

      {/* Liste des pays */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {countries.map((country) => (
          <CountryCard key={country.id} country={country} />
        ))}
      </div>

      {countries.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          Aucun pays trouvé. Ajoutez-en un avec le formulaire ci-dessus !
        </div>
      )}
    </div>
  );
}

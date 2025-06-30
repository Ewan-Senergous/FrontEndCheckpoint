import { useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { GET_COUNTRY } from "@/api/graphql";
import { Country } from "@/types";
import { Button } from "@/components/ui/button";

export function CountryDetailPage() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery<{ country: Country }>(GET_COUNTRY, {
    variables: { code },
    skip: !code,
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

  if (error || !data?.country) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
        <div className="text-lg text-red-500">
          {error ? `Erreur: ${error.message}` : "Pays non trouvé"}
        </div>
        <Button onClick={() => navigate("/")} variant="bleu">
          Retour à la liste
        </Button>
      </div>
    );
  }

  const country = data.country;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        {/* Emoji du pays */}
        <div className="text-center mb-8">
          <div className="text-9xl mb-4">{country.emoji}</div>
        </div>

        {/* Informations du pays */}
        <div className="space-y-6 text-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Name : {country.name} ({country.code})
            </h1>
          </div>

          {country.continent && (
            <div>
              <h2 className="text-xl font-medium">
                Continent : {country.continent.name}
              </h2>
            </div>
          )}
        </div>

        {/* Bouton retour */}
        <div className="mt-8 text-center">
          <Button onClick={() => navigate("/")} variant="noir">
            Retour à la liste
          </Button>
        </div>
      </div>
    </div>
  );
}

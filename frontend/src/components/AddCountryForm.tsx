import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ADD_COUNTRY, GET_COUNTRIES, GET_CONTINENTS } from "@/api/graphql";
import { NewCountryInput, Continent } from "@/types";

interface AddCountryFormProps {
  onSuccess?: () => void;
}

export function AddCountryForm({ onSuccess }: AddCountryFormProps) {
  const [formData, setFormData] = useState<NewCountryInput>({
    name: "",
    code: "",
    emoji: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data: continentsData } = useQuery<{ continents: Continent[] }>(
    GET_CONTINENTS
  );

  const [addCountry, { loading }] = useMutation(ADD_COUNTRY, {
    refetchQueries: [{ query: GET_COUNTRIES }],
    onCompleted: () => {
      setFormData({ name: "", code: "", emoji: "" });
      setErrors({});
      onSuccess?.();
    },
    onError: (error) => {
      if (error.graphQLErrors[0]?.extensions?.code === "CODE_ALREADY_EXISTS") {
        setErrors({ code: "Ce code pays existe déjà" });
      } else {
        setErrors({ general: "Une erreur est survenue" });
      }
    },
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
    } else if (formData.name.length < 2 || formData.name.length > 50) {
      newErrors.name = "Le nom doit contenir entre 2 et 50 caractères";
    }

    if (!formData.code.trim()) {
      newErrors.code = "Le code est requis";
    } else if (formData.code.length < 2 || formData.code.length > 3) {
      newErrors.code = "Le code doit contenir entre 2 et 3 caractères";
    }

    if (!formData.emoji.trim()) {
      newErrors.emoji = "L'emoji est requis";
    } else if (formData.emoji.length > 4) {
      newErrors.emoji = "L'emoji doit contenir au maximum 4 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const submitData = { ...formData };
    if (formData.continent) {
      submitData.continent = { id: Number(formData.continent) };
    }

    await addCountry({ variables: { data: submitData } });
  };

  const handleInputChange = (field: keyof NewCountryInput, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg border border-gray-900"
    >
      {errors.general && (
        <div className="text-red-500 text-sm mb-4">{errors.general}</div>
      )}

      {/* Layout responsive : vertical sur mobile, horizontal sur desktop */}
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Name</label>
          <Input
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Nom du pays"
            aria-invalid={!!errors.name}
          />
          <div className="h-5 mt-1">
            {errors.name && (
              <div className="text-red-500 text-sm">{errors.name}</div>
            )}
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Emoji</label>
          <Input
            value={formData.emoji}
            onChange={(e) => handleInputChange("emoji", e.target.value)}
            placeholder="🇫🇷"
            aria-invalid={!!errors.emoji}
          />
          <div className="h-5 mt-1">
            {errors.emoji && (
              <div className="text-red-500 text-sm">{errors.emoji}</div>
            )}
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Code</label>
          <Input
            value={formData.code}
            onChange={(e) =>
              handleInputChange("code", e.target.value.toUpperCase())
            }
            placeholder="FR"
            maxLength={3}
            aria-invalid={!!errors.code}
          />
          <div className="h-5 mt-1">
            {errors.code && (
              <div className="text-red-500 text-sm">{errors.code}</div>
            )}
          </div>
        </div>

        {continentsData && (
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">
              Continent (optionnel)
            </label>
            <Select
              value={formData.continent?.toString()}
              onValueChange={(value) => handleInputChange("continent", value)}
            >
              <SelectTrigger aria-label="Sélectionner un continent">
                <SelectValue placeholder="Sélectionner un continent" />
              </SelectTrigger>
              <SelectContent>
                {continentsData.continents.map((continent) => (
                  <SelectItem
                    key={continent.id}
                    value={continent.id.toString()}
                  >
                    {continent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="h-5 mt-1"></div>
          </div>
        )}

        <div className="md:w-auto w-full md:mt-7">
          <Button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
          >
            {loading ? "Ajout en cours..." : "Add"}
          </Button>
        </div>
      </div>
    </form>
  );
}

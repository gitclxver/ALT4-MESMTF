import React from "react";
import { PlusCircleIcon } from "../../utils/icons";

export interface Medication {
  id: number;
  name: string;
  imageUrl?: string;
  dosage: string;
  code: string;
  form: "Tablet" | "Capsule" | "Injection" | "Syrup" | "Other";
  brand: string;
  price: number;
}

export interface MedCardProps {
  medication: Medication;
  inStock: boolean;
  onAddToCart: (medication: Medication) => void;
}

const MedCard: React.FC<MedCardProps> = ({
  medication,
  inStock,
  onAddToCart,
}) => {
  return (
    <div className="bg-white min-w-[350px] max-w-[350px] min-h-[400] max-h-[400px] rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
      <div className="relative">
        <img
          className="h-40 w-full object-cover"
          src={
            medication.imageUrl ||
            `https://placehold.co/400x300/E2E8F0/475569?text=${medication.name}`
          }
          alt={`Image of ${medication.name}`}
        />
        <div
          className={`absolute top-4 right-3 px-2 py-1 text-xs font-bold text-white rounded-full ${
            inStock ? "bg-teal-500" : "bg-red-500"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </div>
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase">
          {medication.brand}
        </p>
        <h3 className="text-lg font-bold text-slate-800 truncate">
          {medication.name}
        </h3>
        <p className="text-sm text-slate-600">
          {medication.dosage} • {medication.form}
        </p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-extrabold text-cyan-600">
            N${medication.price.toFixed(2)}
          </p>
          <button
            onClick={() => onAddToCart(medication)}
            disabled={!inStock}
            className="flex items-center bg-cyan-100 text-cyan-700 font-semibold py-2 px-4 rounded-lg transition-colors hover:bg-cyan-200 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
          >
            <PlusCircleIcon /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedCard;

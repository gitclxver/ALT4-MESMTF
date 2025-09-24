import React from "react";

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
    <div className="bg-slate-50 border border-slate-300 rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-xs mx-auto transition-transform duration-300 hover:scale-105">
      <div className="flex flex-col items-center text-center">
        <img
          src={
            medication.imageUrl ||
            "https://via.placeholder.com/150?text=No+Image"
          }
          alt={`Image of ${medication.name}`}
          className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-cyan-600"
        />

        <h2 className="text-lg font-bold text-slate-800">{medication.name}</h2>

        <div className="mt-2 text-center w-full">
          <p className="text-xs text-slate-600">
            {medication.dosage} | {medication.form}
          </p>
          <p className="text-xs text-slate-600">
            {medication.brand} | {medication.code}
          </p>
        </div>

        <hr className="w-full border-t border-slate-200 my-4" />

        <div className="flex justify-between items-center w-full mt-2">
          <span className="text-lg font-extrabold text-cyan-600">
            N${medication.price.toFixed(2)}
          </span>
          {inStock ? (
            <span className="px-2 py-1 bg-teal-500 text-white text-xs font-bold rounded-full">
              In Stock
            </span>
          ) : (
            <span className="px-2 py-1 bg-slate-400 text-white text-xs font-bold rounded-full">
              Out of Stock
            </span>
          )}
        </div>

        {inStock && (
          <button
            onClick={() => onAddToCart(medication)}
            className="mt-4 w-full bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-cyan-700 transition-colors"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default MedCard;

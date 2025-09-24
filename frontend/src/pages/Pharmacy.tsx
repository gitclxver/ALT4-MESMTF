import Header from "../components/layout/Header";
import MedCard from "../components/cards/MedCard";
import { useState } from "react";
import type { Medication } from "../components/cards/MedCard";
function Pharmacy() {
  const medications: Medication[] = [
    {
      id: 1,
      name: "Paracetamol",
      imageUrl: "https://example.com/paracetamol.jpg",
      dosage: "500mg",
      code: "PCT500",
      form: "Tablet" as const,
      brand: "MediHealth",
      price: 1.99,
    },
    {
      id: 2,
      name: "Ibuprofen",
      dosage: "200 mg",
      code: "C234-B",
      form: "Capsule" as const,
      brand: "HealthCorp",
      price: 8.75,
    },
    {
      id: 3,
      name: "Amoxicillin",
      imageUrl:
        "https://images.unsplash.com/photo-1589133469852-dfb89984915b?q=80&w=1920&auto=format&fit=crop",
      dosage: "250 mg",
      code: "C234-C",
      form: "Capsule",
      brand: "Global Meds",
      price: 25.0,
    },
    {
      id: 4,
      name: "Cetirizine",
      imageUrl:
        "https://images.unsplash.com/photo-1589133469852-dfb89984915b?q=80&w=1920&auto=format&fit=crop",
      dosage: "10 mg",
      code: "C234-D",
      form: "Tablet",
      brand: "Allergy Care",
      price: 15.2,
    },
  ];

  const [cartItems, setCartItems] = useState<Medication[]>([]);

  const handleAddToCart = (medication: Medication) => {
    setCartItems((prevItems) => [...prevItems, medication]);
  };

  const handleSaveCart = () => {
    // localStorage.setItem("cart", JSON.stringify(cartItems));
    alert("Cart saved!");
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout!");
  };

  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row bg-slate-100 min-h-screen p-4 sm:p-8">
        {/* Store Section - Medications */}
        <div className="flex-1 lg:pr-8">
          <h1 className="text-3xl font-extrabold text-slate-800 mb-6">
            Medication Store
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {medications.map((medication) => (
              <MedCard
                key={medication.id}
                medication={medication}
                inStock={medication.id % 2 === 0 ? false : true} // Example for stock status
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div className="w-full lg:w-80 mt-8 lg:mt-0 lg:sticky lg:top-8 self-start bg-white border border-slate-300 rounded-lg shadow-xl p-6 h-fit">
          {/* Cart Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-800">Your Cart</h2>
            <div className="flex items-center text-slate-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-shopping-cart"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <span className="ml-2 font-bold">{cartItems.length}</span>
            </div>
          </div>

          <hr className="w-full border-t border-slate-200 mb-4" />

          {/* Cart Items */}
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {cartItems.length === 0 ? (
              <p className="text-slate-500 text-sm italic text-center">
                Your cart is empty.
              </p>
            ) : (
              cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm text-slate-700"
                >
                  <span>{item.name}</span>
                  <span className="font-semibold text-cyan-600">
                    N${item.price.toFixed(2)}
                  </span>
                </div>
              ))
            )}
          </div>

          <hr className="w-full border-t border-slate-200 mt-4 mb-4" />

          {/* Cart Total */}
          <div className="flex justify-between items-center text-base font-bold text-slate-800 mb-4">
            <span>Total</span>
            <span className="text-cyan-600">
              N$
              {cartItems
                .reduce((total, item) => total + item.price, 0)
                .toFixed(2)}
            </span>
          </div>

          {/* Cart Buttons */}
          <div className="space-y-2">
            <button
              onClick={handleSaveCart}
              className="w-full bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-slate-300 transition-colors"
            >
              Save Cart
            </button>
            <button
              onClick={handleCheckout}
              className="w-full bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-teal-600 transition-colors"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pharmacy;

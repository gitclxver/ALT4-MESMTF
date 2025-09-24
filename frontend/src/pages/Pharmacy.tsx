import Header from "../components/layout/Header";
import MedCard from "../components/cards/MedCard";
import { useState } from "react";
import type { Medication } from "../components/cards/MedCard";
import { useMemo } from "react";
import Footer from "../components/layout/Footer";
import { ShoppingCartIcon, XCircleIcon, CheckCircleIcon } from "../utils/icons";

interface CartItem extends Medication {
  quantity: number;
}

function Pharmacy() {
  const medications: Medication[] = [
    {
      id: 1,
      name: "Paracetamol",
      imageUrl: "",
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
      imageUrl: "",
      dosage: "250 mg",
      code: "C234-C",
      form: "Capsule",
      brand: "Global Meds",
      price: 25.0,
    },
    {
      id: 4,
      name: "Cetirizine",
      imageUrl: "",
      dosage: "10 mg",
      code: "C234-D",
      form: "Tablet",
      brand: "Allergy Care",
      price: 15.2,
    },
    {
      id: 4,
      name: "Cetirizine",
      imageUrl: "",
      dosage: "10 mg",
      code: "C234-D",
      form: "Tablet",
      brand: "Allergy Care",
      price: 15.2,
    },
  ];

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartMessage, setCartMessage] = useState("");

  const handleAddToCart = (medication: Medication) => {
    setCartMessage("");
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === medication.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === medication.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...medication, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (medicationId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== medicationId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSaveCart = () => {
    setCartMessage("Cart saved successfully!");
    setTimeout(() => setCartMessage(""), 3000);
  };

  const handleCheckout = () => {
    setCartMessage("Redirecting to checkout...");
    setTimeout(() => {
      setCartMessage("");
      handleClearCart();
    }, 3000);
  };

  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row bg-slate-100 min-h-screen p-4 sm:p-8">
        <div className="flex-1 lg:pr-8">
          <div className="mb-6">
            <h1 className="text-4xl font-extrabold text-slate-800">
              E-Pharmacy
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 l:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
            {medications.map((medication) => (
              <MedCard
                key={medication.id}
                medication={medication}
                inStock={medication.id !== 2}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>

        <aside className="w-full lg:w-96 mt-8 lg:mt-0 lg:sticky lg:top-8 self-start bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 h-fit">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-800">Your Cart</h2>
            <div className="flex items-center text-slate-600">
              <ShoppingCartIcon />
              <span className="ml-2 font-bold">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            </div>
          </div>
          <hr className="w-full border-t border-slate-200 mb-4" />

          {cartMessage && (
            <div className="flex items-center p-3 mb-4 bg-teal-50 text-teal-800 border border-teal-200 rounded-lg">
              <CheckCircleIcon />
              <p className="font-semibold text-sm">{cartMessage}</p>
            </div>
          )}

          <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {cartItems.length === 0 ? (
              <p className="text-slate-500 text-sm italic text-center py-4">
                Your cart is empty.
              </p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center text-sm text-slate-700"
                >
                  <div>
                    <span className="font-bold">{item.name}</span>
                    <span className="text-xs text-slate-500">
                      {" "}
                      x {item.quantity}
                    </span>
                  </div>
                  <div className="ml-auto flex items-center">
                    <span className="font-semibold text-cyan-600 mr-3">
                      N${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button onClick={() => handleRemoveFromCart(item.id)}>
                      <XCircleIcon />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <hr className="w-full border-t border-slate-200 mt-4 mb-4" />
          )}

          <div className="flex justify-between items-center text-lg font-bold text-slate-800 mb-4">
            <span>Total</span>
            <span className="text-cyan-600">N${cartTotal.toFixed(2)}</span>
          </div>
          <div className="space-y-2">
            <button
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
              className="w-full bg-teal-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-teal-600 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={handleSaveCart}
              disabled={cartItems.length === 0}
              className="w-full bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-slate-300 transition-colors disabled:opacity-50"
            >
              Save for Later
            </button>
          </div>
        </aside>
      </div>
      <Footer />
    </>
  );
}

export default Pharmacy;

import React from "react";
import { Link } from "react-router-dom";

const CompositeRagiRusk = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-4">Composite Ragi Rusk</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Introduction</h2>
        <p className="text-gray-700">
          Composite bread containing millets such as Ragi has great scope due to its nutritional value,
          local taste, and affordability. Ragi is rich in calcium and dietary fiber, and is recommended
          for those with diabetes and cardiovascular conditions.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Brief Description of the Process</h2>
        <p className="text-gray-700">
          Dough is prepared with flour, yeast, and ingredients, fermented at 28–30°C and 75–85% RH for 1 hour.
          After remixing and relaxing, it's molded, proofed, baked, cooled, sliced, re-baked, and packed
          in polypropylene pouches.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Use of the Process</h2>
        <p className="text-gray-700">
          Ragi rusk is a nutritious baked product loved by children and working-class people. With higher calcium,
          familiar taste, and affordability, it holds great market potential in both rural and urban areas.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Raw Materials</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Ragi flour</li>
          <li>Wheat flour</li>
          <li>Yeast and yeast food</li>
          <li>Sugar</li>
          <li>Salt</li>
          <li>Hydrogenated bakery fat</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Process Flow</h2>
        <p className="text-gray-700">
          Ingredients → Sifting → Mixing → Addition of flour, baking powder, salt, oil → Mixing → Scaling → Baking →
          Cooling → Slicing → Re-baking → Cooling → Packing
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Major Equipment</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Rotating bowl</li>
          <li>Moulder</li>
          <li>Baking oven</li>
          <li>Slicer</li>
        </ul>
      </section>

      <div className="text-center mt-8">
        <Link to="/login/user">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-all">
            Register to Access Technology
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CompositeRagiRusk;

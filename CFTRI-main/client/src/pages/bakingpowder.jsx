import React from "react";
import { Link } from "react-router-dom";

const BakingPowder = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-4">Baking Powder</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Overview</h2>
        <p className="text-gray-700 mb-2">
          Baking powder is a widely used chemical leavener in bakery products. Its efficiency depends on the amount of carbon dioxide released upon wetting due to the acid component reacting with sodium bicarbonate. According to IS:1159 (1981), a minimum of 12% carbon dioxide should be available by weight.
        </p>
        <p className="text-gray-700 mb-2">
          The powder should be free-flowing, white, odourless, and free from dirt, insects, or adulterants. It is packed in LDPE pouches with external duplex board cartons to prevent moisture ingress.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Constituents</h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-1">
          <li>Sodium bicarbonate</li>
          <li>Edible starch</li>
          <li>
            Acid reacting components:
            <ul className="list-disc ml-6 mt-1 space-y-1">
              <li>Sodium-acid pyrophosphate</li>
              <li>Mono acid calcium phosphate</li>
              <li>Di-calcium orthophosphate</li>
              <li>Potassium hydrogen tartrate / Tartaric acid</li>
              <li>Anhydrous sodium aluminium sulphate</li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Equipment Required</h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-1">
          <li>Suitable capacity sieve</li>
          <li>Ribbon blender</li>
          <li>Packing machine</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Project Cost Estimate</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm text-left">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="border px-4 py-2">Particulars</th>
                <th className="border px-4 py-2">Cost (Rs. in '000)</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr>
                <td className="border px-4 py-2">Land (750 m²)</td>
                <td className="border px-4 py-2">27.00</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Building (180 m²)</td>
                <td className="border px-4 py-2">324.00</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Plant and Machinery</td>
                <td className="border px-4 py-2">112.00</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Other Fixed Assets</td>
                <td className="border px-4 py-2">30.00</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Pre-operative Expenses</td>
                <td className="border px-4 py-2">107.00</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Working Capital (Margin)</td>
                <td className="border px-4 py-2">177.00</td>
              </tr>
              <tr className="font-semibold">
                <td className="border px-4 py-2">Total Project Cost</td>
                <td className="border px-4 py-2">777.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Financials</h2>
        <p className="text-gray-700 mb-1"><strong>Annual Cost of Sales:</strong> Rs. 27,00,000</p>
        <p className="text-gray-700"><strong>Annual Sales Returns:</strong> Rs. 35,10,000</p>
      </section>

      <div className="text-center">
        <Link
          to="/login/user"
          className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Register to Access Technology
        </Link>
      </div>
    </div>
  );
};

export default BakingPowder;

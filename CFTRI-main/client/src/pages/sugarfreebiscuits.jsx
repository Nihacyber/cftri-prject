import React from "react";
import { Link } from "react-router-dom";

const SugarFreeBiscuits = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-blue-800">Sugar-Free Biscuits</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">Introduction</h2>
        <p>
          Sugar-free biscuits are made from soft dough using the creaming method and processed in a rotary moulder. These biscuits are baked in a continuous tunnel-type oven, similar to sweet "gluco" type biscuits. Unlike regular "gluco" biscuits that contain about 450 calories and 20–25% sugar, sugar-free biscuits have no added sugar. When packed in polypropylene pouches, metallised polyester, or biaxially oriented polypropylene, they can be stored at ambient conditions for more than four months without changes in texture, flavor, or eating quality.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">Raw Material</h2>
        <ul className="list-disc list-inside">
          <li>Wheat flour</li>
          <li>Skimmed milk powder</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">Process</h2>
        <p>
          Blending → Ingredients → Creaming → Mixing → Dough Mixing → Dough Resting → Moulding → Baking → Cooling → Packing
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">Plant & Equipment</h2>
        <ul className="list-disc list-inside">
          <li>Mixer</li>
          <li>Sheeter</li>
          <li>Laminator</li>
          <li>Rotary cutter</li>
          <li>Baking oven</li>
          <li>Cooling belt</li>
          <li>Packaging machine</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">Project Cost</h2>
        <table className="min-w-full border border-gray-300 rounded-md overflow-hidden text-left text-gray-700">
          <thead>
            <tr className="bg-blue-100 font-semibold">
              <th className="px-4 py-2 border border-gray-300">Description</th>
              <th className="px-4 py-2 border border-gray-300">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border border-gray-300">Fixed Capital</td>
              <td className="px-4 py-2 border border-gray-300">₹3,278,000</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300 pl-8">Land & Development (500 m²)</td>
              <td className="px-4 py-2 border border-gray-300">₹144,000</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300 pl-8">Building & Civil Works (267 m²)</td>
              <td className="px-4 py-2 border border-gray-300">₹972,000</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300 pl-8">Plant & Machinery</td>
              <td className="px-4 py-2 border border-gray-300">₹1,655,000</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300 pl-8">Miscellaneous Fixed Assets</td>
              <td className="px-4 py-2 border border-gray-300">₹140,000</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300 pl-8">Pre-operative Expenses</td>
              <td className="px-4 py-2 border border-gray-300">₹367,000</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">Working Capital Margin</td>
              <td className="px-4 py-2 border border-gray-300">₹788,000</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">Total Project Cost</td>
              <td className="px-4 py-2 border border-gray-300">₹4,066,000</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">Total Working Capital (15% of turnover)</td>
              <td className="px-4 py-2 border border-gray-300">₹1,800,000</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">Means of Finance</td>
              <td className="px-4 py-2 border border-gray-300"></td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300 pl-8">Promoter’s Contribution</td>
              <td className="px-4 py-2 border border-gray-300">₹1,883,000</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300 pl-8">Term Loan</td>
              <td className="px-4 py-2 border border-gray-300">₹2,183,000</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">Production Capacity (Estimate)</h2>
        <ul className="list-disc list-inside">
          <li>Economic Capacity: 569 kg/shift</li>
          <li>Working: 1 shift/day, 300 days/year</li>
          <li>Installed Capacity: 170 tonnes/year</li>
          <li>Optimum Capacity Utilization: 70%</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2 text-blue-700">Technology / Manufacturing Process</h2>
        <p>
          The technology for producing sugar-free biscuits was developed at CFTRI, Mysore. It uses appropriate equipment for optimal product recovery and quality. CFTRI offers technical assistance and guidance for setting up and implementing the project under consultancy arrangements.
        </p>
      </section>

      <div className="mt-8 text-center">
        <Link
          to="/userLogin"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
        >
          Register to Access Technology
        </Link>
      </div>
    </div>
  );
};

export default SugarFreeBiscuits;

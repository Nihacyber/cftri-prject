import { useState, useEffect, useRef } from "react";
import { Search, Filter, Loader2, Info } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

// Add info for specific technologies here
const technologyInfo = {
  "Sugar Free Biscuit": `
Introduction
Sugar-free biscuits are made from soft dough using the creaming method and processed in a rotary moulder. These biscuits are baked in a continuous tunnel-type oven, similar to sweet "gluco" type biscuits. Unlike regular "gluco" biscuits that contain about 450 calories and 20–25% sugar, sugar-free biscuits have no added sugar. When packed in polypropylene pouches, metallised polyester, or biaxially oriented polypropylene, they can be stored at ambient conditions for more than four months without changes in texture, flavor, or eating quality.

Raw Material
- Wheat flour
- Skimmed milk powder

Process
Blending → Ingredients → Creaming → Mixing → Dough Mixing → Dough Resting → Moulding → Baking → Cooling → Packing

Plant & Equipment
- Mixer
- Sheeter
- Laminator
- Rotary cutter
- Baking oven
- Cooling belt
- Packaging machine

Project Cost
Description            Amount
Fixed Capital          ₹3,278,000
Land & Development (500 m²)    ₹144,000
Building & Civil Works (267 m²) ₹972,000
Plant & Machinery      ₹1,655,000
Miscellaneous Fixed Assets      ₹140,000
Pre-operative Expenses         ₹367,000
Working Capital Margin         ₹788,000
Total Project Cost             ₹4,066,000
Total Working Capital (15% of turnover)  ₹1,800,000

Means of Finance
Promoter’s Contribution        ₹1,883,000
Term Loan                     ₹2,183,000

Production Capacity (Estimate)
- Economic Capacity: 569 kg/shift
- Working: 1 shift/day, 300 days/year
- Installed Capacity: 170 tonnes/year
- Optimum Capacity Utilization: 70%

Technology / Manufacturing Process
The technology for producing sugar-free biscuits was developed at CFTRI, Mysore. It uses appropriate equipment for optimal product recovery and quality. CFTRI offers technical assistance and guidance for setting up and implementing the project under consultancy arrangements.
`,
  "Baking Powder": `
Overview
Baking powder is a widely used chemical leavener in bakery products. Its efficiency depends on the amount of carbon dioxide released upon wetting due to the acid component reacting with sodium bicarbonate. According to IS:1159 (1981), a minimum of 12% carbon dioxide should be available by weight.

The powder should be free-flowing, white, odourless, and free from dirt, insects, or adulterants. It is packed in LDPE pouches with external duplex board cartons to prevent moisture ingress.

Constituents
- Sodium bicarbonate
- Edible starch
- Acid reacting components:
  - Sodium-acid pyrophosphate
  - Mono acid calcium phosphate
  - Di-calcium orthophosphate
  - Potassium hydrogen tartrate / Tartaric acid
  - Anhydrous sodium aluminium sulphate

Equipment Required
- Suitable capacity sieve
- Ribbon blender
- Packing machine

Project Cost Estimate
Particulars                Cost (Rs. in '000)
Land (750 m²)              27.00
Building (180 m²)          324.00
Plant and Machinery        112.00
Other Fixed Assets         30.00
Pre-operative Expenses     107.00
Working Capital (Margin)   177.00
Total Project Cost         777.00

Financials
Annual Cost of Sales: Rs. 27,00,000
Annual Sales Returns: Rs. 35,10,000
`,
  "Cereal flakes: jowar":
    "Ready-to-eat flakes made from jowar (sorghum), rich in fiber and nutrients.",
  "Spice mix: Puliogere": "A traditional South Indian spice mix used for rice dishes.",
  "Bread: Production (Brown, Plain, Sweet, Milk, Whole wheat, Fruit, High fiber, Ragi, Bajra)": `
INTRODUCTION
Wheat production has doubled in the last 20 years. At present, India is self-sufficient in wheat and in the years to come it may have surplus wheat. Mostly wheat is consumed in North India in the form of chapatti, roti, and while in Southern States, it is slowly catching up. There is a need for popularizing wheat and wheat products throughout the country for extending the supplies of other foods. Bread is an important ready-to-eat food product which is becoming increasingly popular amongst the Indian population. Product characteristics are:
i) It is intermediate moisture food
ii) It works as an energy food
iii) It is a breakfast food

RAW MATERIAL
Raw materials required for the production of bread is wheat flour/Maida. Others include sugar, vegetable oil, yeast, salt and chemicals. The packaging material is usually wax coated paper. All raw materials are available locally.

PLANT AND MACHINERY
Principal equipments: Mixer with flour sifting arrangements and two spare bowls, Sunmica top dividing table for manual dicing, Moulder, Proofing cabinet, two ovens, Slicer.
Auxiliary equipments: Trays/Tins, Topped working tables, Trolleys, Weighing scale.

PROJECT COST (in Rs.) (Estimate for a model project)
a) Land & Land development (400 m²)
b) Building & civil works (300 m²)
c) Plant & Machinery: 800.00
d) Miscellaneous fixed assets: 100.00

PRODUCTION CAPACITY (estimate)
a. Product mix: Various types of bread in demand
b. 600 kg/shift/day
c. 300 working days/annum
d. Optimum capacity utilization: 70%

TECHNOLOGY/MANUFACTURING PROCESS – Availability
CFTRI has standardized the technology and general methods of processing of different types of bread. However, the formulation/recipe can vary to make different types of bread within the level of quality standards. Apart from this, procedure for quality control, packing and packaging material specifications, equipment details are also provided by the Institute.
`,
  "Composite Bajra Bread": `
INTRODUCTION
Bajra is one of the important millet crops grown in India. It is known by different names in different regions, such as Bajra in Hindi, Pearl millet in English, Kambu in Tamil, and Bajri in Gujarati. Bajra is a drought-resistant crop and can be grown in arid and semi-arid regions where other crops fail. It is a rich source of protein, fiber, and essential minerals like iron, zinc, and phosphorus. Bajra is also known for its health benefits, including its ability to reduce cholesterol, control blood sugar levels, and aid in digestion.

The composite bajra bread is a nutritious and healthy bread made from a mixture of bajra flour and other complementary flours. The addition of bajra flour not only enhances the nutritional profile of the bread but also imparts a unique flavor and aroma. This bread is an excellent option for health-conscious individuals and those looking to diversify their diet with nutrient-rich foods.

RAW MATERIALS
- Bajra flour
- Wheat flour
- Yeast
- Sugar
- Salt
- Water
- Improver (optional)

EQUIPMENT REQUIRED
- Flour mixer
- Dough sheeter
- Rotary cutter
- Baking oven
- Cooling rack
- Packaging machine

PROCESS
1. Mixing: Combine bajra flour, wheat flour, yeast, sugar, and salt in a mixing bowl. Add water gradually and mix to form a soft dough. If using an improver, add it during the mixing stage.
2. Kneading: Knead the dough for about 10 minutes until smooth and elastic.
3. Fermentation: Cover the dough and let it ferment in a warm place for 1-2 hours or until doubled in size.
4. Dividing: Punch down the fermented dough and divide it into small portions.
5. Shaping: Shape each portion into a round or oval bread roll.
6. Proofing: Place the shaped dough on a proofing tray and let it proof for 30 minutes.
7. Baking: Bake the proofed dough in a preheated oven at 220°C for 15-20 minutes or until the bread is golden brown.
8. Cooling: Remove the bread from the oven and cool on a wire rack.
9. Packaging: Once cooled, package the bread in moisture-proof bags or containers.

PROJECT COST (Rs. in '000)
a) Land & Land development (500 m²): 144.00
b) Building and civil works (267 m²): 972.00
c) Plant and machinery: 1,655.00
d) Miscellaneous fixed assets: 140.00
e) Pre-operative expenses: 367.00
Total Fixed Capital: 3,278.00
Working capital margin: 788.00
Total Project cost: 4,066.00
Total working capital required at 15% of turnover: 1,800.00

Means of Finance
- Promoter’s contribution: 1,883.00
- Term loan: 2,183.00

PRODUCTION CAPACITY (estimate)
- Economic capacity: 569 kg/shift
- Working: 1 shift/day, 300 days/year
- Installed capacity: 170 tonnes/year
- Optimum capacity utilization: 70%
`,
  "Composite Ragi Rusk": `
INTRODUCTION
Ragi, also known as finger millet, is a nutritious cereal grain widely grown in Africa and Asia. It is known by different names in different regions, such as Ragi in Hindi, Nachni in Marathi, and Mandua in Punjabi. Ragi is a rich source of calcium, iron, protein, and dietary fiber. It is also known for its health benefits, including its ability to reduce blood sugar levels, aid in digestion, and promote weight loss.

The composite ragi rusk is a healthy and crispy snack made from a mixture of ragi flour and other complementary flours. The addition of ragi flour not only enhances the nutritional profile of the rusk but also imparts a unique flavor and aroma. This rusk is an excellent option for health-conscious individuals and those looking to diversify their diet with nutrient-rich foods.

RAW MATERIALS
- Ragi flour
- Wheat flour
- Sugar
- Butter
- Baking powder
- Salt
- Water
- Yeast
- Milk powder (optional)

EQUIPMENT REQUIRED
- Flour mixer
- Dough sheeter
- Rotary cutter
- Baking oven
- Cooling rack
- Packaging machine

PROCESS
1. Mixing: Combine ragi flour, wheat flour, sugar, baking powder, and salt in a mixing bowl. Add water gradually and mix to form a soft dough. If using milk powder, add it during the mixing stage.
2. Kneading: Knead the dough for about 10 minutes until smooth and elastic.
3. Fermentation: Cover the dough and let it ferment in a warm place for 1-2 hours or until doubled in size.
4. Dividing: Punch down the fermented dough and divide it into small portions.
5. Shaping: Shape each portion into a round or oval shape.
6. Proofing: Place the shaped dough on a proofing tray and let it proof for 30 minutes.
7. Baking: Bake the proofed dough in a preheated oven at 220°C for 15-20 minutes or until the rusk is golden brown.
8. Cooling: Remove the rusk from the oven and cool on a wire rack.
9. Slicing: Once cooled, slice the rusk into desired thickness.
10. Re-baking: Re-bake the sliced rusk in the oven at a low temperature until dry and crisp.
11. Packaging: Package the rusk in moisture-proof bags or containers.

PROJECT COST (Rs. in '000)
a) Land & Land development (500 m²): 144.00
b) Building and civil works (267 m²): 972.00
c) Plant and machinery: 1,655.00
d) Miscellaneous fixed assets: 140.00
e) Pre-operative expenses: 367.00
Total Fixed Capital: 3,278.00
Working capital margin: 788.00
Total Project cost: 4,066.00
Total working capital required at 15% of turnover: 1,800.00

Means of Finance
- Promoter’s contribution: 1,883.00
- Term loan: 2,183.00

PRODUCTION CAPACITY (estimate)
- Economic capacity: 569 kg ragi rusk/shift
- Working: 1 shift/day; 300 working days/annum
- Installed capacity: 170 tonnes/annum
- Optimum capacity utilization: 70%
`,
  "Onion Flavoured Biscuit": `
INTRODUCTION
Onion is an important and indispensable item in every kitchen as a condiment and vegetable. The major value lies in its pungency of the flavour due to the presence of sulfur-bearing compounds called allyl sulfide or propyl sulfide in the volatile oil of plant juice. Use of onion in biscuit making results in the development of an entirely new product with the typical flavour of onion. Currently, there are no such biscuits available in the Indian market; hence, onion biscuits have high opportunity to be manufactured as a novel product.

Product characteristics are:
i) Product is a ready-to-eat variety snack item
ii) Product offers quality and strength of onion flavour
iii) It has the typical, familiar taste of onion.

RAW MATERIAL
Wheat flour, baker's yeast (compressed), hydrogenated fat, sugar, salt, milk powder, baking powder, onion, sesame seeds, green chillies, coriander leaves, and water.

PLANT AND MACHINERY
Principal equipments: Mixer, sheeter, laminator, rotary cutter, baking oven, cooling belt, and packaging machine.
Auxiliary equipments: Trolleys, SS buckets, handling vessels for raw material handling.

PROJECT COST – FIXED COST – WORKING CAPITAL (Rs.‘000)
(Estimate for a model project)
a) Land & Land development (500 m²): 144.00
b) Building and civil works (267 m²): 972.00
c) Plant and machinery: 1,655.00
d) Miscellaneous fixed assets: 140.00
e) Pre-operative expenses: 367.00
Total Fixed Capital: 3,278.00
Working capital margin: 788.00
Total Project cost: 4,066.00
Total working capital required at 15% of turnover: 1,800.00

Means of Finance
- Promoter’s contribution: 1,883.00
- Term loan: 2,183.00

PRODUCTION CAPACITY (estimate)
Suggested economic capacity: 569 kg onion flavored biscuits/shift
Working: 1 shift/day; 300 working days/annum
Installed capacity: 170 tonnes/annum
Optimum capacity utilization: 70%

TECHNOLOGY / MANUFACTURING PROCESS – AVAILABILITY
The technology for processing of onion flavored biscuits has been developed at CFTRI, Mysore using appropriate equipment for optimal product recovery of right quality. The institute has the necessary expertise to provide technical assistance and guidance for setting up the project and implementation, under technical consultancy arrangements.
`,
  "Wheat Germ Stabilization": `
1. Name of the process: STABILISATION OF WHEAT GERM

2. Brief Description of the Process:
Stabilization of wheat germ is achieved by dry heat treatment. The moisture content of germ is less than 2%. The product is light golden brown in colour.

3. Use of the Process:
Wheat Germ is a nutritional capsule containing a high amount of protein of excellent quality, comparable to the quality of egg protein. It is also a rich source of oil, particularly of unsaturated nature, and minerals. Wheat Germ is a rich source of B-group vitamins and is the richest source of vitamin-E. It can be used as a food supplement and as a breakfast cereal. Due to the presence of high content of fat and lipolytic enzymes, wheat germ needs to be stabilized for enhancing the shelf-life.
`,
  "Sugar Free Cup Cake": `
INTRODUCTION
With the increasing health awareness in the people, there is tremendous scope for the market of health bakery products. Presently, 2.5% of the urban population and 1.5% of the rural population suffer from diabetes. Sugar free cup cake is a novel product developed to suit the needs of diabetic population.

Sugar free cake is a therapeutic bakery product intended for the use of diabetic subjects. Currently, there are over 25 million people in India who are afflicted with diabetes. Presently, no such sugar free bakery products are being produced in the country using sorbitol to cater to the needs of diabetic patients. Hence, sugar free cake is a novel product with good potential for the growth of industry.

Product is moist, uniform in texture and spongy. Sugar free cup cakes can be wrapped or packed in clean waxed paper, greaseproof polyethylene or any other suitable wrapper or tins.

RAW MATERIALS
Wheat flour, Eggs, Oil, Baking powder, Calcium propionate, Cake gel and Acetic acid

PROCESS
Ingredients → Sifting of dry ingredients → Mixing → Addition of flour, baking powder & calcium propionate → Mixing → Addition of other ingredients → Scaling of batter into moulds → Baking → Cooling → Packing

PLANT AND MACHINERY
Weighing machine, Mixer, Baking pans, Baking oven and cooling racks could be used for the preparation of sugar free cup cake.
`,
  "Sugar Free Rusk": `
INTRODUCTION
Sugar free rusk is a novel therapeutic product specially suited for diabetic patients. The shelf life of the product is about 3 months.

MARKET
The production of such sugar free products will certainly benefit people suffering from diabetes. The therapeutic bakery products sector needs to be exploited and there is good growth potential for industries which start the production of therapeutic bakery products in addition to the manufacture of variety products.

RAW MATERIALS
Wheat flour, yeast, salt, milk powder, etc.

PLANT AND MACHINERY
Weighing machine, Mixer, Baking pans, Baking oven, slicing machine and cooling racks could be used for the preparation of sugar free rusk.
`,
  "Instant Payasam Mix": `
INTRODUCTION
Payasam mix is a most common traditional food item. It consists of toasted raisins, cashew and vermicelli in hydrogenated fat. Toasted vermicelli along with raisins and cashew are mixed with other ingredients and packed into polypropylene bags.

MARKET POTENTIAL
The premixes of traditional foods are taking a major share in the market and production of these premixes is increasing day by day. The increase in the production of these premixes is attributed to many factors like easy to prepare, more convenient in nature and also good shelf life. As these premixes consumption are increasing, there is a considerable scope for sustaining or even increasing the growth of the industry by diversifying with the introduction of newer premixes. As payasam mix is a most common traditional food item for the majority of the population in the country for people of all age groups, it has a very high market potential for present and future.

RAW MATERIAL
Vermicelli, sugar, skimmed milk powder, fat, raisins, cardamom powder, cashew and bha.

PROCESS
Scaling of ingredients → toasting → cooling → mixing → weighing → packing

EQUIPMENT
Toasting machine, mixer and pouch filling machine etc., are required as major equipments.

PROJECT ECONOMICS
Capacity of production: 300 tonnes/annum (1000 kg/day)
Cost of plant and equipments: Rs. 5.5 lakhs
Total project cost: Rs. 34.4 lakhs
`,
"Barley Instant Upma, Halwa and Rava Idly Mix": `
Barley is among the most ancient of the cereal crops and it is the fourth most important cereal in the world in terms of production.

✓ Barley has numerous health benefits:
i. Lowers blood cholesterol
ii. Lowers glycemic index
iii. Reduces serum LDL cholesterol

✓ Renewed interest in barley for food uses largely centers around the effects of β-glucans on lowering blood cholesterol levels and glycemic index.
`,
 "High Protein Rusk": `
INTRODUCTION
High protein rusk is specially suited as a protein snack item. It is golden brown in colour, with a crisp texture and typical taste and flavour. The product is acceptable to customers and finds extensive use as a healthy snack item. There is very good scope for marketing.

MARKET POTENTIAL
This product has great potential in the Indian market due to its novelty, increased protein content (about 6% higher than ordinary rusks), and long shelf life.

RAW MATERIAL
Raw materials required are wheat flour, defatted soya flour, fat, yeast, sugar, salt, water, etc.

PROCESS
Mixing of sponge → Addition of flours → Scaling → Mixing → Scaling → Baking → Cooling & Slicing → Re-baking → Cooling → Packing

EQUIPMENTS
Weighing machine, mixer, baking pans, baking oven, slicing machine, and cooling racks could be used for the preparation of high protein rusk.
`,
"Instant Cake Mix": `
INTRODUCTION
Instant cake mix is a premix containing all the ingredients normally used for the preparation of cake. Cakes could be easily prepared from such premix by adding a required quantity of water to the premix and mixing for a specified period of time and baking the batter in a baking oven. It adds variety to snack foods in the household. The advantage of the use of such mix is convenience as it eliminates the drudgery of purchasing ingredients in small quantities, weighing them and creaming them separately for a longer duration during the preparation of batter, which is a very cumbersome procedure.

MARKET POTENTIAL
In the developed countries, cake premix is extensively used at home as well as in bakeries as they offer technological convenience and varieties. In India, very little work has been done for the development and popularization of such premixes. Since bakery premixes are relatively new products, a market potential has to be created to be used as a household snack food item and for production of varieties of cake. Cake premix will also be useful for small bakery chains to prepare consistent quality products by preparing the mix at a centralized place.

RAW MATERIALS
Raw materials used in this product are Maida, sugar, hydrogenated fat, whole egg powder, skimmed milk powder, edible common salt, baking chemicals, lecithin, BHA.

PROCESS IN BRIEF
Dry ingredients → Sieving → Blending → Fumigation → Filling → Sealing → Storage

EQUIPMENTS
Sifter, Grinder, Mixer, Dryer which are available indigenously.

PROJECT ECONOMICS
Capacity of production: 150 tonnes/annum
Cost of plant and equipments: Rs. 9.0 Lakhs
Project cost: Rs. 13.5 Lakhs
`,
"Wheat Vermicelli": `
INTRODUCTION
In India the pasta products are one of the most ancient forms in which wheat has been consumed. Pasta is the Italian word for paste, a mixture of flour and salt. The use of wheat in pasta products is more widespread in the world, when compared to bread because pasta products are simpler to make and quick to serve, if dried can be conveniently stored for a relatively long period of time without deterioration.

MARKET POTENTIAL
The processing of pasta products (vermicelli) is very simple and does not involve a number of equipments/machinery. The production of pasta has increased from 3.66 lakh tonnes in 1990 to 4.87 lakh tonnes in 1999 and is expected to be 5.35 lakh tonnes in 2000. The increase in production must be attributed to easy to prepare, readily available, lower cost, long shelf life, and could be consumed in various forms. However, vermicelli has great potential due to its better nutritional status, palatability and above all, better affordability by the consumer at large.

RAW MATERIAL
Semolina/wheat flour

PROCESS
Sieving of wheat flour/semolina → Scaling of ingredients → Mixing → Extrusion → Cutting → Drying → Cooling → Packing

EQUIPMENT
Mixer, Extruder, Drier and Packaging Machine are major equipments.

PROJECT ECONOMICS
Capacity of production: 290 tonnes/annum
Cost of plant and equipments: Rs. 5.60 Lakhs
Total project cost: Rs. 28.74 Lakhs
`,
"Fortified Protein Rich Vermicelli": `
INTRODUCTION
Pasta products are one of the most ancient forms in which wheat has been consumed. The use of wheat in pasta products is more widespread in the world, when compared to bread, because pasta products are simpler to make and quick to serve. If dried, they can be conveniently stored for a relatively long period of time without deterioration. Pasta production must be attributed to being easy to prepare, readily available, lower cost, longer shelf life, and could be consumed in various forms. The protein content could be increased by the addition of protein rich flour. Thus, high protein vermicelli has great potential due to its better nutritional status and hence has higher opportunity value.

i) The product can be used as breakfast as well as snack.
ii) High protein vermicelli has great potential due to its better nutritional status.
iii) Product has longer shelf life.

Pasta products are one of the most ancient forms in which wheat has been consumed. Pasta is the Italian word for paste, a mixture of flour and salt. The use of wheat in pasta products is more widespread in the world when compared to bread because pasta products are simpler to make and quick to serve. If dried, they can be conveniently stored for a relatively long period of time without deterioration. Pasta products comprise of vermicelli, noodles, macaroni, and spaghetti.

RAW MATERIAL
The important raw materials required for the preparation of fortified protein rich vermicelli are: wheat flour, soy flour, vitamin premix, additives, and water.

PLANTS AND MACHINERY
Principal equipments: Mixer, Extruder, Drier, and Packaging Machine.

PROJECT COST – FIXED COST – WORKING CAPITAL (in Rs.‘000) (estimate for a model project)
a) Land & land development (500 m²): 250.00
b) Building & civil construction (320 m²): 1350.00
c) Plant and machinery: 600.00
d) Miscellaneous fixed assets: 100.00
e) Pre-operative expenses: 150.00
Total fixed capital: 2450.00
Working capital margin: 600.00
Total Project cost: 3050.00
Total working capital required at 20% of turnover: 1600.00

Means of finance
Promoters contribution: 770.00
Term loan: 2280.50

PRODUCTION CAPACITY (estimate)
The installed capacity: 1000 kg finished product per shift/day and working for 300 days in a year.
Optimum capacity utilization: 70%

TECHNOLOGY/MANUFACTURING PROCESS – Availability
CFTRI has standardized the technology and general methods of processing of fortified protein rich vermicelli. Apart from this, procedure for quality control, packaging and packaging material specifications, equipment details are also provided by the institute.
`,
"Layered Parotta (South Indian)": `
INTRODUCTION
Parotta is generally prepared and consumed fresh along with adjuncts in households and restaurants, as well as in roadside shops. Parotta is a wheat flour-based unleavened flat bread of South India. There is no scientific information available on the manufacture of parotta under ideal conditions and demand for ready-to-eat chapattis is increasing in the Indian market. Hence, there is a need to develop an optimized formulation and processing conditions for the preparation of parotta in order to obtain consistent and improved quality product.

MARKET POTENTIAL
There is considerable scope for the manufacture and marketing of improved quality parottas, as the demand for ready-to-eat convenience food products has been steadily increasing because of industrialization. Large scale production and marketing of parottas requires a consistent and good quality product which is possible only by following formulation with additive and optimized processing conditions.

RAW MATERIAL
Wheat flour, salt, sugar, egg, refined oil, etc.

PLANT AND MACHINERY
Principal equipments: Balance, planetary mixer, electric hot plate, rolling pin, cooling racks.
Auxiliary equipment: Stainless steel bowl, three speeds with a dough hook, marble platform.

PROJECT COST – FIXED COST – WORKING CAPITAL (in Rs.‘000) (Estimate for a model project)
a) Rented Building (60 m²): 12.00
b) Plant and machinery: 50.00
c) Miscellaneous fixed assets: 5.00
d) Pre-operative expenses: 2.00
Total fixed capital: 69.00
Working capital margin: 60.00
Total Project cost: 129.00

Means of finance
- Promoters contribution: 96.75
- Term loan: 32.25

PRODUCTION CAPACITY (estimate)
Suggested economic capacity: 2,000 nos./day
Working: 1 shift/day, 300 working days/year
Capacity: 6,00,000 nos./annum
Optimum utilization capacity: 70%

TECHNOLOGY/MANUFACTURING PROCESS – Availability
The technology for the manufacture of South Indian Parotta has been developed at CFTRI, Mysore, using appropriate equipment for optimal product recovery of right quality. The CFTRI has the necessary expertise to provide technical assistance and guidance for setting up the project. The CFTRI can offer further technical assistance for project implementation under technical consultancy arrangements.
`,
"Sugar Free Cake Rusk": `
INTRODUCTION
Sugar free cake is a novel therapeutic product specially suited for diabetic patients. There is a good scope for the marketing of therapeutic products as it is not being produced in the country.

MARKET
As the health awareness of the people is on the increase, production of sugar free cake rusk specially intended for diabetic subjects will definitely boost the sales and thereby increase the growth of the industry.

RAW MATERIALS
Wheat flour, eggs, oil, salt, baking powder, and cake gel.

PROCESS
Ingredients → Sifting of dry ingredients → Mixing → Addition of flour, baking powder, salt, oil & essence → Mixing → Scaling of batter into moulds → Baking → Cooling → Slicing → Re-baking → Cooling → Packing

PLANT AND MACHINERY
Weighing machine, mixer, baking pans, baking oven, slicing machine, and cooling racks could be used for the preparation of sugar free cake rusk.
`,
"Suruchi Meetha Burfi": `
INTRODUCTION
Sugar free cake is a novel therapeutic product specially suited for diabetic patients. There is a good scope for the marketing of therapeutic products as it is not being produced in the country.

MARKET
As the health awareness of the people is on the increase, production of sugar free cake rusk specially intended for diabetic subjects will definitely boost the sales and thereby increase the growth of the industry.

RAW MATERIALS
Wheat flour, eggs, oil, salt, baking powder, and cake gel.

PROCESS
Ingredients → Sifting of dry ingredients → Mixing → Addition of flour, baking powder, salt, oil & essence → Mixing → Scaling of batter into moulds → Baking → Cooling → Slicing → Re-baking → Cooling → Packing

PLANT AND MACHINERY
Weighing machine, mixer, baking pans, baking oven, slicing machine, and cooling racks could be used for the preparation of sugar free cake rusk.
`,
"Honey Based Bakery Products": `
(Plain Bread, Sweet Bread, Buns, Bar Cake, Muffins, Eggless Cake, Sponge Rolls, Cream Biscuits, Cookies, Doughnuts, Rolls, Danish Pastry, Croissants)

INTRODUCTION
Honey has a unique flavour and taste, which makes it enjoyable. Honey is perhaps the oldest sweetener known to man. There are about 2,76,000 beekeepers in India. The national production of honey is about 27,000 tonnes per annum. The per capita consumption of honey in India is 8.4 g/year, which is very low owing to high cost and utilization of major quantity for medical purposes. Honey has been recognized as a health promoter. It is beneficial to promote the use of honey directly or through value added products such as honey candy, honey yogurt, etc. It can also be incorporated in baked foods, which has got a lot of popularity. Also the current surge of interest in the production of “natural foods” can increase the usage of honey as an ingredient in baked and other processed foods.

MARKET POTENTIAL
Honey has a wide range of characteristics and unique features. It is a natural ingredient. Due to the rise in the health awareness of the consumers, now-a-days natural foods are valued a lot. Honey also is considered wholesome and it offers functional advantages in baked products. It imparts a special flavour to the product making it acceptable. In the market that is becoming more diverse and competitive, introduction of new products with value addition will have a positive bearing on the sales. Moreover, a strong need is felt to utilize the honey produced in the country. Owing to the special features of honey, bakery products prepared with honey because of improved acceptability have good marketing potential. Baked products with the goodness of honey are hardly being produced in the country currently.

RAW MATERIAL
Wheat flour, sugar powder, crystal sugar, salt, yeast, fat, water, honey, baking powder, egg, margarine, milk powder, calcium propionate, acetic acid, glycerol corn starch, lecithin, glycerol monostearate, sodium stearoyl lactylate, etc.

PLANT & EQUIPMENTS
Weighing machine, mixers, baking oven, refrigerator, slicing machine, generator, baking aids, etc.

PROJECT COST – FIXED COST – WORKING CAPITAL (Rs.‘000)
(Estimate for a model project)
Building (35 m²): 10.50
Plant and machinery: 7.00
Working capital margin (15 days): 0.25

TECHNOLOGY / MANUFACTURING PROCESS - AVAILABILITY
The technology for processing of honey based bakery products has been developed at CFTRI, Mysore using appropriate equipment for optimal product recovery of right quality. The institute has the necessary expertise to provide technical assistance and guidance for setting up the project and implementation, under technical consultancy arrangements.
`,
  // Add more as needed...
};

const TechnologiesPage = () => {
  const bakeryProductOptions = [
  "Barley Instant Upma, Halwa and Rava Idly Mix",
  "Sugar Free Biscuit",
  "Baking Powder",
  "Composite Bajra Bread",
  "Composite Ragi Rusk",
  "Onion Flavoured Biscuit",
  "Wheat Germ Stabilization",
  "Sugar Free Cup Cake",
  "Instant Payasam Mix",
  "Sugar Free Rusk",
  "High Protein Rusk",
  "Instant Cake Mix",
  "Wheat Vermicelli",
  "Fortified Protein Rich Vermicelli",
  "Layered Parotta (South Indian)",
  "Sugar Free Cake Rusk",
  "Suruchi Meetha Burfi",
  "Honey Based Bakery Products",
  "Sugar Free Bread",
  "Eggless Cake Premix",
  "High Protein Biscuits",
  "Shelf Stable Chapathi",
  "Legume Based Pasta",
  "Online Fortification of Atta or Maida",
  "Fortified Whole Wheat Pasta",
  "Production of Atta (Whole Wheat Flour)",
  "Multigrain Bread",
  "Gluten Free Bakery Products",
  "Fenugreek Fiber & Gum",
  "Low Glycemic Index (GI) Noodles",
  "Atta with Multi Grains / Multi Whole Grains Flour",
  "Multigrain Gluten Free Semolina (Sooji/Rava)",
  "Multigrain Gluten Free Instant Halwa Mix",
  "Multigrain Gluten Free Instant Rava Idli Mix",
  "Multigrain Gluten Free Instant Upma Mix",
  "Production of Pearl Millet Semolina (Sooji/Rava)",
  "Production of Sorghum (Jowar) Semolina (Sooji/Rava)",
  "Chocolate Pasta",
  "Production of Refined Wheat Flour, Semolina & Resultant Atta by Roller Milling (UPDATED)",
  "Shelf Stable Bread",
  "Shelf Stable Muffins",
  "Multigrain Pasta",
  "Nutritious Soup/Bread Sticks",
  "Baked Savory Snacks",
  "Chestnut Based Gluten Free Cookies",
  "TEST Record",
  "Spice Bread",
  "A Process for the Preparation of Bar Cake",
  "Production of Ragi Biscuits",
  "A Manufacturing Process for Multigrain Waffle",
  "Bread: Production",
  "Bar Cake",
  "Sugar Free Cake Rusk",
  "Instant Upma, Halva & Rava Idli Mix From Multigrain Semolina",
  "Instant Upma & Rava Idli Mix From High Protein Semolina",
  "Instant Upma Mix From Millets & Multimillets Semolina",
  "Instant Halva Mix From Millets & Multimillets Semolina",
  "Instant Rava Idli Mix From Millets & Multimillets Semolina",
  "Production of High Fiber Semolina (Sooji/Rava)",
  "Production of High Protein Semolina (Sooji/Rava)",
  "Buckwheat Noodles/Pasta",
  "Gluten Free Biscuits",
  "Gluten Free Cookie Cake",
  "Multigrain Nutri Cookies",
  "Process for Production of Quinoa Germ",
  "Fiber Enriched Rusk",
  "Multigrain Pizza Base",
  "Gluten Free Bread Premix – Proso Millet",
  "Gluten Free Bread Premix – Foxtail Millet",
  "Gluten Free Bread Premix – Barnyard Millet",
  ];

  const beverageProductOptions = [
    "Cereal flakes: jowar",
    "Instant traditional foods: Bisi bele bhath, Sambar, Rasam, Pongal, Urd bhath, Imli poha",
    "Spice mix: Puliogere",
    "Paushtik atta",
    "Composite vermicelli based on ragi flour",
    "Maize flakes (wet heat process)",
    "Maize chips",
    "Ready to eat low fat snack — Chakli & Tengolal",
    "Ready to eat low fat flaked spicy Maize/ Corn-snacks",
    "Legume based ready-to-fry-snacks",
    "Ragi based papads",
    "Pulse based papads",
    "Decortication of Ragi",
    "Malted ragi flour - enzyme rich",
    "Ready-to-eat low fat maize snacks from milled maize grits",
    "Flaking of foxtail millet",
    "Composite lentil chips",
    "Flaked jowar - RTE sweet & savoury snacks",
    "Quick cooking, germinated & dehydrated pulses",
    "Fermented & dehydrated ready mixes for Idli & Dosa",
    "Foods for diabetics",
    "Shelf-stable jowar flour",
    "Processed besan (Bengal gram flour) for sev & boondi preparation",
    "Puffed moth bean based sweet and savoury snacks",
    "Finger millet (Ragi) based murukku",
    "Expanded Horse gram",
    "Flaking of ragi",
    "Shelf stable optimally milled brown rice",
    "Multigrain based fortified snack",
    "Mothbean Dal Puff",
    "Multi-grain sweet mix",
    "Ready to eat snack mix from puffed coarse cereals & legumes",
    "Ready to cook multigrain whole mix for drink/ porridge",
    "Convenience flour from Ragi suitable for stiff porridge",
    "Finger millet based multigrain semolina for preparation of Upma, Kesri bath & similar products",
    "Protein enriched ragi vermicelli",
    "Shelf stable roti from cereals & millets (rice/ragi/maize/jowar/bajra)",
    "Low fat expanded green snack using moringa leaves",
    "Preparation of beverage mix from malted ragi",
    "Multigrain instant semolina",
    "Millet based cookie",
    "Process for production of multigrain gluten free semolina",
    "Multigrain gluten free instant upma mix",
    "Multigrain gluten free instant rava idli mix",
    "Multigrain gluten free instant halwa mix",
    "Production of Sorghum (jowar) semolina",
    "Production of pearl millet semolina",
    "Instant upma, halwa and rava idli mix from barley semolina",
    "Production of rice grits/sooji",
    "Ready-to-eat weaning food based on Malted Wheat",
    "Ready-to-eat weaning food based on Malted Rice",
    "Ready-to-eat weaning food based on Malted Multi-cereals",
    "Antidiabetic beverage mix - DiaLow GI-53 (Barley+Wheat-Herb based)",
    "Antidiabetic beverage mix - DiaLow GI-49 (Wheat-Herb based)",
    "Antidiabetic beverage mix - DiaLow GI-47 (Barley-Herb based)",
    "Barley-seaweed based Anti-obese supplement Sea Slim",
    "Production of soluble & insoluble arabinoxylan from wheat bran",
    "Ragi based malt hydrolysate",
    "Malted ragi based ready to eat weaning food",
    "Finger millet semolina",
    "Instant finger millet (ragi) ravi idli mix",
    "Instant finger millet halwa mix",
    "Instant finger millet kichadi mix",
    "Instant finger millet upma mix",
    "Millet and multimillet puttu podu mix",
  ];

  const cerealProductOptions = [
    "Coffee concentrate",
    "Cola flavour concentrate",
    "Orange flavour concentrate for manufacture of soft beverage",
    "Clear Lime-Lemon flavour blend for soft drink manufacture",
    "Liquid fruits (clarified fruit juices) - Apple, Banana, Grapes, Guava",
    "Pomegranate juice & products",
    "Bottling of Sugarcane juice",
    "Fruit syrups & squashes",
    "Litchi products (canned; squash)",
    "RTS fruit juice & beverages",
    "Neera bottling",
    "Low Glycemic Index (GI) Beverage for Diabetics",
    "Banana pseudo stem juice beverage",
    "Instant Ginger Beverage (Ginger Tea)",
    "Coconut beverage from tender coconut",
    "Preparation of Nutri Beverage in Glass Bottles (Non -Aerated)",
    "Mixed fruit and Vegetable juices",
    "Fortified sugarcane beverage in glass bottles",
    "Ginger beverage",
    "Tender coconut water concentrate with sugar",
    "Improved process for preservation of Neera (pet bottles)",
    "Neera concentrate",
    "Green coffee extract",
    "Carbonated fruit beverages from selected fruits (mango, grapes, lime, orange)",
    "Paan flavoured water",
    "Coffee leaves brew mix",
    "Glucose-amla Beverage Mix",
  ];

  const convenienceProductOptions = [
    "Ready Mixes - Vada, Dosa, Chakli, Jamoon, Jelebi Maddur vada, Pakoda, Cake Doughnut, Combination doughnut",
    "Ready mix: Upma",
    "RTE convenience food-Khakra",
    "North Indian (Punjab) Halwa Mix",
    "Bombay Halwa Mix",
    "Chutney paste (spread)",
    "Low sugar milk Burfi",
    "Deep fat fried & flavoured cashew kernels",
    "Roasted & flavoured cashew kernel",
    "Shelf-stable & ready to eat foods thermo processed in retort pouches (non-veg. & veg. Foods)",
    "Tamarind candy",
    "Nutri blends of edible oils",
    "Chikki/ Nutra-chikki (3 formulations)",
    "Nutra Chikki with added spirulina",
    "Cereal Bar",
    "Multigrain cereal-legume Bar and Puffed Rice Bar",
    "Spirulina-choco bar and spirulina-cereal bar",
    "Fat powder",
    "Value Added products from coconut (Instant adjunct mix, Instant filling mix, Coconut rice mix, Coconut bites)",
    "Milk Chocolate",
    "Milk Chocolate with no added sugar",
    "Coconut Oil Blends with other vegetable oils",
    "Preparation of protein, vitamin and mineral fortified chikki",
    "Dhal based nutritional supplement for foods",
    "Gongura leaf powder",
    "Instant Rava Idli Mix",
    "DOLYMIX - for soft & enhanced number of IDLYS",
    "Chocolate rich in healthy polyphenols",
    "Chikki with Moringa",
    "Ready to use Multigrain Idli and Dosa Batter in Retail Packs",
  ];

  const foodMachineryOptions = [
    "Versatile Dal mill",
    "Continuous Dosa Making unit",
    "Design on Spouted Bed Coffee Roaster",
    "Vibro fluidized bed roaster",
    "Dry maize milling plant",
    "Device for Pneumatic extrusion of dough & device useful for dusting & cutting of dough into geometrical shapes",
    "Infrared heating of Cashew for testa removal",
    "Combined infrared hot air heating system for food processing",
    "Hot air popping machine using flue gas",
    "Desiccated coconut drier",
    "Continuous bio-plate casting machine",
    "Automatic continuous cooker",
    "Sugarcane de-skinning machine",
    "Integrated hot air roasting machine",
    "Continuous Vada making Machine",
    "Mini versatile dhal mill",
    "Hand operated lemon cutting machine",
    "Moulding machine for besan, sooji/rava and similar laddus",
    "Device useful for sheeting and cutting of chikki & other similar Indian Traditional sweets",
    "Forming and frying machine for foods",
    "Domestic dough shaping & forming machine",
    "Continuous dough sheet extruder",
    "Tiny Rice Mill",
    "Continuous wet cum dry grinding machine for foods (Colloidal mill)",
    "3 A device for continuous forming and frying of boondi",
    "Annatto seed separator",
    "Table top continuous wet cum dry grinder",
    "Thepla & Kakra processing machine",
    "Design & Development of a machine for continuous cooking & discharging of Ragi mudde/ball making",
    "Ozone based air disinfection system",
  ];

  const fruitsVegetableProductOptions = [
    "Fruit bars: Apple, Banana, Guava, Mango",
    "Fortified Mango bar",
    "Fruits & Vegetables dehydration: Grapes, Banana, Onion, Potato, Peas & green chillies",
    "Oyster Mushroom: dehydration",
    "Technology Protocol for export of Alphonso Mango by Ship",
    "Technology Protocol for export of Banana variety Dwarf Cavendish by Ship",
    "Fruit jams & jellies: preparation",
    "Tutti-fruity (papaya/carrot)",
    "Fruit & vegetables: canning of",
    "Pickles & Chutneys",
    "Osmo-air dried fruits (Amla, Jackfruit, Pineapple & Mango)",
    "Potato flour",
    "Potato wafers/chips: direct process",
    "Tomato products (Juice, Ketchup, Sauce etc.)",
    "Jamoon fruit products: (squash, RTS beverage, syrup)",
    "Dehydrated drumstick powder",
    "Amla spread",
    "Modified atmosphere packaging of minimally processed vegetables",
    "Value added products from Figs (Ficus carica L)",
    "Dehydrated bitter gourd",
    "Dehydrated whole lime",
    "Instant mushroom soup mix",
    "Dipping oil formulation for grapes",
    "Bio-preservation of ready-to-eat sugarcane chunks",
    "Amla paste",
    "Date Syrup Concentrate",
    "Mangosteen Fruit Products",
    "Value added products from custard apple (pulp, microfiltered beverage & jelly)",
    "Products from pear fruit (dehydrated fruit, juice & powder)",
    "Fruit jam slices",
    "Apple pomace powder for enrichment of bakery products (bun, muffin, cookies)",
    "Instant products from Moringa leaves",
    "Crunchy banana cereal bar",
    "Instant Broccoli soup mix",
    "Plain spiced RTS beverage & squash from kokum",
    "Kokum jelly",
    "Banana juice",
    "Improved process for banana fruit bar",
    "Sweet Potato soup mix",
    "Minimally processed pomegranate arils",
    "Nutrient and Micronutrient rich Ready-to-Eat (RTE) salad",
    "Process for Instant Tomato crush, Tomato Rasam mix & Tomato rice bath mix",
    "Process for preparation of raw banana powder (unripe)",
    "Process for Nutri Fruit bars with immune boosters",
    "Beverage concentrate/ Paste from Mango, in Collapsible Tube",
    "Beverage concentrate/ Paste from Guava, in Collapsible Tube",
    "Beverage concentrate/ Paste from Pineapple, in Collapsible Tube",
    "Beverage concentrate/ Paste from mixed fruit and vegetable, in Collapsible Tube",
  ];

  const meatMarineProductOptions = [
    "Instant gravy mixes (dehydrated)",
    "Meat pickles: Prawn, Mutton",
    "Fish viscera silage (fermented)",
    "Sausage preparation: Chicken & Pork",
    "Meat/Fish/Poultry wafers (Chicken/Fish/Prawn/Pork/Egg/Meat)",
    "Shelf-stable chicken biryani",
    "Shelf-stable chicken tit-bits",
    "Meat burger",
    "Egg loaf",
    "Shelf stable kabab mix with chicken meat",
    "Ready to eat shelf stable egg crunchy bite",
    "Dehydrated Egg Cubes",
    "Deep fat fried Egg Cubes",
    "Shelf stable egg albumin & egg yolk cubes",
    "Low fat meat kofta",
    "Shelf-stable biryani paste",
    "Shelf stable varieties of curry pastes for vegetarian & non vegetarian traditional cuisines",
    "Shelf stable convenience mix: A cooking base",
    "Gelatin from Chicken feet",
  ];

  const microbiologyFermentationOptions = [
    "Microbial production of Fructooligosaccharides (FOS)",
    "Kit for the detection of aflatoxins by improved Dot-ELISA technique",
    "Preparation of wine from Garcina Xanthochymus",
    "Microbial inoculums for the management of coffee pulp effluent",
    "Bifido curd",
    "Soya curd",
    "A-Hango: Preparation for alleviating alcohol hangover",
    "A green process for production of methylanthines for food and other applications",
    "Herbal Hand Sanitizer (Gel Form)",
    "Herbal Hand Sanitizer (Liquid Form)",
    "Herbal fogging disinfectants for mist sanitizer system",
    "Herbal spray Sanitizer",
    "Herbal Bulk sanitizer product",
    "High Performance Advanced Oxidation Process for STP's Greywater and Industrial Wastewaters (Food and Non-Food)",
    "Banana Juice",
    "Process for the production of transglycosylating a-glucosidase using novel fungal strain",
    "Production of Baker's Yeast",
    "Process know-how for Probiotic Carrot nectar",
  ];

  const plantationSpiceProductOptions = [
    "Annatto dye: preparation",
    "Processing of cocoa beans to: Cocoa mass, Cocoa butter, Cocoa powder",
    "Compounded Asafoetida",
    "Food colours: natural - Beetroot, Safflower, Kokum & Grapes",
    "Garlic powder",
    "Kokum: concentrate & powder",
    "Mustard powder",
    "Making superior quality White pepper",
    "Plant growth promoter: n-triacontanol",
    "Spice oil - Pepper",
    "Spice oleoresins: Turmeric & Chillies",
    "An improved process for Chilli oleoresin",
    "Tamarind: juice concentrate & powder",
    "Processing of cocoa (Theobroma cocoa pods to dried cocoa beans)",
    "Zinc - EDTA Chelate",
    "Garlic paste",
    "Ginger paste",
    "Spray dried coconut milk powder",
    "Sugarcane juice spread",
    "Removal of smoky odour from Bhatti cured large cardamom capsules",
    "Green pepper in brine",
    "Green tamarind spice mix - paste & powder",
    "Preparation of cashew apple candy",
    "Faster curing of vanilla beans",
    "Preparation of radical scavenging conserve from tea leaves - normal/coarse/pruned",
    "Chlorogenic acid rich coffee conserve from green coffee beans",
    "Water soluble turmeric colourant (odourless) formulation",
    "2-hydroxy-4 methoxy benzaldehyde, a natural flavourant from Swallow Roots (Decalepis hamittoni) Wight & Arn",
    "Coffee flakes based mouth freshener",
    "Production of coconut spread from Mature coconut water concentrate & coconut dietary fibre",
    "Virgin Coconut oil preparation",
    "Marigold Oleoresin preparation",
    "Preparation of dehydrated green pepper without chemicals",
    "Turmeric powder from fresh turmeric rhizome",
    "Instant Coffee cubes",
    "CGA enriched Carbonated Coffee",
    "Preparation of zerumbone crystals from fresh zerumbet rhizomes",
    "Dehydration of coriander foliage",
    "Process for freshness keeper paper for extension of shelf life of cut roses",
    "Instant Tea Premix",
    "Ethylene Scavenger",
  ];

  const proteinSpecialtyProductOptions = [
    "Mustard/rape seed integrated processing",
    "Sesame: dehulling, (wet process)",
    "Rural based biotechnological production of spirulina",
    "Malted weaning food",
    "Full fat Soya flour: edible (improved process)",
    "Dry dehulling of sesame seed",
    "Low fat high protein snack foods",
    "Bland soya protein concentrate",
    "Energy food: new formulation",
    "Heat resistant white Sesame seeds",
    "Groundnut (peanut) butter",
    "Soya Protein Hydrolysate",
    "Preparation of Beta Carotene and mineral fortified bun",
    "Stabilized edible rice bran",
    "Sesame based nutritious supplement",
    "Moringa seed protein isolate as Flocculant",
    "A Process for flavour essence from decalepis",
    "Process for the preparation of whey protein hydrolysate",
    "Coconut protein powder",
    "Spray-dried refined papain",
    "Cleaner process for biotechnological production of spirulina",
  ];

  const categories = [
    { title: "Bakery Products", options: bakeryProductOptions },
    { title: "Beverage Products", options: beverageProductOptions },
    { title: "Cereal Products", options: cerealProductOptions },
    { title: "Convenience Products", options: convenienceProductOptions },
    { title: "Food Machinery", options: foodMachineryOptions },
    {
      title: "Fruits & Vegetable Products",
      options: fruitsVegetableProductOptions,
    },
    { title: "Meat & Marine Products", options: meatMarineProductOptions },
    {
      title: "Microbiology & Fermentation",
      options: microbiologyFermentationOptions,
    },
    {
      title: "Plantation & Spice Products",
      options: plantationSpiceProductOptions,
    },
    {
      title: "Protein Specialty Products",
      options: proteinSpecialtyProductOptions,
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [visibleItems, setVisibleItems] = useState(12);
  const [hoveredTech, setHoveredTech] = useState(null);
  const [popupHovered, setPopupHovered] = useState(false);
  const popupCloseTimer = useRef(null);

  // Simulate loading delay
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory]);

  // Flatten and filter technologies
  const allOptions = categories.flatMap((cat) =>
    cat.options.map((opt) => ({
      category: cat.title,
      name: opt,
      id: `${cat.title}-${opt}`.replace(/\s+/g, "-").toLowerCase(),
    }))
  );

  const filtered = allOptions
    .filter((opt) => opt.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(
      (opt) => selectedCategory === "All" || opt.category === selectedCategory
    );

  const loadMore = () => {
    setVisibleItems((prev) => prev + 12);
  };

  // Get unique categories for filter buttons
  const availableCategories = [
    "All",
    ...new Set(categories.map((cat) => cat.title)),
  ];

  // Map tech name to path
  const pathMap = {
    sugarfreebiscuit: "/sugarfreebiscuits",
    bakingpowder: "/bakingpowder",
    compositeragirusk: "/compositeragirusk",
  };

  // Helper to close popup only if not hovering popup or list item
  const handleMouseLeave = () => {
    popupCloseTimer.current = setTimeout(() => {
      if (!popupHovered) setHoveredTech(null);
    }, 150); // Slightly longer delay for stability
  };

  const handlePopupMouseEnter = () => {
    setPopupHovered(true);
    if (popupCloseTimer.current) clearTimeout(popupCloseTimer.current);
  };

  const handlePopupMouseLeave = () => {
    setPopupHovered(false);
    popupCloseTimer.current = setTimeout(() => {
      setHoveredTech(null);
    }, 150);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-3">
            CFTRI Technologies
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive collection of innovative food technologies
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search technologies..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setVisibleItems(12);
              }}
            />
          </div>

          <div className="flex items-center justify-center mt-4 mb-6">
            <Filter className="h-5 w-5 text-gray-500 mr-2" />
            <div className="flex flex-wrap justify-center gap-2">
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setVisibleItems(12);
                  }}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white text-gray-700 shadow hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center text-sm text-gray-500 mb-2">
            Found {filtered.length} technologies
            {searchTerm && ` matching "${searchTerm}"`}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </div>
        </div>

        {/* Technology List by Category */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No technologies found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or select a different category
            </p>
          </div>
        ) : (
          <>
            {selectedCategory === "All" ? (
              <div
                className="
    grid gap-6
    sm:grid-cols-2
    lg:grid-cols-3
  "
              >
                {categories.map((cat) => {
                  const catOptions = filtered.filter(
                    (opt) => opt.category === cat.title
                  );
                  if (catOptions.length === 0) return null;
                  return (
                    <div
                      key={cat.title}
                      className="bg-white rounded-xl border border-blue-100 shadow-sm p-4 flex flex-col"
                    >
                      <h2 className="text-lg font-semibold text-blue-800 mb-2 text-center">
                        {cat.title}
                      </h2>
                      <ul
                        className="divide-y divide-blue-100 overflow-y-auto"
                        style={{ maxHeight: "260px" }}
                      >
                        {catOptions.map((tech) => {
                          const techNameNormalized = tech.name
                            .toLowerCase()
                            .replace(/[\s-]+/g, "");
                          const targetPath = pathMap[techNameNormalized];

                          return (
                            <li
                              key={tech.id}
                              className={`
                  group flex items-center px-2 py-1 bg-white
                  hover:bg-blue-50 transition-colors duration-100
                  cursor-${technologyInfo[tech.name] ? "pointer" : "default"}
                `}
                              onMouseEnter={() => {
                                if (technologyInfo[tech.name]) setHoveredTech(tech.id);
                                if (popupCloseTimer.current) clearTimeout(popupCloseTimer.current);
                              }}
                              onMouseLeave={handleMouseLeave}
                            >
                              <div className="flex-1 text-xs font-medium text-gray-800 truncate">
                                {targetPath ? (
                                  <Link
                                    to={targetPath}
                                    className="text-blue-700 hover:underline font-semibold"
                                  >
                                    {tech.name}
                                  </Link>
                                ) : (
                                  tech.name
                                )}
                              </div>
                              {technologyInfo[tech.name] && (
                                <span className="ml-1">
                                  <Info className="h-3.5 w-3.5 text-blue-400 group-hover:text-blue-600 transition-colors" />
                                </span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            ) : (
              categories
                .filter((cat) => cat.title === selectedCategory)
                .map((cat) => {
                  const catOptions = filtered.filter(
                    (opt) => opt.category === cat.title
                  );
                  if (catOptions.length === 0) return null;
                  return (
                    <div key={cat.title} className="mb-10">
                      <h2 className="text-2xl font-bold text-blue-800 mb-4">
                        {cat.title}
                      </h2>
                      <ul
                        className="divide-y divide-blue-100 overflow-y-auto"
                        style={{ maxHeight: "340px" }} // Adjust height as needed
                      >
                        {catOptions.map((tech) => {
                          const techNameNormalized = tech.name
                            .toLowerCase()
                            .replace(/[\s-]+/g, "");
                          const targetPath = pathMap[techNameNormalized];

                          return (
                            <li
                              key={tech.id}
                              className={`
          group flex items-center px-2 py-2 bg-white
          hover:bg-blue-50 transition-colors duration-100
          cursor-${technologyInfo[tech.name] ? "pointer" : "default"}
        `}
                              onMouseEnter={() => {
                                if (technologyInfo[tech.name]) setHoveredTech(tech.id);
                                if (popupCloseTimer.current) clearTimeout(popupCloseTimer.current);
                              }}
                              onMouseLeave={handleMouseLeave}
                            >
                              <div className="flex-1 text-sm font-medium text-gray-800 truncate">
                                {targetPath ? (
                                  <Link
                                    to={targetPath}
                                    className="text-blue-700 hover:underline font-semibold"
                                  >
                                    {tech.name}
                                  </Link>
                                ) : (
                                  tech.name
                                )}
                              </div>
                              {technologyInfo[tech.name] && (
                                <span className="ml-2">
                                  <Info className="h-4 w-4 text-blue-400 group-hover:text-blue-600 transition-colors" />
                                </span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })
            )}

            {/* Render popup ONCE at the end, not inside the list */}
            {hoveredTech && (() => {
              const tech = filtered.find((t) => t.id === hoveredTech);
              if (!tech || !technologyInfo[tech.name]) return null;
              return (
                <div
                  style={{
                    position: "fixed",
                    top: "14vh", // increased from 10vh to 14vh to bring it slightly down
                    right: "2vw",
                    width: "660px",
                    maxWidth: "99vw",
                    height: "60vh",
                    maxHeight: "700px",
                    zIndex: 2000,
                    background: "rgba(30,41,59,0.10)",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-end",
                    pointerEvents: "none",
                  }}
                >
                  <div
                    style={{
                      background: "#fff",
                      borderRadius: "1.5rem",
                      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                      border: "2px solid #a5b4fc",
                      width: "100%",
                      height: "100%",
                      overflowY: "auto",
                      padding: "2.5rem 2rem",
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      pointerEvents: "auto",
                    }}
                    className="transition-all duration-200"
                    onMouseEnter={handlePopupMouseEnter}
                    onMouseLeave={handlePopupMouseLeave}
                  >
                    <button
                      onClick={() => setHoveredTech(null)}
                      style={{
                        position: "absolute",
                        top: 24,
                        right: 32,
                        background: "transparent",
                        border: "none",
                        fontSize: "2rem",
                        color: "#64748b",
                        cursor: "pointer",
                        zIndex: 10,
                      }}
                      aria-label="Close"
                    >
                      &times;
                    </button>
                    <div className="font-bold text-2xl text-indigo-700 mb-4 flex items-center gap-2">
                      <Info className="h-7 w-7 text-indigo-400" />
                      {tech.name}
                    </div>
                    <div
                      className="text-base leading-relaxed whitespace-pre-line"
                      style={{
                        fontFamily: "Georgia, 'Times New Roman', Times, serif",
                        color: "#1e293b",
                        flex: 1,
                        overflowY: "auto",
                        fontSize: "0.85rem", // reduced font size from default
                      }}
                    >
                      {technologyInfo[tech.name]}
                    </div>
                  </div>
                </div>
              );
            })()}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TechnologiesPage;

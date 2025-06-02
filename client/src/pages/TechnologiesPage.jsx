import { useState, useEffect } from "react";
import { Search, Filter, Loader2, Info } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

// Add info for specific technologies here
const technologyInfo = {
  "Sugar-free Biscuit":
    "Sugar-free biscuits are made from soft dough using the creaming method and processed in a rotary moulder. These biscuits are baked in a continuous tunnel-type oven, similar to sweet gluco type biscuits. Unlike regular gluco biscuits that contain about 450 calories and 20–25% sugar, sugar-free biscuits have no added sugar. When packed in polypropylene pouches, metallised polyester, or biaxially oriented polypropylene, they can be stored at ambient conditions for more than four months without changes in texture, flavor, or eating quality.",
  "Baking powder":
    "A leavening agent used in bakery products to increase volume and lighten texture.",
  "Cereal flakes: jowar":
    "Ready-to-eat flakes made from jowar (sorghum), rich in fiber and nutrients.",
  "Spice mix: Puliogere": "A traditional South Indian spice mix used for rice dishes.",
  // Add more as needed...
};

const TechnologiesPage = () => {
  const bakeryProductOptions = [
    "Sugar-free Biscuit",
    "Baking powder",
    "Bread: Production (Brown, Plain, Sweet, Milk, Whole wheat, Fruit, High fiber, Ragi, Bajra)",
    "Composite Bajra Bread",
    "Composite Ragi Rusk",
    "Onion-flavoured biscuit",
    "Wheat Germ Stabilization",
    "Sugar-free cup cake",
    "Sugar-free cake rusk",
    "Instant Payasam Mix",
    "Bar cake",
    "Sugar-free rusk",
    "High protein rusk",
    "Cake rusk",
    "Instant cake mix",
    "Vermicelli (wheat & whole wheat flour)",
    "Fortified protein-rich vemicelli",
    "Layered parotta (South Indian)",
    "Suruchi meetha-health food snacks (burfi)",
    "Honey-based Bakery products",
    "Atta with multi-grains/ multi-whole grains",
    "Instant upma, halva & rava idli mix from multigrain semolina",
    "Instant upma, halva & rava idli mix from high fiber semolina",
    "Instant upma mix from millets & multimillets semolina",
    "Instant halva mix from millets & multimillets semolina",
    "Instant rava idli mix from millets & multimillets semolina",
    "Production of high fiber semolina (sooji/rava)",
    "Production of high protein semolina (sooji/rava)",
    "Production of barley dahlia/semolina",
    "Roller milling process for multigrain semolina (sooji/rava)",
    "Roller milling process for semolina (sooji/rava) from millets & preparation of multimillets",
    "Process for extension of shelf life of bread with natural preservatives",
    "Shelf Stable muffins with natural preservatives",
    "Nutritious high fiber soup sticks",
    "Baked savory snacks",
    "Preparation of chestnut-based gluten-free cookies",
    "Ragi-based biscuit",
    "Buckwheat Noodles (Soba)/Pasta",
    "Gluten free Biscuit",
    "Gluten free Cookie Cake",
    "Multigrain Nutri Cookies",
    "Production of Quinoa Germ Preparation of Spice Bread",
    "Preparation of Fibre Enriched Rusk",
    "Process for Gluten Free Cake Mix",
    "A process for the production of multigrain waffle",
    "A process for the production of Multigrain Pizza Base",
    "Process for development of gluten free bread premixes [three Versions] 1.Proso millet, 2. Foxtail millet and 3. Barnyard millet",
    "Process for development of gluten free bread premix (Version -1) Proso millet",
    "Process for development of gluten free bread premix (version-2) Foxtail millet",
    "Development of gluten free bread premix (version-3) Baryard millet",
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
  const [popupPos, setPopupPos] = useState({ left: 0, top: 0 });

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
            {(
              selectedCategory === "All"
                ? categories
                : categories.filter((cat) => cat.title === selectedCategory)
            ).map((cat) => {
              const catOptions = filtered.filter(
                (opt) => opt.category === cat.title
              );
              if (catOptions.length === 0) return null;
              return (
                <div key={cat.title} className="mb-10">
                  <h2 className="text-2xl font-bold text-blue-800 mb-4">
                    {cat.title}
                  </h2>
                  <ul className="list-disc pl-6 space-y-2">
                    {catOptions.slice(0, visibleItems).map((tech) => {
                      const techNameNormalized = tech.name
                        .toLowerCase()
                        .replace(/[\s-]+/g, "");
                      const targetPath = pathMap[techNameNormalized];

                      return (
                        <li
                          key={tech.id}
                          className="relative text-gray-800 group"
                          onMouseEnter={e => {
                            if (technologyInfo[tech.name]) {
                              setHoveredTech(tech.id);
                              // Use clientX/clientY for mouse pointer position, fallback to rect if needed
                              setPopupPos({
                                left: e.clientX + 16, // 16px right of mouse
                                top: e.clientY + 8,   // 8px below mouse
                              });
                            }
                          }}
                          onMouseLeave={() => setHoveredTech(null)}
                          style={{
                            cursor: technologyInfo[tech.name]
                              ? "pointer"
                              : "default",
                          }}
                        >
                          {targetPath ? (
                            <Link
                              to={targetPath}
                              className="text-blue-700 hover:underline font-medium"
                            >
                              {tech.name}
                            </Link>
                          ) : (
                            tech.name
                          )}
                          {technologyInfo[tech.name] && (
                            <Info className="inline ml-1 h-4 w-4 text-blue-400" />
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}

            {/* Render popup ONCE at the end, not inside the list */}
            {hoveredTech && (() => {
              const tech = filtered.find(t => t.id === hoveredTech);
              if (!tech || !technologyInfo[tech.name]) return null;
              return (
                <div
                  style={{
                    position: "fixed",
                    left: popupPos.left,
                    top: popupPos.top,
                    zIndex: 1000,
                    width: "32rem", // Larger width
                    maxWidth: "95vw",
                    minHeight: "7rem",
                    pointerEvents: "none",
                    whiteSpace: "pre-line",
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                    backdropFilter: "blur(6px)",
                    border: "1.5px solid #a5b4fc",
                    borderRadius: "1.25rem",
                    background: "linear-gradient(135deg, #f8fafc 80%, #e0e7ff 100%)",
                  }}
                  className="p-8 text-gray-800 transition-all duration-200"
                >
                  <div className="font-semibold text-indigo-700 mb-2 flex items-center gap-2">
                    <Info className="h-5 w-5 text-indigo-400" />
                    {tech.name}
                  </div>
                  <div className="text-sm leading-relaxed">
                    {technologyInfo[tech.name]}
                  </div>
                </div>
              );
            })()}

            {visibleItems < filtered.length && (
              <div className="mt-8 text-center">
                <button
                  onClick={loadMore}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Load More
                </button>
                <p className="mt-2 text-sm text-gray-500">
                  Showing {Math.min(visibleItems, filtered.length)} of{" "}
                  {filtered.length} technologies
                </p>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TechnologiesPage;

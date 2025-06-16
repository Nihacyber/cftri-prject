import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  User,
  Mail,
  Smartphone,
  Building2,
  BookOpen,
  MapPin,
  Globe,
  DollarSign,
  Calendar,
  Check,
} from "lucide-react";

// --- Discussion Matter Options and Sub-Options ---
const discussionMatterOptions = [
  "Bakery Products",
  "Beverage Products",
  "Cereal Products",
  "Convenience Products",
  "Food Machinery",
  "Fruits & Vegetable Products",
  "Meat & Marine Products",
  "Microbiology & Fermentation",
  "Plantation & Spice Products",
  "Protein Specialty Products",
];

const bakeryProductOptions = [
  "Sugar-free Biscuit",
  "Baking powder",
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

const subOptionsMap = {
  "Bakery Products": bakeryProductOptions,
  "Beverage Products": beverageProductOptions,
  "Cereal Products": cerealProductOptions,
  "Convenience Products": convenienceProductOptions,
  "Food Machinery": foodMachineryOptions,
  "Fruits & Vegetable Products": fruitsVegetableProductOptions,
  "Meat & Marine Products": meatMarineProductOptions,
  "Microbiology & Fermentation": microbiologyFermentationOptions,
  "Plantation & Spice Products": plantationSpiceProductOptions,
  "Protein Specialty Products": proteinSpecialtyProductOptions,
};

const typeOptions = [
  "Start-up",
  "MNC",
  "Women Entrepreneurship",
  "FPO",
  "SHC",
  "MSME",
];

const categoryOptions = ["SC/ST", "General", "OBC"];
const genderOptions = ["Male", "Female", "Other"];
const sourceOptions = [
  { value: "source1", label: "Source 1" },
  { value: "source2", label: "Source 2" },
];

const CreateLead = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    onboarding: {
      details: {
        subject: "",
        discussionMatter: "",
        specificOption: "",
        type: "",
        expectedCloseDate: "",
        state: "",
        place: "",
        address: "",
        gender: "",
        country: "",
        category: "",
        organization: "",
        projectMode: "",
        collaborativeOptions: [],
        collaborativeOther: "",
        leadValue: "",
        source: "",
      },
    },
  });

  const [showSpecificOptions, setShowSpecificOptions] = useState(false);
  const [specificOptions, setSpecificOptions] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Set specific options based on selected discussion matter
    const matter = formData.onboarding.details.discussionMatter;
    if (matter && subOptionsMap[matter]) {
      setSpecificOptions(subOptionsMap[matter]);
      setShowSpecificOptions(true);
    } else {
      setShowSpecificOptions(false);
      setSpecificOptions([]);
      setFormData((prev) => ({
        ...prev,
        onboarding: {
          ...prev.onboarding,
          details: {
            ...prev.onboarding.details,
            specificOption: "",
          },
        },
      }));
    }
  }, [formData.onboarding.details.discussionMatter]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => {
        const options = prev.onboarding.details.collaborativeOptions || [];
        return {
          ...prev,
          onboarding: {
            ...prev.onboarding,
            details: {
              ...prev.onboarding.details,
              collaborativeOptions: checked
                ? [...options, value]
                : options.filter((v) => v !== value),
            },
          },
        };
      });
    } else if (name.startsWith("onboarding.details.")) {
      const field = name.split(".")[2];
      setFormData((prev) => ({
        ...prev,
        onboarding: {
          ...prev.onboarding,
          details: {
            ...prev.onboarding.details,
            [field]: value,
          },
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/lead/createLead", formData);
      setToastMessage("Lead created successfully!");
      setTimeout(() => {
        navigate("/admin?tab=3");
      }, 2000);
    } catch (err) {
      setToastMessage("Error creating lead.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                Create Lead
              </h2>
              <p className="text-gray-500">Fill the details to create a lead</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h3 className="text-2xl font-semibold text-blue-700">
                    Lead & Technical Details
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        placeholder="Lead Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        placeholder="lead@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>
                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <div className="relative">
                      <BookOpen className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="onboarding.details.subject"
                        placeholder="Subject"
                        value={formData.onboarding.details.subject}
                        onChange={handleChange}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      name="onboarding.details.gender"
                      value={formData.onboarding.details.gender}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select Gender</option>
                      {genderOptions.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      name="onboarding.details.category"
                      value={formData.onboarding.details.category}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select Category</option>
                      {categoryOptions.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="onboarding.details.country"
                        placeholder="Country"
                        value={formData.onboarding.details.country}
                        onChange={handleChange}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  {/* State */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="onboarding.details.state"
                        placeholder="State"
                        value={formData.onboarding.details.state}
                        onChange={handleChange}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  {/* Place */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Place
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="onboarding.details.place"
                        placeholder="Place"
                        value={formData.onboarding.details.place}
                        onChange={handleChange}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="onboarding.details.address"
                        placeholder="Full Address"
                        value={formData.onboarding.details.address}
                        onChange={handleChange}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  {/* Contact Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Number
                    </label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        name="contact"
                        placeholder="e.g. +91-9876543210"
                        value={formData.contact}
                        onChange={handleChange}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  {/* Organization Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Organization Name
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="onboarding.details.organization"
                        placeholder="Organization Name"
                        value={formData.onboarding.details.organization || ""}
                        onChange={handleChange}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  {/* Type */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <select
                      name="onboarding.details.type"
                      value={formData.onboarding.details.type}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select Type</option>
                      {typeOptions.map((t, i) => (
                        <option key={i} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Business Scale */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Scale
                    </label>
                    <div className="flex gap-6">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="onboarding.details.projectMode"
                          value="collaborative"
                          checked={
                            formData.onboarding.details.projectMode ===
                            "collaborative"
                          }
                          onChange={handleChange}
                          className="mr-2"
                        />
                        Collaborative Project
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="onboarding.details.projectMode"
                          value="transfer"
                          checked={
                            formData.onboarding.details.projectMode === "transfer"
                          }
                          onChange={handleChange}
                          className="mr-2"
                        />
                        Technology Transfer
                      </label>
                    </div>
                  </div>
                  {/* Collaborative Focus Areas */}
                  {formData.onboarding.details.projectMode === "collaborative" && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Collaborative Focus Areas
                      </label>
                      <div className="space-y-2">
                        {[
                          "Product Development",
                          "Process Optimization",
                          "Shelf-life Extension",
                        ].map((option) => (
                          <label key={option} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              value={option}
                              checked={formData.onboarding.details.collaborativeOptions?.includes(
                                option
                              )}
                              onChange={handleChange}
                            />
                            {option}
                          </label>
                        ))}
                        <label className="block text-sm font-medium text-gray-700 mt-4">
                          Others
                        </label>
                        <input
                          type="text"
                          placeholder="Describe other collaborative focus..."
                          value={formData.onboarding.details.collaborativeOther}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              onboarding: {
                                ...prev.onboarding,
                                details: {
                                  ...prev.onboarding.details,
                                  collaborativeOther: e.target.value,
                                },
                              },
                            }))
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  )}
                  {/* Topic of Interest (for Technology Transfer) */}
                  {formData.onboarding.details.projectMode === "transfer" && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Topic of Interest
                      </label>
                      <Select
                        options={discussionMatterOptions.map((topic) => ({
                          value: topic,
                          label: topic,
                        }))}
                        value={
                          formData.onboarding.details.discussionMatter
                            ? {
                                value: formData.onboarding.details.discussionMatter,
                                label: formData.onboarding.details.discussionMatter,
                              }
                            : null
                        }
                        onChange={(selected) =>
                          setFormData((prev) => ({
                            ...prev,
                            onboarding: {
                              ...prev.onboarding,
                              details: {
                                ...prev.onboarding.details,
                                discussionMatter: selected ? selected.value : "",
                                specificOption: "",
                              },
                            },
                          }))
                        }
                        placeholder="Select Topic of Interest"
                        isClearable
                        menuPortalTarget={document.body}
                        menuPosition="fixed"
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            backgroundColor: "#f0f6ff",
                            borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
                            boxShadow: state.isFocused ? "0 0 0 2px #3b82f6" : "",
                            borderRadius: "0.5rem",
                            minHeight: 48,
                            fontSize: "1rem",
                            padding: "2px 0",
                            transition: "border-color 0.2s, box-shadow 0.2s",
                            "&:hover": { borderColor: "#3b82f6" },
                            zIndex: 1,
                          }),
                          menu: (provided) => ({
                            ...provided,
                            zIndex: 9999,
                            maxHeight: 300,
                            borderRadius: "0.75rem",
                            boxShadow: "0 8px 24px 0 rgba(59, 130, 246, 0.10)",
                            backgroundColor: "#fff",
                            overflow: "hidden",
                          }),
                          option: (provided, state) => ({
                            ...provided,
                            fontSize: "1rem",
                            backgroundColor: state.isSelected
                              ? "#3b82f6"
                              : state.isFocused
                              ? "#e0e7ff"
                              : "#fff",
                            color: state.isSelected ? "#fff" : "#1e293b",
                            cursor: "pointer",
                            transition: "background 0.15s",
                            borderRadius: "0.5rem",
                            margin: "2px 8px",
                            paddingLeft: 16,
                          }),
                          menuList: (provided) => ({
                            ...provided,
                            maxHeight: 250,
                            overflowY: "auto",
                            paddingTop: 8,
                            paddingBottom: 8,
                            borderRadius: "0.75rem",
                          }),
                          placeholder: (provided) => ({
                            ...provided,
                            color: "#64748b",
                            fontSize: "1rem",
                          }),
                          singleValue: (provided) => ({
                            ...provided,
                            color: "#1e293b",
                            fontSize: "1rem",
                          }),
                          input: (provided) => ({
                            ...provided,
                            color: "#1e293b",
                            fontSize: "1rem",
                          }),
                          indicatorSeparator: () => ({
                            display: "none",
                          }),
                          dropdownIndicator: (provided, state) => ({
                            ...provided,
                            color: state.isFocused ? "#3b82f6" : "#64748b",
                            "&:hover": { color: "#3b82f6" },
                            transition: "color 0.2s",
                          }),
                          clearIndicator: (provided) => ({
                            ...provided,
                            color: "#64748b",
                            "&:hover": { color: "#3b82f6" },
                            transition: "color 0.2s",
                          }),
                        }}
                        menuPlacement="auto"
                      />
                    </div>
                  )}
                  {/* Specific Option (always show if available) */}
                  {showSpecificOptions && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Specific {formData.onboarding.details.discussionMatter}
                      </label>
                      <Select
                        options={specificOptions.map((option) => ({
                          value: option,
                          label: option,
                        }))}
                        value={
                          formData.onboarding.details.specificOption
                            ? {
                                value: formData.onboarding.details.specificOption,
                                label: formData.onboarding.details.specificOption,
                              }
                            : null
                        }
                        onChange={(selected) =>
                          setFormData((prev) => ({
                            ...prev,
                            onboarding: {
                              ...prev.onboarding,
                              details: {
                                ...prev.onboarding.details,
                                specificOption: selected ? selected.value : "",
                              },
                            },
                          }))
                        }
                        placeholder={`Select or search ${formData.onboarding.details.discussionMatter}`}
                        isClearable
                        menuPortalTarget={document.body}
                        menuPosition="fixed"
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            backgroundColor: "#f0f6ff",
                            borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
                            boxShadow: state.isFocused ? "0 0 0 2px #3b82f6" : "",
                            borderRadius: "0.5rem",
                            minHeight: 48,
                            fontSize: "1rem",
                            padding: "2px 0",
                            transition: "border-color 0.2s, box-shadow 0.2s",
                            "&:hover": { borderColor: "#3b82f6" },
                            zIndex: 1,
                          }),
                          menu: (provided) => ({
                            ...provided,
                            zIndex: 9999,
                            maxHeight: 300,
                            borderRadius: "0.75rem",
                            boxShadow: "0 8px 24px 0 rgba(59, 130, 246, 0.10)",
                            backgroundColor: "#fff",
                            overflow: "hidden",
                          }),
                          option: (provided, state) => ({
                            ...provided,
                            fontSize: "1rem",
                            backgroundColor: state.isSelected
                              ? "#3b82f6"
                              : state.isFocused
                              ? "#e0e7ff"
                              : "#fff",
                            color: state.isSelected ? "#fff" : "#1e293b",
                            cursor: "pointer",
                            transition: "background 0.15s",
                            borderRadius: "0.5rem",
                            margin: "2px 8px",
                            paddingLeft: 16,
                          }),
                          menuList: (provided) => ({
                            ...provided,
                            maxHeight: 250,
                            overflowY: "auto",
                            paddingTop: 8,
                            paddingBottom: 8,
                            borderRadius: "0.75rem",
                          }),
                          placeholder: (provided) => ({
                            ...provided,
                            color: "#64748b",
                            fontSize: "1rem",
                          }),
                          singleValue: (provided) => ({
                            ...provided,
                            color: "#1e293b",
                            fontSize: "1rem",
                          }),
                          input: (provided) => ({
                            ...provided,
                            color: "#1e293b",
                            fontSize: "1rem",
                          }),
                          indicatorSeparator: () => ({
                            display: "none",
                          }),
                          dropdownIndicator: (provided, state) => ({
                            ...provided,
                            color: state.isFocused ? "#3b82f6" : "#64748b",
                            "&:hover": { color: "#3b82f6" },
                            transition: "color 0.2s",
                          }),
                          clearIndicator: (provided) => ({
                            ...provided,
                            color: "#64748b",
                            "&:hover": { color: "#3b82f6" },
                            transition: "color 0.2s",
                          }),
                        }}
                        menuPlacement="auto"
                      />
                    </div>
                  )}
                  {/* Lead Value */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lead Value
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        name="onboarding.details.leadValue"
                        placeholder="Lead Value"
                        value={formData.onboarding.details.leadValue}
                        onChange={handleChange}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  {/* Source */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Source
                    </label>
                    <Select
                      options={sourceOptions}
                      value={
                        sourceOptions.find(
                          (opt) =>
                            opt.value === formData.onboarding.details.source
                        ) || null
                      }
                      onChange={(selected) =>
                        setFormData((prev) => ({
                          ...prev,
                          onboarding: {
                            ...prev.onboarding,
                            details: {
                              ...prev.onboarding.details,
                              source: selected ? selected.value : "",
                            },
                          },
                        }))
                      }
                      placeholder="Select Source"
                      isClearable
                      menuPortalTarget={document.body}
                      menuPosition="fixed"
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          backgroundColor: "#f0f6ff",
                          borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
                          boxShadow: state.isFocused ? "0 0 0 2px #3b82f6" : "",
                          borderRadius: "0.5rem",
                          minHeight: 48,
                          fontSize: "1rem",
                          padding: "2px 0",
                          transition: "border-color 0.2s, box-shadow 0.2s",
                          "&:hover": { borderColor: "#3b82f6" },
                          zIndex: 1,
                        }),
                        menu: (provided) => ({
                          ...provided,
                          zIndex: 9999,
                          maxHeight: 300,
                          borderRadius: "0.75rem",
                          boxShadow: "0 8px 24px 0 rgba(59, 130, 246, 0.10)",
                          backgroundColor: "#fff",
                          overflow: "hidden",
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          fontSize: "1rem",
                          backgroundColor: state.isSelected
                            ? "#3b82f6"
                            : state.isFocused
                            ? "#e0e7ff"
                            : "#fff",
                          color: state.isSelected ? "#fff" : "#1e293b",
                          cursor: "pointer",
                          transition: "background 0.15s",
                          borderRadius: "0.5rem",
                          margin: "2px 8px",
                          paddingLeft: 16,
                        }),
                        menuList: (provided) => ({
                          ...provided,
                          maxHeight: 250,
                          overflowY: "auto",
                          paddingTop: 8,
                          paddingBottom: 8,
                          borderRadius: "0.75rem",
                        }),
                        placeholder: (provided) => ({
                          ...provided,
                          color: "#64748b",
                          fontSize: "1rem",
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          color: "#1e293b",
                          fontSize: "1rem",
                        }),
                        input: (provided) => ({
                          ...provided,
                          color: "#1e293b",
                          fontSize: "1rem",
                        }),
                        indicatorSeparator: () => ({
                          display: "none",
                        }),
                        dropdownIndicator: (provided, state) => ({
                          ...provided,
                          color: state.isFocused ? "#3b82f6" : "#64748b",
                          "&:hover": { color: "#3b82f6" },
                          transition: "color 0.2s",
                        }),
                        clearIndicator: (provided) => ({
                          ...provided,
                          color: "#64748b",
                          "&:hover": { color: "#3b82f6" },
                          transition: "color 0.2s",
                        }),
                      }}
                      menuPlacement="auto"
                    />
                  </div>
                  {/* Expected Close Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expected Close Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        name="onboarding.details.expectedCloseDate"
                        value={formData.onboarding.details.expectedCloseDate}
                        onChange={handleChange}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
                  >
                    Create Lead <Check className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default CreateLead;

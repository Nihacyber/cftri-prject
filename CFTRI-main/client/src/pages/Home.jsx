import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const sliderImages = [
  "https://cftri.res.in/owol/img/cftri-home.jpg",
  "https://media.gettyimages.com/id/565073759/photo/cheluvamba-mansion-the-premises-of-the-cftri-in-mysore-india-circa-1965-this-renaissance-style.jpg?s=612x612&w=0&k=20&c=qDilHAR2W8V11naysqPjGM9ZkozxHabV734Ckh6YJXA=",
  "https://images.collegedunia.com/public/college_data/images/campusimage/1468317355B%20(1).JPG",
  "https://github.com/Nihacyber/CFTRI/blob/main/cftri%20images/front.jpg?raw=true",
  "http://172.16.1.15:8443/img/slider_images/img02.jpg",
];

const Home = () => {
  const [current, setCurrent] = useState(0);
  const introRef = React.useRef(null);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (idx) => setCurrent(idx);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-gray-50 min-h-screen">


      {/* Carousel */}
      <main className="pb-8">
        <div className="w-full relative">
          <div className="relative w-full h-64 md:h-96 overflow-hidden">
            {sliderImages.map((img, idx) => (
              <img
                key={img}
                src={img}
                alt=""
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${idx === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                style={{ transitionProperty: "opacity" }}
              />
            ))}
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {sliderImages.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-3 h-3 rounded-full ${current === idx ? "bg-blue-600" : "bg-white border border-blue-600"} transition`}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            {/* Prev/Next Buttons */}
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-blue-900 rounded-full p-2 shadow z-20"
              onClick={() => setCurrent((current - 1 + sliderImages.length) % sliderImages.length)}
              aria-label="Previous Slide"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-blue-900 rounded-full p-2 shadow z-20"
              onClick={() => setCurrent((current + 1) % sliderImages.length)}
              aria-label="Next Slide"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>

        {/* Patrons Section */}
        <section
          className="container mx-auto px-4 py-10"
          style={{ backgroundColor: "#fff4e6" }} // Light orange background to match your HTML
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-900 mb-8">
            Our Patrons
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTKqIg3pZGnGVuDbO7piYwe2EBzDMOcMohDv5sIWQ-tnD7ruRla",
                name: "Shri Narendra Modi",
                role: "President, CSIR",
              },
              {
                img: "https://apicxotv.techplusmedia.com/uploads/2023/11/Union-Minister-Dr-Jitendra-Singh-Emphasizes-Indias-Scientific-Growth-and-Global-Leadership.jpg",
                name: "Dr. Jitendra Singh",
                role: "Vice President, CSIR",
              },
              {
                img: "https://cdn.expresspharma.in/wp-content/uploads/2022/08/09104339/Kalaiselvi.jpg",
                name: "Dr. N Kalaiselvi",
                role: "Director General, CSIR",
              },
              {
                img: "https://cftri.res.in/assets/user/images/dir-image.jpg",
                name: "Dr. Sridevi Annapurna Singh",
                role: "Director, CSIR-CFTRI",
              },
            ].map((p) => (
              <div key={p.name} className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                <img src={p.img} alt={p.name} className="w-24 h-24 rounded-full object-cover mb-3 border-4 border-blue-200" />
                <h5 className="font-bold text-blue-900">{p.name}</h5>
                <p className="text-blue-700 text-sm">{p.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Introduction Section */}
        <section
          ref={introRef}
          className="bg-blue-900 border-t border-blue-800 shadow-inner"
        >
          <div className="container mx-auto px-4 py-10">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">CSIR-CFTRI</h2>
                <p className="mb-2 text-blue-100">
                  CSIR−Central Food Technological Research Institute (CFTRI), Mysuru (A
                  constituent laboratory of Council of Scientific and Industrial Research,
                  New Delhi) came into existence during 1950 with the great vision of its
                  founders, and a network of inspiring as well as dedicated scientists who
                  had a fascination to pursue in-depth research and development in the areas
                  of food science and technology. Research focus of CSIR-CFTRI has been
                  revolved around broadly into the following areas:
                </p>
                <ul className="list-disc list-inside text-blue-200 mb-2">
                  <li>Engineering Sciences</li>
                  <li>Technology Development</li>
                  <li>Translational Research</li>
                  <li>Food Protection and Safety</li>
                </ul>
                <p className="text-blue-100">
                  Food Technology being inter-disciplinary in nature the mandate or vision of
                  the Institute is fulfilled through various R&amp;D Departments and Support
                  Departments along with its Resource Centres at Hyderabad, Lucknow and
                  Mumbai.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Technology focus</h2>
                <ul className="list-disc list-inside text-blue-200 space-y-1">
                  <li>Bakery Products</li>
                  <li>Beverage Products</li>
                  <li>Cereal Products</li>
                  <li>Convenience Products</li>
                  <li>Food Machinery</li>
                  <li>Fruits &amp; Vegetable Products</li>
                  <li>Functional Foods</li>
                  <li>Meat &amp; Marine Products</li>
                  <li>Microbiology &amp; Fermentation Products</li>
                  <li>Millets</li>
                  <li>Protein Speciality Products</li>
                  <li>Spice &amp; Flavour Science</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Opportunities Section */}
        <section
          className="container mx-auto px-4 py-10"
          style={{ backgroundColor: "#fff4e6" }} // Light orange background to match your HTML
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-900 mb-8">
            Opportunities for Industries &amp; Business
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow p-6 text-center flex flex-col items-center">
              <img src="http://172.16.1.15:8443/img/collaboration.png" width={140} height={140} alt="Collaboration" className="mx-auto mb-4" />
              <h3 className="font-bold text-blue-900 mb-2">Collaboration</h3>
              <p className="text-gray-700 mb-4">
                CSIR-CFTRI collaborates with various industries through different modes, including Corporate Social Responsibility (CSR) projects, technology transfer, and consultancy services.
              </p>
              <a className="btn btn-secondary bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 transition" href="#">
                Read more &raquo;
              </a>
            </div>
            <div className="bg-white rounded-xl shadow p-6 text-center flex flex-col items-center">
              <img src="http://172.16.1.15:8443/img/consultancy.png" width={140} height={140} alt="Consultancy" className="mx-auto mb-4" />
              <h3 className="font-bold text-blue-900 mb-2">Consultancy</h3>
              <p className="text-gray-700 mb-4">
                CFTRI offers consultancy services to the food and agricultural industry, providing assistance with testing, analysis, technical advice, and setting up quality assurance laboratories.
              </p>
              <a className="btn btn-secondary bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 transition" href="#">
                Read more &raquo;
              </a>
            </div>
            <div className="bg-white rounded-xl shadow p-6 text-center flex flex-col items-center">
              <img src="http://172.16.1.15:8443/img/startup.png" width={140} height={140} alt="Startup" className="mx-auto mb-4" />
              <h3 className="font-bold text-blue-900 mb-2">Startup</h3>
              <p className="text-gray-700 mb-4">
                NPIC-CIF &amp; BioNEST at CSIR-CFTRI provides food technology startups with a platform to innovate, collaborate, and grow.
              </p>
              <a className="btn btn-secondary bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 transition" href="#">
                View details &raquo;
              </a>
            </div>
          </div>
        </section>

        {/* Explore Our Robust Technology Basket - SLIDER */}
        <section className="bg-blue-900 border-t border-blue-800 shadow-inner py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-8 tracking-wide">
              Explore Our Robust Technology Basket
            </h2>
            <TechnologySlider />
          </div>
        </section>

        {/* Technology Highlights */}
        <section className="container mx-auto px-4 py-14">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center text-blue-900 mb-12 tracking-tight font-serif drop-shadow-lg">
            <span className="bg-gradient-to-r from-blue-700 via-blue-400 to-blue-700 bg-clip-text text-transparent">
              Technology Highlights
            </span>
          </h1>
          <div className="space-y-16">
            {/* Highlight 1 */}
            <div className="grid md:grid-cols-2 gap-10 items-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl shadow-lg p-8 hover:scale-[1.02] transition-transform duration-300">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4 font-serif tracking-wide">
                  <span className="underline decoration-blue-400 decoration-4 underline-offset-4">Beverages from Green Coffee</span>
                </h2>
                <p className="text-lg text-gray-700 font-sans leading-relaxed">
                  <span className="font-semibold text-blue-700">Green coffee extract</span> rich in bioactive molecules is used for preparation of natural polyphenol-rich carbonated and non-carbonated beverages.
                  These drinks offer <span className="text-blue-800 font-semibold">health benefits</span> and can be enjoyed as refreshing beverages with enhanced antioxidant properties.
                </p>
              </div>
              <div className="flex justify-center">
                <img
                  src="http://172.16.1.15:8443/img/green-coffee.png"
                  alt="Green Coffee"
                  className="rounded-2xl shadow-2xl w-96 h-80 object-cover border-4 border-blue-200"
                />
              </div>
            </div>
            {/* Highlight 2 */}
            <div className="grid md:grid-cols-2 gap-10 items-center bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl shadow-lg p-8 hover:scale-[1.02] transition-transform duration-300">
              <div className="order-2 md:order-1 flex justify-center">
                <img
                  src="http://172.16.1.15:8443/img/Prebiotics.png"
                  alt="Prebiotics"
                  className="rounded-2xl shadow-2xl w-96 h-80 object-cover border-4 border-blue-200"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4 font-serif tracking-wide">
                  <span className="underline decoration-blue-400 decoration-4 underline-offset-4">Prebiotics and Probiotics</span>
                </h2>
                <p className="text-lg text-gray-700 font-sans leading-relaxed">
                  <span className="font-semibold text-blue-700">Prebiotics</span> are functional food components that improve human health by inducing the growth of healthy microorganisms.
                  Novel <span className="text-blue-800 font-semibold">biopreservatives</span> and probiotic bacteria like <span className="italic">Lactobacillus</span> spp. and <span className="italic">Bifidobacteria</span> are being explored for their health benefits and molecular interactions with gut microbiota.
                </p>
              </div>
            </div>
            {/* Highlight 3 */}
            <div className="grid md:grid-cols-2 gap-10 items-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl shadow-lg p-8 hover:scale-[1.02] transition-transform duration-300">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4 font-serif tracking-wide">
                  <span className="underline decoration-blue-400 decoration-4 underline-offset-4">Shelf-life Extension of Prasadams</span>
                </h2>
                <p className="text-lg text-gray-700 font-sans leading-relaxed">
                  <span className="font-semibold text-blue-700">Godhi Huggi</span> is a wheat-based delicacy from North Karnataka.
                  CSIR-CFTRI has developed advanced processing protocols to ensure <span className="text-blue-800 font-semibold">1 year shelf-life extension</span> for these products, benefiting both manufacturers and consumers.
                </p>
              </div>
              <div className="flex justify-center">
                <img
                  src="http://172.16.1.15:8443/img/prasadam.jpg"
                  alt="Prasadam"
                  className="rounded-2xl shadow-2xl w-96 h-80 object-cover border-4 border-blue-200"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

const techSliderData = [
  {
    img: "http://172.16.1.15:8443/img/bakery_products.png",
    title: "Bakery Products",
  },
  {
    img: "https://github.com/Nihacyber/CFTRI/blob/main/cftri%20images/C-hydra%20drink.png?raw=true",
    title: "Beverage Products",
  },
  {
    img: "http://172.16.1.15:8443/img/grain.png",
    title: "Cereal Products",
  },
  {
    img: "",
    title: "",
  },
  {
    img: "http://172.16.1.15:8443/img/machinery.jpg",
    title: "Food Machinery",
  },
  {
    img: " ",
    title: "",
  },
  {
    img: "",
    title: "Meat & Marine Products",
  },
  {
    img: "",
    title: "Microbiology & Fermentation",
  },
  {
    img: "https://github.com/Nihacyber/CFTRI/blob/main/cftri%20images/Instant%20Tea%20Premix.png?raw=true",
    title: "Plantation & Spice Products",
  },
  {
    img: "https://github.com/Nihacyber/CFTRI/blob/main/cftri%20images/protein.jpg?raw=true",
    title: "Protein Specialty Products",
  },
];

function TechnologySlider() {
  const itemsPerSlide = 3;
  const [techCurrent, setTechCurrent] = React.useState(0);
  const navigate = useNavigate();

  // Only show slides with at least a title or image
  const filteredData = techSliderData.filter(
    (item) => item.title || (item.img && item.img.trim() !== "")
  );

  // Calculate the total number of possible positions (so the last slide can show less than 3 if at the end)
  const totalPositions =
    filteredData.length - itemsPerSlide + 1 > 0
      ? filteredData.length - itemsPerSlide + 1
      : 1;

  // For smooth sliding, use translateX and a wrapper
  const [isManual, setIsManual] = React.useState(false);

  // Auto-slide
  React.useEffect(() => {
    if (isManual) return; // Pause auto-slide briefly after manual navigation
    const interval = setInterval(() => {
      setTechCurrent((prev) => (prev + 1) % totalPositions);
    }, 4000);
    return () => clearInterval(interval);
  }, [totalPositions, isManual]);

  // Pause auto-slide for 5s after manual navigation
  React.useEffect(() => {
    if (!isManual) return;
    const timeout = setTimeout(() => setIsManual(false), 5000);
    return () => clearTimeout(timeout);
  }, [isManual]);

  const handleDotClick = (idx) => {
    if (idx === techCurrent) return;
    setTechCurrent(idx);
    setIsManual(true);
  };

  const handlePrev = () => {
    setTechCurrent((prev) => (prev - 1 + totalPositions) % totalPositions);
    setIsManual(true);
  };

  const handleNext = () => {
    setTechCurrent((prev) => (prev + 1) % totalPositions);
    setIsManual(true);
  };

  // Get the current visible items
  const visibleItems = filteredData.slice(
    techCurrent,
    techCurrent + itemsPerSlide
  );
  while (visibleItems.length < itemsPerSlide) {
    visibleItems.push({});
  }

  // For smooth sliding, render all slides in a row and shift with translateX
  const slideWidth = 340; // px, should match w-80 + gap
  const totalSlides = filteredData.length;
  const sliderStyle = {
    width: `${slideWidth * totalSlides}px`,
    transform: `translateX(-${techCurrent * (slideWidth + 32)}px)`, // 32px = gap-8
    transition: "transform 0.6s cubic-bezier(.4,0,.2,1)",
    display: "flex",
    gap: "2rem",
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto min-h-[340px] overflow-hidden">
      <div style={sliderStyle}>
        {filteredData.map((item, idx) => (
          <div
            key={item.title || idx}
            className="relative flex flex-col items-center bg-white rounded-xl shadow-lg w-80 h-[320px] overflow-hidden p-0 cursor-pointer group"
            style={{
              border: "1px solid #e5e7eb",
              minHeight: "320px",
              background: "#fff",
              flex: "0 0 320px",
              marginRight: idx !== filteredData.length - 1 ? "2rem" : 0,
              transition: "box-shadow 0.3s",
            }}
            onClick={() => item.title && navigate("/technologies")}
            tabIndex={item.title ? 0 : -1}
            role={item.title ? "button" : undefined}
            aria-label={item.title ? `Go to ${item.title}` : undefined}
          >
            <div className="w-full h-full flex items-center justify-center bg-gray-100 relative">
              {item.img && item.img.trim() !== "" ? (
                <>
                  <img
                    src={item.img}
                    alt={item.title || ""}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    style={{
                      border: "none",
                      borderRadius: 0,
                    }}
                  />
                  {item.title && (
                    <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-900/80 via-blue-900/40 to-transparent px-4 py-3">
                      <h3 className="text-lg font-semibold text-white text-center drop-shadow">
                        {item.title}
                      </h3>
                    </div>
                  )}
                </>
              ) : (
                <div className="h-full w-full flex items-center justify-center text-gray-300 text-2xl bg-blue-700">
                  No Image
                  {item.title && (
                    <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-900/80 via-blue-900/40 to-transparent px-4 py-3">
                      <h3 className="text-lg font-semibold text-white text-center drop-shadow">
                        {item.title}
                      </h3>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {Array.from({ length: totalPositions }).map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full ${
              techCurrent === idx
                ? "bg-blue-400"
                : "bg-white border border-blue-400"
            } transition`}
            onClick={() => handleDotClick(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
      {/* Prev/Next Buttons */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-blue-100 text-blue-900 rounded-full p-2 shadow z-20"
        onClick={handlePrev}
        aria-label="Previous Slide"
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-blue-100 text-blue-900 rounded-full p-2 shadow z-20"
        onClick={handleNext}
        aria-label="Next Slide"
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
}

export default Home;
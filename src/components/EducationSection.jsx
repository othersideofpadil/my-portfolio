const EducationSection = () => {
  const education = [
    {
      period: "2022 – Present",
      title: "Bachelor’s Degree Candidate in Informatics Engineering",
      institution: "Sekolah Tinggi Teknologi Terpadu Nurul Fikri",
      description:
        "Currently pursuing a bachelor’s degree with a focus on software engineering, web development, and modern application technologies.",
      side: "left",
    },
    {
      period: "2023",
      title: "BNSP Certified Junior Web Developer",
      institution: "Badan Nasional Sertifikasi Profesi (BNSP)",
      description:
        "Nationally recognized certification validating competencies in front-end and back-end web development.",
      side: "right",
    },
    {
      period: "2018 – 2021",
      title: "Senior High School",
      institution: "SMAN 14 Kabupaten Tangerang",
      description:
        "Built strong academic foundations with an emphasis on mathematics, science, and foreign languages.",
      side: "left",
    },
  ];


  return (
    <section id="education" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-linear-to-r from-black to-gray-600 bg-clip-text text-transparent">
          Education & Certifications
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-gray-800 via-gray-600 to-gray-800" />

          {education.map((item, index) => (
            <div key={index} className="mb-12 relative">
              {/* Timeline dot */}
              <div className="absolute left-6 md:left-1/2 w-5 h-5 bg-black rounded-full shadow-lg transform -translate-x-1/2" />

              {/* Content */}
              <div
                className={`ml-20 md:ml-0 ${
                  item.side === "left"
                    ? "md:w-1/2 md:pr-12"
                    : "md:ml-auto md:w-1/2 md:pl-12"
                }`}
              >
                <div className="bg-white border border-gray-300 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <span className="text-gray-700 text-sm font-semibold">
                    {item.period}
                  </span>
                  <h3 className="text-2xl font-bold mt-2 mb-2 text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 font-medium">
                    {item.institution}
                  </p>
                  <p className="text-gray-700 mt-3">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;

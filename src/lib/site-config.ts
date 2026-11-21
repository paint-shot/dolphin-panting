export const SITE_CONFIG = {
  brandName: "Dolphin Painter",
  brandTagline: "Quality Painting • Beautiful Spaces",
  location: "Dublin, Ireland",
  serviceArea: "Dublin City & County (Northside, Southside & Surrounding Areas)",
  contacts: {
    primaryPhone: {
      display: "089 960 9741",
      raw: "0899609741",
      e164: "353899609741",
      href: "tel:0899609741",
      whatsappHref:
        "https://wa.me/353899609741?text=Hi%20Dolphin%20Painter%2C%20I%27d%20like%20to%20request%20a%20free%20painting%20quote%20in%20Dublin.",
      label: "Primary Line",
    },
    secondaryPhone: {
      display: "085 220 0539",
      raw: "0852200539",
      e164: "353852200539",
      href: "tel:0852200539",
      whatsappHref:
        "https://wa.me/353852200539?text=Hi%20Dolphin%20Painter%2C%20I%27d%20like%20to%20request%20a%20free%20painting%20quote%20in%20Dublin.",
      label: "Additional Line",
    },
    email: {
      display: "ramzynamtala@gmail.com",
      href: "mailto:ramzynamtala@gmail.com",
      label: "Email Enquiries",
    },
  },
  video: {
    localSrc: "/videos/showcase.mp4",
    fallbackSrc:
      "https://res.cloudinary.com/dwjlonsj3/video/upload/v1779096397/yxb9gjgcclth3tplqjcm.mp4",
    title: "Air-Assisted Spray Painting in Action",
    category: "Interior Finishing & Renovation",
    description:
      "Watch how our precision compressor spray system lays down an ultra-even, factory-smooth coat across interiors and woodwork — eliminating brush marks and halving turnaround time.",
  },
} as const;

export interface ServiceItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  icon: "home" | "building" | "paintbrush" | "sparkles";
}

export const SERVICES: ServiceItem[] = [
  {
    number: "01",
    title: "Residential Interior",
    subtitle: "Georgian townhouses to modern apartments",
    description:
      "From single feature rooms to full home redecorations across Dublin. We prepare every surface meticulously for razor-sharp cut lines and lasting depth of colour.",
    highlights: [
      "Dust-free sanding & plaster skim repair",
      "Farrow & Ball, Colourtrend & Dulux Heritage",
      "Cornices, dado rails, stairs & woodwork",
    ],
    icon: "home",
  },
  {
    number: "02",
    title: "Exterior & Period Homes",
    subtitle: "Weatherproof finishes built for Irish skies",
    description:
      "Protect and elevate your property's kerb appeal with breathable masonry coatings, sash window restoration, and high-gloss heritage front doors.",
    highlights: [
      "Fungicidal wash & crack stabilization",
      "Breathable masonry & render systems",
      "Timber sash windows & front door glossing",
    ],
    icon: "paintbrush",
  },
  {
    number: "03",
    title: "Kitchen & Spray Finishing",
    subtitle: "Factory-smooth satin & matte transformations",
    description:
      "Revitalise tired kitchen cabinetry, fitted wardrobes, and interior joinery at a fraction of replacement cost using our fine-finish air-assisted spray system.",
    highlights: [
      "Degreasing, adhesion priming & fine sanding",
      "Zero brush marks — durable satin finish",
      "Full room masking for zero overspray",
    ],
    icon: "sparkles",
  },
  {
    number: "04",
    title: "Commercial & Offices",
    subtitle: "Minimal disruption, delivered on schedule",
    description:
      "Offices, retail units, cafés, and hospitality venues painted cleanly to tight handovers — with out-of-hours and weekend scheduling available.",
    highlights: [
      "Out-of-hours & weekend flexibility",
      "Low-VOC, rapid-dry commercial coatings",
      "Fully insured & Safe Pass compliant team",
    ],
    icon: "building",
  },
];

export type ProjectCategory = "All" | "Interior" | "Exterior" | "Spray Finish" | "Commercial";

export interface TransformationProject {
  id: string;
  title: string;
  location: string;
  category: Exclude<ProjectCategory, "All">;
  finish: string;
  duration: string;
  description: string;
  beforeImage: string;
  afterImage: string;
}

export const TRANSFORMATIONS: TransformationProject[] = [
  {
    id: "rathmines-living",
    title: "Georgian Living Room Restoration",
    location: "Rathmines, Dublin 6",
    category: "Interior",
    finish: "Heritage Sage Matte & Alabaster Satin Trim",
    duration: "3 Days",
    description:
      "Full plaster patching, dustless sanding, and two-coat heritage matte application paired with crisp satin crown moulding and fireplace woodwork.",
    beforeImage: "/images/before-living.jpg",
    afterImage: "/images/after-living.jpg",
  },
  {
    id: "drumcondra-exterior",
    title: "Period Townhouse Facade",
    location: "Drumcondra, Dublin 9",
    category: "Exterior",
    finish: "Alabaster Masonry & Georgian Emerald Door",
    duration: "4 Days",
    description:
      "Weathered render stripped, stabilized, and coated in weather-shield alabaster masonry paint with freshly restored sash frames and a deep emerald front door.",
    beforeImage: "/images/before-exterior.jpg",
    afterImage: "/images/after-exterior.jpg",
  },
  {
    id: "blackrock-kitchen",
    title: "Hand-Sprayed Kitchen Cabinetry",
    location: "Blackrock, Co. Dublin",
    category: "Spray Finish",
    finish: "Deep Slate-Navy Satin & Warm White Walls",
    duration: "3 Days",
    description:
      "Dated honey-oak cabinets degreased, adhesion-primed, and air-sprayed in durable 2K satin finish, complemented by crisp alabaster walls.",
    beforeImage: "/images/before-kitchen.jpg",
    afterImage: "/images/after-kitchen.jpg",
  },
  {
    id: "dublin2-office",
    title: "Executive Studio Fit-Out",
    location: "Dublin 2, City Centre",
    category: "Commercial",
    finish: "Architectural White & Charcoal-Forest Feature",
    duration: "2 Days (Weekend)",
    description:
      "Completed over a single weekend with low-odour commercial matte coatings, crisp feature wall contrast, and spotless Monday-morning handover.",
    beforeImage: "/images/before-office.jpg",
    afterImage: "/images/after-office.jpg",
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Free Site Visit & Quote",
    description:
      "We visit your Dublin property, assess every surface, discuss colour palettes, and deliver a transparent, itemized quote within 24 hours.",
  },
  {
    step: "02",
    title: "Meticulous Prep & Masking",
    description:
      "Floors, furniture, and fixtures are fully shielded. Cracks are filled, woodwork is caulked, and surfaces are dust-free sanded for lasting adhesion.",
  },
  {
    step: "03",
    title: "Master Application",
    description:
      "Using premium Irish and European trade paints alongside fine-finish brushes, rollers, and air-assisted sprayers for an immaculate coat.",
  },
  {
    step: "04",
    title: "Walkthrough & Spotless Handover",
    description:
      "We inspect every corner with you in natural light, leave your home spotless, and stand behind our workmanship.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "The attention to detail on our Victorian hall and living room was extraordinary. Zero dust left behind, razor-sharp lines on the cornices, and finished right on schedule.",
    author: "Siobhán M.",
    area: "Rathmines, Dublin 6",
    project: "Full Interior Redecoration",
  },
  {
    quote:
      "They transformed our tired oak kitchen cabinets with their spray finish — everyone thinks we bought a brand-new bespoke kitchen. Honest pricing and lovely lads to have in the house.",
    author: "Declan & Claire K.",
    area: "Blackrock, Co. Dublin",
    project: "Kitchen Cabinet Spraying",
  },
  {
    quote:
      "Painted our entire Dublin 2 office over one weekend so we didn't lose a single hour of trading. Immaculate finish and great communication from start to finish.",
    author: "Eoin B.",
    area: "Dublin 2",
    project: "Commercial Office Fit-Out",
  },
];

export const DUBLIN_AREAS = [
  "Rathmines",
  "Ranelagh",
  "Clontarf",
  "Drumcondra",
  "Blackrock",
  "Dún Laoghaire",
  "Ballsbridge",
  "Sandymount",
  "Malahide",
  "Howth",
  "Castleknock",
  "Dundrum",
  "Dublin City Centre",
];

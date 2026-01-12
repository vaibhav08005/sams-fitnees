import { Discipline, NavItem } from "./types";

export const NAV_ITEMS: NavItem[] = [
  { label: "OUR MISSION", href: "#manifesto" },
  { label: "PROGRAMS", href: "#disciplines" },
  { label: "STUDIO", href: "#locations" },
  { label: "START NOW", href: "#locations" },
];

export const DISCIPLINES: Discipline[] = [
  {
    id: "01",
    title: "STRENGTH",
    description: "Modern equipment for bodybuilding and muscle conditioning.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "ZUMBA",
    description: "High-energy dance workouts to burn calories and boost mood.",
    image: "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "HIIT",
    description: "High-Intensity Interval Training for maximum fat loss.",
    image: "/images/hiit.png"
  },
  {
    id: "04",
    title: "YOGA",
    description: "Restore balance, flexibility, and mental peace.",
    image: "/images/yoga.png"
  },
  {
    id: "05",
    title: "AEROBICS",
    description: "Rhythmic cardio sessions starting at just ₹500.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop"
  }
];
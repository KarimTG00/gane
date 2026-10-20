// Données des propriétés. À ajuster : quartier, prix (FCFA / mois) et caractéristiques sont des valeurs provisoires.
const WHATSAPP = "237656976989";

const PROPERTIES = [
  {
    id: "A",
    title: "Immeuble moderne à façade vitrée",
    type: "Immeuble",
    quartier: "Akwa",
    price: 1500000,
    surface: "Sur demande",
    chambres: "—",
    desc: "Bâtiment neuf à façade miroir, grand rez-de-chaussée lumineux, idéal pour bureaux, commerce ou showroom.",
    images: ["A1.webp", "A2.webp", "A3.webp", "A4.webp"]
  },
  {
    id: "B",
    title: "Appartement haut standing carrelage marbre",
    type: "Appartement",
    quartier: "Bonapriso",
    price: 450000,
    surface: "Spacieux",
    chambres: "3 chambres",
    desc: "Grand séjour lumineux, sol en marbre, cuisine équipée avec placards, finitions soignées.",
    images: ["B1.webp", "B2.webp", "B3.webp", "B5.webp"]
  },
  {
    id: "C",
    title: "Villa avec piscine et jardin",
    type: "Villa",
    quartier: "Bonanjo",
    price: 800000,
    surface: "Grand terrain",
    chambres: "4 chambres",
    desc: "Villa sur terrain arboré avec piscine, grande terrasse couverte, cadre calme et sécurisé.",
    images: ["C1.webp", "C2.webp", "C3.webp", "C4.webp", "C5.webp"]
  },
  {
    id: "D",
    title: "Appartement neuf lumineux",
    type: "Appartement",
    quartier: "Makepe",
    price: 350000,
    surface: "Spacieux",
    chambres: "2 chambres",
    desc: "Appartement neuf, plafonds décoratifs, cuisine ouverte sur le salon, grandes baies vitrées.",
    images: ["D1.webp", "D2.webp", "D3.webp", "D4.webp"]
  }
];

const QUARTIERS = ["Akwa", "Bonanjo", "Bonapriso", "Bonamoussadi", "Makepe", "Deido", "Logpom", "Kotto", "Bonabéri", "Yaoundé"];

const BUDGETS = [
  { v: "0-400000", l: "Moins de 400 000 FCFA", min: 0, max: 400000 },
  { v: "400000-700000", l: "400 000 – 700 000 FCFA", min: 400000, max: 700000 },
  { v: "700000-1000000", l: "700 000 – 1 000 000 FCFA", min: 700000, max: 1000000 },
  { v: "1000000-999999999", l: "Plus de 1 000 000 FCFA", min: 1000000, max: 999999999 }
];

'use client'
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase with fallbacks to prevent build-time crashes
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";
const supabase = createClient(supabaseUrl, supabaseKey);
const S = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --primary: #0891b2; --primary-dark: #0e7490; --primary-light: #ecfeff;
    --green: #059669; --green-light: #d1fae5; --red: #dc2626;
    --bg: #f0fafb; --card: #ffffff; --text: #0c1a2e; --muted: #64748b;
    --border: #cbd5e1; --shadow: 0 2px 12px rgba(8,145,178,0.08);
    --shadow-lg: 0 8px 28px rgba(8,145,178,0.14); --radius: 12px; --radius-sm: 8px;
  }
  body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); -webkit-font-smoothing: antialiased; }
  .app { min-height: 100vh; display: flex; flex-direction: column; }
  nav { background: #fff; border-bottom: 1px solid var(--border); padding: 0 28px; height: 62px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; box-shadow: 0 1px 6px rgba(8,145,178,0.07); }
  .logo { display: flex; align-items: center; gap: 10px; cursor: pointer; }
  .logo-fb { font-weight: 800; font-size: 17px; color: var(--primary); }
  .nav-links { display: flex; gap: 2px; }
  .nav-link { font-size: 14px; color: var(--muted); cursor: pointer; font-weight: 500; padding: 6px 13px; border-radius: 6px; transition: all 0.15s; }
  .nav-link:hover { color: var(--primary); background: var(--primary-light); }
  .nav-right { display: flex; gap: 8px; align-items: center; }
  .btn-ghost { font-size: 14px; font-weight: 500; color: var(--text); background: none; border: none; cursor: pointer; padding: 8px 14px; font-family: Inter,sans-serif; }
  .btn-signup { font-size: 14px; font-weight: 700; color: #fff; background: var(--primary); border: none; cursor: pointer; padding: 9px 20px; border-radius: var(--radius-sm); font-family: Inter,sans-serif; }
  .mobile-menu { position: fixed; top: 62px; left: 0; right: 0; background: #fff; border-bottom: 1px solid var(--border); padding: 12px 16px; z-index: 99; flex-direction: column; gap: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
  .mobile-link { font-size: 15px; color: var(--text); cursor: pointer; font-weight: 500; padding: 12px 16px; border-radius: 8px; }
  .mobile-link:hover { background: var(--primary-light); color: var(--primary); }
  @media (max-width: 768px) {
    .nav-links { display: none; }
    .nav-right .btn-ghost { display: none; }
    .page-wrap { padding: 16px; }
    .hero-section { padding: 48px 16px 72px; }
    .split-body { grid-template-columns: 1fr; }
    .detail-grid { grid-template-columns: 1fr; }
    .map-frame { height: 250px; }
  }
  .hero-section { background: linear-gradient(135deg, #0891b2 0%, #0e7490 60%, #065f75 100%); padding: 72px 24px 92px; position: relative; overflow: hidden; }
  .hero-section::after { content: ''; position: absolute; bottom: -2px; left: 0; right: 0; height: 48px; background: var(--bg); border-radius: 48px 48px 0 0; }
  .hero-inner { max-width: 680px; margin: 0 auto; text-align: center; position: relative; z-index: 1; }
  .hero-badge { display: inline-flex; align-items: center; gap: 7px; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); color: #a7f3d0; border-radius: 20px; padding: 5px 16px; font-size: 12px; font-weight: 600; margin-bottom: 22px; }
  .badge-dot { width: 6px; height: 6px; background: #34d399; border-radius: 50%; }
  .hero-section h1 { font-size: clamp(26px,5vw,44px); font-weight: 800; color: #fff; line-height: 1.15; margin-bottom: 14px; }
  .hero-section h1 span { color: #67e8f9; }
  .hero-sub { font-size: 16px; color: rgba(255,255,255,0.72); margin-bottom: 38px; line-height: 1.65; }
  .hero-search { background: #fff; border-radius: var(--radius); padding: 6px 6px 6px 18px; display: flex; gap: 8px; align-items: center; box-shadow: 0 8px 32px rgba(0,0,0,0.2); max-width: 520px; margin: 0 auto 14px; }
  .hero-search input { flex: 1; border: none; outline: none; font-size: 14px; font-family: Inter,sans-serif; color: var(--text); background: transparent; }
  .hero-search input::placeholder { color: #94a3b8; }
  .btn-green { background: #059669; color: #fff; border: none; border-radius: var(--radius-sm); padding: 10px 24px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: Inter,sans-serif; white-space: nowrap; }
  .hero-gps { display: inline-flex; align-items: center; gap: 6px; color: rgba(255,255,255,0.65); font-size: 13px; cursor: pointer; }
  .page-wrap { flex: 1; max-width: 960px; margin: 0 auto; width: 100%; padding: 28px 24px; }
  .back-btn { display: inline-flex; align-items: center; gap: 6px; background: var(--card); border: 1.5px solid var(--border); color: var(--muted); font-size: 13px; font-weight: 500; cursor: pointer; margin-bottom: 20px; font-family: Inter,sans-serif; padding: 7px 16px; border-radius: 20px; box-shadow: var(--shadow); }
  .page-title { font-size: 21px; font-weight: 800; margin-bottom: 3px; }
  .page-sub { font-size: 13px; color: var(--muted); margin-bottom: 20px; }
  .top-search { display: flex; background: var(--card); border: 1.5px solid var(--border); border-radius: var(--radius); overflow: hidden; margin-bottom: 20px; box-shadow: var(--shadow); }
  .top-search input { flex: 1; border: none; outline: none; font-size: 14px; padding: 12px 16px; font-family: Inter,sans-serif; }
  .top-search button { background: var(--primary); color: #fff; border: none; padding: 0 22px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: Inter,sans-serif; }
  .split-body { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .p-list { display: flex; flex-direction: column; gap: 10px; }
  .p-card { background: var(--card); border: 1.5px solid var(--border); border-radius: var(--radius); padding: 14px 16px; cursor: pointer; transition: all 0.15s; display: flex; gap: 12px; box-shadow: var(--shadow); }
  .p-card:hover { border-color: #67e8f9; box-shadow: var(--shadow-lg); }
  .p-avatar { width: 44px; height: 44px; border-radius: 10px; background: var(--primary-light); display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
  .p-body { flex: 1; min-width: 0; }
  .p-row1 { display: flex; align-items: center; gap: 6px; margin-bottom: 3px; flex-wrap: wrap; }
  .p-name { font-size: 13px; font-weight: 700; }
  .p-badge { font-size: 9px; font-weight: 700; color: var(--primary); background: var(--primary-light); padding: 2px 7px; border-radius: 10px; }
  .p-rating { font-size: 11px; color: var(--muted); margin-bottom: 5px; }
  .p-btns { display: flex; flex-direction: column; gap: 4px; flex-shrink: 0; }
  .pb { font-size: 10px; font-weight: 600; padding: 5px 10px; border-radius: 6px; border: none; cursor: pointer; font-family: Inter,sans-serif; white-space: nowrap; }
  .pb-view { background: #f1f5f9; color: var(--text); border: 1px solid var(--border); }
  .pb-wa { background: #d1fae5; color: #059669; }
  .pb-call { background: var(--primary-light); color: var(--primary); }
  .pagination { display: flex; align-items: center; gap: 4px; margin-top: 14px; }
  .pg-info { font-size: 11px; color: var(--muted); margin-right: auto; }
  .pg-btn { width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; border: 1.5px solid var(--border); background: var(--card); cursor: pointer; font-size: 12px; font-weight: 600; }
  .pg-btn.active { background: var(--primary); color: #fff; border-color: var(--primary); }
  .map-wrap { display: flex; flex-direction: column; }
  .map-search { display: flex; background: var(--card); border: 1.5px solid var(--border); border-radius: var(--radius); overflow: hidden; margin-bottom: 12px; box-shadow: var(--shadow); }
  .map-search span { display: flex; align-items: center; padding: 0 12px; color: var(--muted); }
  .map-search input { flex: 1; border: none; outline: none; font-size: 13px; padding: 11px 4px; font-family: Inter,sans-serif; }
  .map-frame { border-radius: var(--radius); overflow: hidden; border: 1.5px solid #a5f3fc; box-shadow: var(--shadow); height: 380px; display: block; width: 100%; }
  .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; align-items: start; }
  .d-card { background: var(--card); border: 1.5px solid var(--border); border-radius: var(--radius); padding: 18px; margin-bottom: 14px; box-shadow: var(--shadow); }
  .d-header { display: flex; gap: 14px; align-items: flex-start; margin-bottom: 18px; }
  .d-avatar { width: 56px; height: 56px; border-radius: 12px; background: var(--primary-light); display: flex; align-items: center; justify-content: center; font-size: 28px; flex-shrink: 0; }
  .d-name { font-size: 18px; font-weight: 800; margin-bottom: 3px; }
  .d-badge { font-size: 10px; font-weight: 700; color: var(--primary); background: var(--primary-light); padding: 2px 9px; border-radius: 10px; display: inline-block; margin-bottom: 5px; }
  .d-addr { font-size: 12px; color: var(--muted); }
  .sec-label { font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 12px; }
  .action-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 2px; }
  .act-btn { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 11px 8px; border-radius: var(--radius-sm); font-size: 12px; font-weight: 700; cursor: pointer; border: none; font-family: Inter,sans-serif; }
  .act-wa { background: #d1fae5; color: #059669; }
  .act-call { background: var(--primary-light); color: var(--primary); }
  .act-dir { background: #fef3c7; color: #92400e; }
  .act-save { background: #ede9fe; color: #6d28d9; }
  .info-row { display: flex; align-items: flex-start; gap: 10px; padding: 10px 0; border-bottom: 1px solid var(--border); }
  .info-row:last-child { border-bottom: none; padding-bottom: 0; }
  .i-ico { font-size: 15px; flex-shrink: 0; margin-top: 1px; }
  .i-lbl { font-size: 11px; color: var(--muted); margin-bottom: 1px; font-weight: 500; }
  .i-val { font-size: 13px; font-weight: 600; }
  .d-map-frame { border-radius: var(--radius); overflow: hidden; border: 1.5px solid #a5f3fc; height: 200px; margin-bottom: 14px; box-shadow: var(--shadow); display: block; width: 100%; }
  .filter-pills { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 18px; }
  .pill { font-size: 12px; font-weight: 600; padding: 6px 16px; border-radius: 20px; border: 1.5px solid var(--border); background: var(--card); cursor: pointer; color: var(--muted); font-family: Inter,sans-serif; }
  .pill.on { border-color: var(--primary); color: var(--primary); background: var(--primary-light); }
  .drug-list { display: flex; flex-direction: column; gap: 10px; }
  .drug-card { background: var(--card); border: 1.5px solid var(--border); border-radius: var(--radius); padding: 14px; display: flex; gap: 12px; align-items: center; box-shadow: var(--shadow); }
  .drug-img { width: 46px; height: 46px; border-radius: 10px; background: var(--bg); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
  .drug-body { flex: 1; }
  .drug-name { font-size: 13px; font-weight: 700; margin-bottom: 2px; }
  .drug-type { font-size: 11px; color: var(--muted); margin-bottom: 7px; }
  .drug-tags { display: flex; gap: 6px; }
  .dtag { font-size: 10px; font-weight: 700; padding: 2px 9px; border-radius: 10px; }
  .dtag-avail { background: #d1fae5; color: #059669; }
  .dtag-price { background: var(--primary-light); color: var(--primary); }
  .drug-wa-btn { font-size: 11px; font-weight: 700; padding: 9px 13px; border-radius: var(--radius-sm); border: none; cursor: pointer; background: #d1fae5; color: #059669; font-family: Inter,sans-serif; flex-shrink: 0; }
  .overlay { position: fixed; inset: 0; background: rgba(12,26,46,0.45); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(3px); }
  .modal { background: #fff; border-radius: 16px; padding: 24px; width: 100%; max-width: 360px; box-shadow: 0 20px 60px rgba(8,145,178,0.2); }
  .modal-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px; }
  .modal-title { font-size: 16px; font-weight: 800; }
  .modal-sub { font-size: 12px; color: var(--muted); margin-bottom: 16px; }
  .modal-x { background: var(--bg); border: none; width: 30px; height: 30px; border-radius: 50%; font-size: 14px; cursor: pointer; color: var(--muted); display: flex; align-items: center; justify-content: center; }
  .modal-drug { display: flex; gap: 12px; align-items: center; background: var(--bg); border-radius: var(--radius-sm); padding: 12px; margin-bottom: 16px; border: 1px solid var(--border); }
  .modal-drug-img { width: 40px; height: 40px; background: #e2e8f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
  .modal-drug-name { font-size: 13px; font-weight: 700; }
  .modal-drug-info { font-size: 11px; color: var(--muted); }
  .modal-lbl { font-size: 12px; font-weight: 600; color: var(--muted); margin-bottom: 6px; }
  .modal-ta { width: 100%; border: 1.5px solid var(--border); border-radius: var(--radius-sm); padding: 10px 12px; font-size: 13px; font-family: Inter,sans-serif; color: var(--text); resize: none; outline: none; margin-bottom: 16px; line-height: 1.6; }
  .modal-wa { width: 100%; background: #25D366; color: #fff; border: none; border-radius: var(--radius-sm); padding: 13px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: Inter,sans-serif; display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 10px; }
  .modal-cancel { width: 100%; background: none; border: none; font-size: 13px; color: var(--muted); cursor: pointer; font-family: Inter,sans-serif; padding: 4px; }
  @media (max-width: 768px) {
    /* Forces the side-by-side boxes to stack vertically */
    .detail-grid, .split-body {
      display: flex !important;
      flex-direction: column !important;
      gap: 12px !important;
    }
    /* Makes every box full width */
    .d-card, .p-card {
      width: 100% !important;
      margin: 0 !important;
    }
  }
`;

const FALLBACK: any[] = [
  { id:1, name:"Lifecare Pharmacy", address:"14 Broad Street, Lagos Island", phone:"08012345678", distance:"0.8km", open:true, hours:"8:00am-10:00pm", emoji:"💊", rating:"4.7", reviews:"128", whatsapp:"2348012345678" },
  { id:2, name:"MedPlus Pharmacy", address:"27 Allen Avenue, Ikeja", phone:"08023456789", distance:"1.2km", open:true, hours:"24 Hours", emoji:"🏥", rating:"4.5", reviews:"94", whatsapp:"2348023456789" },
  { id:3, name:"HealthPlus Pharmacy", address:"3 Admiralty Way, Lekki", phone:"08034567890", distance:"1.8km", open:false, hours:"8:00am-9:00pm", emoji:"⚕️", rating:"4.3", reviews:"61", whatsapp:"2348034567890" },
  { id:4, name:"Alpha Pharmacy", address:"5 Opebi Road, Ikeja", phone:"08045678901", distance:"2.1km", open:true, hours:"7:00am-11:00pm", emoji:"💉", rating:"4.6", reviews:"83", whatsapp:"2348045678901" },
  { id:5, name:"Sunrise Pharmacy", address:"10 Victoria Island Blvd", phone:"08056789012", distance:"2.4km", open:true, hours:"24 Hours", emoji:"🌅", rating:"4.8", reviews:"210", whatsapp:"2348056789012" },
];

const DRUGS_FALLBACK: any[] = [
  { id:1, name:"Paracetamol 500mg", type:"Tablet · Pain Relief", price:"₦350", emoji:"💊", cat:"Pain Relief" },
  { id:2, name:"Amoxicillin 250mg", type:"Capsule · Antibiotic", price:"₦1,200", emoji:"💉", cat:"Antibiotics" },
  { id:3, name:"Ibuprofen 400mg", type:"Tablet · Anti-inflammatory", price:"₦500", emoji:"🔵", cat:"Pain Relief" },
  { id:4, name:"Metformin 500mg", type:"Tablet · Diabetes", price:"₦800", emoji:"🟡", cat:"Diabetes" },
  { id:5, name:"Omeprazole 20mg", type:"Capsule · Antacid", price:"₦650", emoji:"🟠", cat:"Antacids" },
];

const CATS = ["All","Pain Relief","Antibiotics","Diabetes","Antacids","Vitamins","Malaria","Blood Pressure","Skin","Eye Care","Cough & Cold"];
const EMOJI_MAP: Record<string,string> = {"Lagos Island":"💊","Ikeja":"🏥","Lekki":"⚕️","Victoria Island":"🌅","Surulere":"💉","Yaba":"🏪","Shomolu":"🏬","Bariga":"🏥","Gbagada":"💊","Ikoyi":"⭐"};
const MAP_URL = "https://www.openstreetmap.org/export/embed.html?bbox=3.1191%2C6.3933%2C3.7773%2C6.7022&layer=mapnik&marker=6.5244%2C3.3792";

const getCategoryEmoji = (cat: string) => {
  const map: Record<string,string> = {
    'Pain Relief':'💊','Antibiotics':'💉','Malaria':'🦟','Diabetes':'🩸',
    'Blood Pressure':'❤️','Vitamins':'🌿','Antacids':'🫃','Allergy':'🤧',
    'Cough & Cold':'🤒','Antifungal':'🍄','Skin':'🧴','Eye Care':'👁️',
    'Mental Health':'🧠','Heart':'❤️','Women Health':'👩','Deworming':'🐛',
    'Digestive':'🫃','Respiratory':'🫁','Antiviral':'🦠','Wound Care':'🩹',
    'Thyroid':'🦋','Kidney':'🫘','Supplements':'💪','Sleep':'😴',
    'Men Health':'👨','Tuberculosis':'🫁','HIV':'🔴','Antiparasitic':'🐛',
    'Bone Health':'🦴','Steroids':'💉','Blood Thinners':'🩸','Rehydration':'💧',
    'Dental':'🦷','Ear Care':'👂','Liver':'🫀',
  };
  return map[cat] || '💊';
};

export default function Home() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [homeQ, setHomeQ] = useState("");
  const [resultsQ, setResultsQ] = useState("");
  const [drugsQ, setDrugsQ] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const [selected, setSelected] = useState<any>(null);
  const [modal, setModal] = useState<any>(null);
  const [msgText, setMsgText] = useState("");
  const [activePg, setActivePg] = useState(1);
  const [pharmacies, setPharmacies] = useState<any[]>(FALLBACK);
  const [medications, setMedications] = useState<any[]>(DRUGS_FALLBACK);
  const [form, setForm] = useState({name:'',address:'',phone:'',whatsapp:'',area:'',opening_hours:'',email:'',owner_name:''});
  const [formStatus, setFormStatus] = useState('');
  const [user, setUser] = useState<any>(null);
  const [authMode, setAuthMode] = useState<'login'|'signup'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // -------------------------------------------------------------------------
  // Load pharmacies + medications from Supabase on mount
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (!supabaseUrl || !supabaseKey) return;

    // Pharmacies
    supabase
      .from('pharmacies')
      .select('*')
      .order('rating', { ascending: false })
      .then(({ data, error }) => {
        if (error) { console.error('pharmacies fetch error:', error.message); return; }
        if (data && data.length > 0) {
          setPharmacies(data.map((p: any) => ({
            id: p.id,
            name: p.name,
            address: p.address,
            phone: p.phone,
            distance: "nearby",
            open: p.is_open,
            hours: p.opening_hours,
            emoji: EMOJI_MAP[p.area] || "💊",
            rating: p.rating?.toString() || "4.5",
            reviews: p.reviews?.toString() || "0",
            whatsapp: p.whatsapp,
          })));
        }
      });

    // Medications
    supabase
      .from('medications')
      .select('*')
      .order('name', { ascending: true })
      .then(({ data, error }) => {
        if (error) { console.error('medications fetch error:', error.message); return; }
        if (data && data.length > 0) {
          setMedications(data.map((m: any) => ({
            id: m.id,
            name: m.name,
            type: `${m.unit} · ${m.category}`,
            price: `₦${m.price_min}`,
            emoji: getCategoryEmoji(m.category),
            cat: m.category,
          })));
        }
      });

    // Restore session if user was previously logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) setUser(session.user);
    });

    // Listen for auth state changes (e.g. OAuth redirect back)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const nav = (p: string) => { setPage(p); setMenuOpen(false); };
  const goResults = (q: string) => { setResultsQ(q||""); nav("results"); };
  const goDrugs = () => { setDrugsQ(""); setActiveCat("All"); nav("drugs"); };
  const filteredP = pharmacies.filter(p => p.name.toLowerCase().includes(resultsQ.toLowerCase()) || p.address.toLowerCase().includes(resultsQ.toLowerCase()));
  const filteredD = medications.filter(d => (activeCat==="All"||d.cat===activeCat) && d.name.toLowerCase().includes(drugsQ.toLowerCase()));
  const openModal = (drug: any) => { setModal(drug); setMsgText(`Hello, I'd like to confirm the availability of ${drug.name}`); };

  // -------------------------------------------------------------------------
  // Pharmacy registration form
  // -------------------------------------------------------------------------
  const submitForm = async () => {
    if (!form.name||!form.address||!form.phone||!form.area||!form.email||!form.owner_name) {
      setFormStatus('error');
      return;
    }
    try {
      const { error } = await supabase
        .from('pharmacy_submissions')
        .insert([form]);
      if (error) throw error;
      setFormStatus('success');
    } catch (e: any) {
      console.error('form submit error:', e?.message);
      setFormStatus('error');
    }
  };

  // -------------------------------------------------------------------------
  // Auth — email/password via Supabase Auth SDK
  // -------------------------------------------------------------------------
  const handleAuth = async () => {
    setAuthError('');
    setAuthLoading(true);
    try {
      if (authMode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email: authEmail,
          password: authPassword,
          options: { data: { full_name: authName } },
        });
        if (error) throw error;
        setAuthSuccess('Account created! Check your email to confirm your account.');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: authEmail,
          password: authPassword,
        });
        if (error) throw error;
        setUser(data.user);
        nav('home');
      }
    } catch (e: any) {
      setAuthError(e?.message || 'Something went wrong. Try again.');
    }
    setAuthLoading(false);
  };

  // -------------------------------------------------------------------------
  // OAuth — Google
  // -------------------------------------------------------------------------
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
  };

  // -------------------------------------------------------------------------
  // Sign out
  // -------------------------------------------------------------------------
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <>
      <style>{S}</style>
      <div className="app">

        <nav>
          <div className="logo" onClick={() => nav("home")}>
            <div className="logo-fb">
              <img src="/logo.jpg" className="w-5" alt="logo"/>
              HealthBridge</div>
          </div>
          <div className="nav-links">
            <span className="nav-link" onClick={() => nav("home")}>Home</span>
           <span className="learn-more" onClick={() => setPage("about")}>Learn more →</span> 
            <span className="nav-link" onClick={goDrugs}>Medications</span>
            <span className="nav-link" onClick={() => nav("about")}>About us</span>
            <span className="nav-link" onClick={() => nav("register")}>List Pharmacy</span>
          </div>
          <div className="nav-right">
            {user ? (
              <>
                <span style={{fontSize:13,color:'var(--muted)',fontWeight:500}}>👤 {user.email?.split('@')[0]}</span>
                <button className="btn-ghost" onClick={handleSignOut}>Log out</button>
              </>
            ) : (
              <>
                <button className="btn-ghost" onClick={() => { setAuthMode('login'); nav('auth'); }}>Log in</button>
                <button className="btn-signup" onClick={() => { setAuthMode('signup'); nav('auth'); }}>Sign up</button>
              </>
            )}
            <button style={{background:'none',border:'none',cursor:'pointer',fontSize:22,padding:'4px 8px',color:'var(--primary)'}} onClick={() => setMenuOpen(!menuOpen)}>☰</button>
          </div>
        </nav>

        {menuOpen && (
          <div className="mobile-menu" style={{display:'flex'}}>
            <div className="mobile-link" onClick={() => nav("home")}>🏠 Home</div>
            <div className="mobile-link" onClick={() => goResults("")}>🏥 Find Pharmacies</div>
            <div className="mobile-link" onClick={goDrugs}>💊 Find Medications</div>
            <div className="mobile-link" onClick={() => nav("about")}>ℹ️ About us</div>
            <div className="mobile-link" onClick={() => nav("register")}>🏪 List Your Pharmacy</div>
            {!user && <div className="mobile-link" onClick={() => { setAuthMode('signup'); nav('auth'); }}>🔐 Sign up / Log in</div>}
            {user && <div className="mobile-link" onClick={handleSignOut}>🚪 Log out</div>}
            <div className="mobile-link" onClick={() => setMenuOpen(false)}>✕ Close</div>
          </div>
        )}

        {page==="home" && (
          <>
            <div className="hero-section">
              <div className="hero-inner">
                <div className="hero-badge"><div className="badge-dot"/>Nigeria's Healthcare Navigator</div>
                <h1>Find your <span>medication</span><br/>near you in minutes</h1>
                <p className="hero-sub">Search verified pharmacies near you. Get directions, call ahead, and find your medications fast.</p>
                <div className="hero-search">
                  <span style={{fontSize:16,marginRight:4}}>🔍</span>
                  <input placeholder="Search pharmacy or medication..." value={homeQ} onChange={e=>setHomeQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&goResults(homeQ)}/>
                  <button className="btn-green" onClick={()=>goResults(homeQ)}>Search</button>
                </div>
                <div className="hero-gps" onClick={()=>goResults("")}>📍 Use my current location</div>
              </div>
            </div>

            <div style={{maxWidth:960,margin:'0 auto',padding:'32px 24px',width:'100%'}}>
              <div style={{background:'var(--card)',borderRadius:16,padding:'28px 24px',border:'1.5px solid var(--border)',boxShadow:'var(--shadow)',textAlign:'center',marginBottom:40}}>
                <div style={{fontSize:20,fontWeight:800,marginBottom:6}}>Ready to find your medication?</div>
                <div style={{fontSize:14,color:'var(--muted)',marginBottom:20}}>Join thousands of Nigerians using HealthBridge to access healthcare faster.</div>
                <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
                  <button onClick={()=>goResults("")} style={{background:'var(--primary)',color:'#fff',border:'none',borderRadius:8,padding:'12px 28px',fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>Find a Pharmacy</button>
                  <button onClick={goDrugs} style={{background:'var(--green-light)',color:'var(--green)',border:'none',borderRadius:8,padding:'12px 28px',fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>Find Medications</button>
                </div>
              </div>

              <div style={{marginBottom:24}}>
                <div style={{fontSize:13,fontWeight:700,color:'var(--primary)',textTransform:'uppercase',letterSpacing:1,marginBottom:8}}>What we do</div>
                <div style={{fontSize:22,fontWeight:800,marginBottom:4}}>HealthBridge has got you covered</div>
                <div style={{fontSize:14,color:'var(--muted)',marginBottom:24}}>Everything you need to access healthcare — in one place</div>
                <div style={{display:'flex',gap:16,overflowX:'auto',paddingBottom:16,scrollSnapType:'x mandatory',marginBottom:40} as any}>
                  {[
                    {icon:'🏥',title:'Find a Pharmacy',desc:'Search and locate verified pharmacies near you.',color:'#ecfeff',border:'#a5f3fc',action:()=>goResults("")},
                    {icon:'💊',title:'Find Medications',desc:'Search for specific drugs at pharmacies near you.',color:'#f0fdf4',border:'#86efac',action:goDrugs},
                    {icon:'🗺️',title:'Get Directions',desc:'Get directions to any pharmacy from your location.',color:'#fefce8',border:'#fde047',action:()=>goResults("")},
                    {icon:'📞',title:'Call Directly',desc:'One tap to call any pharmacy. No stress.',color:'#eff6ff',border:'#93c5fd',action:()=>goResults("")},
                    {icon:'💬',title:'Chat on WhatsApp',desc:'Message any pharmacy on WhatsApp instantly.',color:'#f0fdf4',border:'#86efac',action:()=>goResults("")},
                    {icon:'🏪',title:'List Your Pharmacy',desc:'Own a pharmacy? Join HealthBridge free.',color:'#fdf4ff',border:'#d8b4fe',action:()=>nav("register")},
                  ].map(s=>(
                    <div key={s.title} onClick={s.action} style={{minWidth:240,scrollSnapAlign:'start',background:s.color,borderRadius:16,padding:'24px 20px',border:`1.5px solid ${s.border}`,cursor:'pointer',flexShrink:0,boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
                      <div style={{fontSize:34,marginBottom:12}}>{s.icon}</div>
                      <div style={{fontSize:15,fontWeight:800,marginBottom:6,color:'var(--text)'}}>{s.title}</div>
                      <div style={{fontSize:13,color:'var(--muted)',lineHeight:1.6}}>{s.desc}</div>
                      <div style={{marginTop:14,fontSize:13,fontWeight:700,color:'var(--primary)'}}>Learn more →</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{background:'linear-gradient(135deg,#0891b2,#0e7490)',borderRadius:16,padding:'36px 28px',position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',top:-40,right:-40,width:200,height:200,background:'rgba(255,255,255,0.05)',borderRadius:'50%'}}/>
                <div style={{fontSize:13,fontWeight:700,color:'#a7f3d0',textTransform:'uppercase',letterSpacing:1,marginBottom:10}}>For pharmacy owners</div>
                <div style={{fontSize:22,fontWeight:800,color:'#fff',marginBottom:10,lineHeight:1.3}}>Do you own a pharmacy or licensed drug store?</div>
                <div style={{fontSize:14,color:'rgba(255,255,255,0.75)',marginBottom:24,lineHeight:1.6}}>HealthBridge has got you covered. List your pharmacy for free, reach thousands of patients near you, and grow your business.</div>
                <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
                  <button onClick={()=>nav("register")} style={{background:'#fff',color:'var(--primary)',border:'none',borderRadius:8,padding:'12px 24px',fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>Get Listed Free →</button>
                  <button onClick={()=>nav("about")} style={{background:'rgba(255,255,255,0.15)',color:'#fff',border:'1.5px solid rgba(255,255,255,0.3)',borderRadius:8,padding:'12px 24px',fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>Learn More</button>
                </div>
              </div>
            </div>
          </>
        )}

        {page==="results" && (
          <div className="page-wrap">
            <button className="back-btn" onClick={()=>nav("home")}>← Back to home</button>
            <div className="page-title">Find a Pharmacy</div>
            <div className="page-sub">{filteredP.length} pharmacies found near you</div>
            <div className="top-search">
              <input placeholder="🔍  Search by name or area..." value={resultsQ} onChange={e=>setResultsQ(e.target.value)}/>
              <button>Search</button>
            </div>
            <div className="split-body">
              <div>
                <div className="p-list">
                  {filteredP.map(p=>(
                    <div key={p.id} className="p-card" onClick={()=>{setSelected(p);nav("detail");}}>
                      <div className="p-avatar">{p.emoji}</div>
                      <div className="p-body">
                        <div className="p-row1"><span className="p-name">{p.name}</span><span className="p-badge">VERIFIED</span></div>
                        <div className="p-rating"><b>★</b> {p.rating} ({p.reviews} reviews) · 📍 {p.distance}</div>
                        <div style={{fontSize:11,color:"#64748b"}}>🕐 {p.hours} · <span style={{color:p.open?"#059669":"#dc2626",fontWeight:600}}>{p.open?"● Open":"● Closed"}</span></div>
                      </div>
                      <div className="p-btns">
                        <button className="pb pb-view">View</button>
                        <button className="pb pb-wa" onClick={e=>{e.stopPropagation();window.open(`https://wa.me/${p.whatsapp}`,'_blank');}}>💬 WhatsApp</button>
                        <button className="pb pb-call" onClick={e=>{e.stopPropagation();window.location.href=`tel:${p.phone}`;}}>📞 Call</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pagination">
                  <span className="pg-info">Showing 1–{filteredP.length} pharmacies</span>
                  <button className="pg-btn">‹</button>
                  {[1,2,3,4,5].map(n=><button key={n} className={`pg-btn${activePg===n?" active":""}`} onClick={()=>setActivePg(n)}>{n}</button>)}
                  <button className="pg-btn">›</button>
                </div>
              </div>
              <div className="map-wrap">
                <div className="map-search"><span>🔍</span><input placeholder="Search on map..."/></div>
                <iframe className="map-frame" src={MAP_URL} loading="lazy"></iframe>
              </div>
            </div>
          </div>
        )}

        {page==="detail" && selected && (
          <div className="page-wrap">
            <button className="back-btn" onClick={()=>nav("results")}>← Back to results</button>
            <div className="detail-grid">
              <div>
                <div className="d-card">
                  <div className="d-header">
                    <div className="d-avatar">{selected.emoji}</div>
                    <div>
                      <div className="d-name">{selected.name}</div>
                      <div className="d-badge">VERIFIED</div>
                      <div className="d-addr">📍 {selected.address}</div>
                    </div>
                  </div>
                  <div className="sec-label">Quick Actions</div>
                  <div className="action-grid">
                    <button className="act-btn act-wa" onClick={()=>window.open(`https://wa.me/${selected.whatsapp}`,'_blank')}>💬 WhatsApp</button>
                    <button className="act-btn act-call" onClick={()=>window.location.href=`tel:${selected.phone}`}>📞 Call</button>
                    <button className="act-btn act-dir">🗺️ Directions</button>
                    <button className="act-btn act-save">🔖 Save</button>
                  </div>
                </div>
                <div className="d-card">
                  <div className="sec-label">Pharmacy Info</div>
                  {[
                    {ico:"📞",lbl:"Phone",val:selected.phone},
                    {ico:"📍",lbl:"Address",val:selected.address},
                    {ico:"🕐",lbl:"Opening Hours",val:selected.hours},
                    {ico:"⭐",lbl:"Rating",val:`${selected.rating} (${selected.reviews} reviews)`},
                    {ico:"📏",lbl:"Distance",val:`${selected.distance} away`},
                  ].map(r=>(
                    <div key={r.lbl} className="info-row">
                      <span className="i-ico">{r.ico}</span>
                      <div><div className="i-lbl">{r.lbl}</div><div className="i-val">{r.val}</div></div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <iframe className="d-map-frame" src={MAP_URL} loading="lazy"></iframe>
                <div className="d-card">
                  <div className="sec-label">About this pharmacy</div>
                  <p style={{fontSize:13,color:"#64748b",lineHeight:1.7,marginBottom:16}}>Verified and licensed pharmacy serving residents with genuine medications and professional healthcare services.</p>
                  <button className="act-btn act-wa" style={{width:"100%",marginBottom:8}} onClick={()=>window.open(`https://wa.me/${selected.whatsapp}`,'_blank')}>💬 Chat on WhatsApp</button>
                  <button className="act-btn act-call" style={{width:"100%"}} onClick={()=>window.location.href=`tel:${selected.phone}`}>📞 Call Pharmacy</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {page==="drugs" && (
          <div className="page-wrap">
            <button className="back-btn" onClick={()=>nav("home")}>← Back to home</button>
            <div className="page-title">Find your medication</div>
            <div className="page-sub">Search for drugs available at pharmacies near you</div>
            <div className="top-search">
              <input placeholder="🔍  Search medications..." value={drugsQ} onChange={e=>setDrugsQ(e.target.value)}/>
              <button>Search</button>
            </div>
            <div className="filter-pills">
              {CATS.map(c=><button key={c} className={`pill${activeCat===c?" on":""}`} onClick={()=>setActiveCat(c)}>{c}</button>)}
            </div>
            <div className="split-body">
              <div className="drug-list">
                {filteredD.map(d=>(
                  <div key={d.id} className="drug-card">
                    <div className="drug-img">{d.emoji}</div>
                    <div className="drug-body">
                      <div className="drug-name">{d.name}</div>
                      <div className="drug-type">{d.type}</div>
                      <div className="drug-tags">
                        <span className="dtag dtag-avail">● Available</span>
                        <span className="dtag dtag-price">{d.price}</span>
                      </div>
                    </div>
                    <button className="drug-wa-btn" onClick={()=>openModal(d)}>💬 WhatsApp</button>
                  </div>
                ))}
              </div>
              <div className="map-wrap">
                <div className="map-search"><span>🔍</span><input placeholder="Search on map..."/></div>
                <iframe className="map-frame" src={MAP_URL} loading="lazy"></iframe>
              </div>
            </div>
          </div>
        )}

        {page==="about" && (
          <div>
            <div style={{background:'linear-gradient(135deg,#0891b2,#0e7490)',padding:'64px 24px 80px',position:'relative',overflow:'hidden'}}>
              <div style={{maxWidth:680,margin:'0 auto',textAlign:'center',position:'relative',zIndex:1}}>
                <div style={{display:'inline-flex',alignItems:'center',gap:7,background:'rgba(255,255,255,0.12)',border:'1px solid rgba(255,255,255,0.2)',color:'#a7f3d0',borderRadius:20,padding:'5px 16px',fontSize:12,fontWeight:600,marginBottom:22}}>🇳🇬 Made in Nigeria</div>
                <h1 style={{fontSize:'clamp(26px,5vw,42px)',fontWeight:800,color:'#fff',lineHeight:1.15,marginBottom:14}}>Making healthcare <span style={{color:'#67e8f9'}}>accessible</span> for every Nigerian</h1>
                <p style={{fontSize:16,color:'rgba(255,255,255,0.75)',lineHeight:1.65}}>HealthBridge connects patients with verified pharmacies across Nigeria — fast, simple, and free.</p>
              </div>
            </div>
            <div style={{maxWidth:860,margin:'0 auto',padding:'40px 24px'}}>
              <button className="back-btn" onClick={()=>nav("home")}>← Back to home</button>
              <div style={{fontSize:22,fontWeight:800,marginBottom:16}}>About HealthBridge</div>
              <div style={{background:'var(--card)',borderRadius:12,padding:'28px 24px',border:'1.5px solid var(--border)',boxShadow:'var(--shadow)',marginBottom:32}}>
                <p style={{fontSize:14,color:'var(--muted)',lineHeight:1.8,marginBottom:14}}>HealthBridge is a Nigerian health-tech startup on a mission to make healthcare accessible for every Nigerian. We connect patients with verified, licensed pharmacies near them — making it easy to find medications, get directions, and contact pharmacies directly.</p>
                <p style={{fontSize:14,color:'var(--muted)',lineHeight:1.8,marginBottom:14}}>We were built from a simple frustration — spending hours searching for a pharmacy that had the right medication. HealthBridge is the solution we wished existed.</p>
                <p style={{fontSize:14,color:'var(--muted)',lineHeight:1.8}}>We are starting in Lagos and expanding across Nigeria. Every pharmacy on HealthBridge is verified and licensed, so you can trust what you find.</p>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:16,marginBottom:32}}>
                {[
                  {icon:'🎯',title:'Our Mission',desc:'To make it easy for every Nigerian to find genuine medications and trusted pharmacies — in seconds.'},
                  {icon:'👁️',title:'Our Vision',desc:'A Nigeria where no one struggles to find healthcare. Where every pharmacy is a tap away.'},
                  {icon:'🤝',title:'Our Values',desc:'Trust, transparency and accessibility. We only list verified pharmacies and never charge users.'},
                  {icon:'🚀',title:'Our Goal',desc:'To be the most trusted pharmacy finder in Nigeria, starting from Lagos and expanding nationwide.'},
                ].map(s=>(
                  <div key={s.title} style={{background:'#fff',borderRadius:12,padding:'22px 18px',border:'1.5px solid #cbd5e1',boxShadow:'0 2px 12px rgba(8,145,178,0.08)'}}>
                    <div style={{fontSize:30,marginBottom:10}}>{s.icon}</div>
                    <div style={{fontSize:14,fontWeight:700,marginBottom:6}}>{s.title}</div>
                    <div style={{fontSize:13,color:'#64748b',lineHeight:1.6}}>{s.desc}</div>
                  </div>
                ))}
              </div>
              <div style={{background:'linear-gradient(135deg,#0891b2,#0e7490)',borderRadius:12,padding:'32px 24px',textAlign:'center'}}>
                <div style={{fontSize:18,fontWeight:800,color:'#fff',marginBottom:8}}>Are you a pharmacy owner?</div>
                <div style={{fontSize:14,color:'rgba(255,255,255,0.75)',marginBottom:20}}>List your pharmacy on HealthBridge for free and reach thousands of patients near you.</div>
                <button onClick={()=>nav("register")} style={{background:'#fff',color:'#0891b2',border:'none',borderRadius:8,padding:'12px 28px',fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>Get Listed Free →</button>
              </div>
            </div>
          </div>
        )}

        {page==="register" && (
          <div className="page-wrap">
            <button className="back-btn" onClick={()=>nav("about")}>← Back</button>
            <div className="page-title">List Your Pharmacy Free</div>
            <div className="page-sub">Join verified pharmacies on HealthBridge and reach thousands of patients near you</div>
            <div style={{background:'var(--card)',borderRadius:'var(--radius)',padding:24,border:'1.5px solid var(--border)',boxShadow:'var(--shadow)'}}>
              {formStatus==='success' ? (
                <div style={{textAlign:'center',padding:'40px 20px'}}>
                  <div style={{fontSize:48,marginBottom:16}}>🎉</div>
                  <div style={{fontSize:18,fontWeight:800,marginBottom:8}}>Application Submitted!</div>
                  <div style={{fontSize:14,color:'var(--muted)',marginBottom:24}}>We will review your application and get back to you within 24 hours.</div>
                  <button onClick={()=>{nav("home");setFormStatus('');}} style={{background:'var(--primary)',color:'#fff',border:'none',borderRadius:'var(--radius-sm)',padding:'12px 28px',fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>Back to Home</button>
                </div>
              ) : (
                <div style={{display:'flex',flexDirection:'column',gap:16}}>
                  {[
                    {label:'Pharmacy Name *',key:'name',placeholder:'e.g. Lifecare Pharmacy'},
                    {label:'Owner Name *',key:'owner_name',placeholder:'Your full name'},
                    {label:'Email Address *',key:'email',placeholder:'your@email.com'},
                    {label:'Phone Number *',key:'phone',placeholder:'08012345678'},
                    {label:'WhatsApp Number',key:'whatsapp',placeholder:'2348012345678'},
                    {label:'Full Address *',key:'address',placeholder:'e.g. 14 Broad Street, Lagos Island'},
                    {label:'Opening Hours *',key:'opening_hours',placeholder:'e.g. 8:00am - 10:00pm or 24 Hours'},
                  ].map(f=>(
                    <div key={f.key}>
                      <div style={{fontSize:13,fontWeight:600,marginBottom:6}}>{f.label}</div>
                      <input value={form[f.key as keyof typeof form]} onChange={e=>setForm({...form,[f.key]:e.target.value})} placeholder={f.placeholder} style={{width:'100%',border:'1.5px solid var(--border)',borderRadius:'var(--radius-sm)',padding:'11px 14px',fontSize:14,fontFamily:'Inter,sans-serif',outline:'none',color:'var(--text)'}}/>
                    </div>
                  ))}
                  <div>
                    <div style={{fontSize:13,fontWeight:600,marginBottom:6}}>Area *</div>
                    <select value={form.area} onChange={e=>setForm({...form,area:e.target.value})} style={{width:'100%',border:'1.5px solid var(--border)',borderRadius:'var(--radius-sm)',padding:'11px 14px',fontSize:14,fontFamily:'Inter,sans-serif',outline:'none',color:'var(--text)',background:'white'}}>
                      <option value="">Select area</option>
                      {['Lagos Island','Ikeja','Lekki','Victoria Island','Surulere','Yaba','Shomolu','Bariga','Gbagada','Ikoyi','Apapa','Ajah','Festac','Isolo','Mushin','Oshodi','Agege','Alimosho','Ikorodu','Epe'].map(a=>(
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                  </div>
                  {formStatus==='error' && <div style={{background:'#fee2e2',color:'#dc2626',padding:'12px 16px',borderRadius:'var(--radius-sm)',fontSize:13,fontWeight:500}}>Please fill in all required fields</div>}
                  <button onClick={submitForm} style={{background:'var(--primary)',color:'#fff',border:'none',borderRadius:'var(--radius-sm)',padding:'14px',fontSize:15,fontWeight:700,cursor:'pointer',fontFamily:'Inter,sans-serif',width:'100%',marginTop:8}}>Submit Application →</button>
                  <div style={{fontSize:12,color:'var(--muted)',textAlign:'center'}}>By submitting you agree to our terms. Listing is completely free.</div>
                </div>
              )}
            </div>
          </div>
        )}

        {page==="auth" && (
          <div className="page-wrap" style={{maxWidth:440}}>
            <button className="back-btn" onClick={()=>nav("home")}>← Back</button>
            <div style={{background:'var(--card)',borderRadius:'var(--radius)',padding:28,border:'1.5px solid var(--border)',boxShadow:'var(--shadow)'}}>
              <div style={{textAlign:'center',marginBottom:24}}>
                <div style={{fontSize:32,marginBottom:8}}>🏥</div>
                <div style={{fontSize:20,fontWeight:800,marginBottom:4}}>{authMode==='login'?'Welcome back':'Create account'}</div>
                <div style={{fontSize:13,color:'var(--muted)'}}>{authMode==='login'?'Log in to your HealthBridge account':'Join HealthBridge for free'}</div>
              </div>

              <button onClick={handleGoogleLogin} style={{width:'100%',background:'#fff',color:'#374151',border:'1.5px solid var(--border)',borderRadius:'var(--radius-sm)',padding:'12px',fontSize:14,fontWeight:600,cursor:'pointer',fontFamily:'Inter,sans-serif',display:'flex',alignItems:'center',justifyContent:'center',gap:10,boxShadow:'var(--shadow)',marginBottom:16}}>
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
                <div style={{flex:1,height:1,background:'var(--border)'}}/>
                <div style={{fontSize:12,color:'var(--muted)',fontWeight:500}}>or</div>
                <div style={{flex:1,height:1,background:'var(--border)'}}/>
              </div>

              {authSuccess ? (
                <div style={{background:'#d1fae5',color:'#059669',padding:'14px 16px',borderRadius:8,fontSize:13,fontWeight:600,textAlign:'center'}}>{authSuccess}</div>
              ) : (
                <div style={{display:'flex',flexDirection:'column',gap:14}}>
                  {authMode==='signup' && (
                    <div>
                      <div style={{fontSize:13,fontWeight:600,marginBottom:6}}>Full Name</div>
                      <input value={authName} onChange={e=>setAuthName(e.target.value)} placeholder="Your full name" style={{width:'100%',border:'1.5px solid var(--border)',borderRadius:'var(--radius-sm)',padding:'11px 14px',fontSize:14,fontFamily:'Inter,sans-serif',outline:'none'}}/>
                    </div>
                  )}
                  <div>
                    <div style={{fontSize:13,fontWeight:600,marginBottom:6}}>Email Address</div>
                    <input type="email" value={authEmail} onChange={e=>setAuthEmail(e.target.value)} placeholder="your@email.com" style={{width:'100%',border:'1.5px solid var(--border)',borderRadius:'var(--radius-sm)',padding:'11px 14px',fontSize:14,fontFamily:'Inter,sans-serif',outline:'none'}}/>
                  </div>
                  <div>
                    <div style={{fontSize:13,fontWeight:600,marginBottom:6}}>Password</div>
                    <input type="password" value={authPassword} onChange={e=>setAuthPassword(e.target.value)} placeholder="Min 6 characters" style={{width:'100%',border:'1.5px solid var(--border)',borderRadius:'var(--radius-sm)',padding:'11px 14px',fontSize:14,fontFamily:'Inter,sans-serif',outline:'none'}}/>
                  </div>
                  {authError && <div style={{background:'#fee2e2',color:'#dc2626',padding:'10px 14px',borderRadius:8,fontSize:13}}>{authError}</div>}
                  <button onClick={handleAuth} style={{background:'var(--primary)',color:'#fff',border:'none',borderRadius:'var(--radius-sm)',padding:'13px',fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:'Inter,sans-serif',width:'100%',opacity:authLoading?0.7:1}}>
                    {authLoading?'Please wait...':(authMode==='login'?'Log in':'Create account')}
                  </button>
                  <div style={{textAlign:'center',fontSize:13,color:'var(--muted)'}}>
                    {authMode==='login'?"Don't have an account? ":"Already have an account? "}
                    <span style={{color:'var(--primary)',fontWeight:700,cursor:'pointer'}} onClick={()=>{setAuthMode(authMode==='login'?'signup':'login');setAuthError('');}}>
                      {authMode==='login'?'Sign up':'Log in'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {modal && (
          <div className="overlay" onClick={()=>setModal(null)}>
            <div className="modal" onClick={e=>e.stopPropagation()}>
              <div className="modal-head">
                <div><div className="modal-title">Chat with pharmacy</div></div>
                <button className="modal-x" onClick={()=>setModal(null)}>✕</button>
              </div>
              <div className="modal-sub">You are about to contact this pharmacy on WhatsApp</div>
              <div className="modal-drug">
                <div className="modal-drug-img">{modal.emoji}</div>
                <div>
                  <div className="modal-drug-name">{modal.name}</div>
                  <div className="modal-drug-info">{modal.type} · Qty: 1</div>
                </div>
              </div>
              <div className="modal-lbl">Your message (editable)</div>
              <textarea className="modal-ta" rows={3} value={msgText} onChange={e=>setMsgText(e.target.value)}/>
              <button className="modal-wa" onClick={()=>window.open(`https://wa.me/2348012345678?text=${encodeURIComponent(msgText)}`,'_blank')}>💬 Continue to Whatsapp</button>
              <button className="modal-cancel" onClick={()=>setModal(null)}>Cancel</button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

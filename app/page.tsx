'use client'
import { useState, useEffect } from "react";

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
  .hero-stats { display: flex; margin-top: 52px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); border-radius: var(--radius); overflow: hidden; }
  .hero-stat { flex: 1; text-align: center; padding: 18px 10px; border-right: 1px solid rgba(255,255,255,0.12); }
  .hero-stat:last-child { border-right: none; }
  .stat-n { font-size: 24px; font-weight: 800; color: #fff; }
  .stat-l { font-size: 11px; color: rgba(255,255,255,0.6); margin-top: 3px; }
  .services-section { max-width: 960px; margin: 0 auto; padding: 44px 24px; width: 100%; }
  .section-title { font-size: 20px; font-weight: 800; margin-bottom: 4px; }
  .section-sub { font-size: 14px; color: var(--muted); margin-bottom: 22px; }
  .service-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(180px,1fr)); gap: 14px; }
  .service-card { background: var(--card); border-radius: var(--radius); padding: 24px 18px; border: 1.5px solid var(--border); box-shadow: var(--shadow); cursor: pointer; transition: all 0.2s; text-align: center; }
  .service-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); border-color: #67e8f9; }
  .svc-icon { font-size: 32px; margin-bottom: 12px; }
  .svc-name { font-size: 14px; font-weight: 700; margin-bottom: 5px; }
  .svc-desc { font-size: 12px; color: var(--muted); line-height: 1.5; }
  .page-wrap { flex: 1; max-width: 960px; margin: 0 auto; width: 100%; padding: 28px 24px; }
  .back-btn { display: inline-flex; align-items: center; gap: 6px; background: var(--card); border: 1.5px solid var(--border); color: var(--muted); font-size: 13px; font-weight: 500; cursor: pointer; margin-bottom: 20px; font-family: Inter,sans-serif; padding: 7px 16px; border-radius: 20px; box-shadow: var(--shadow); }
  .page-title { font-size: 21px; font-weight: 800; margin-bottom: 3px; }
  .page-sub { font-size: 13px; color: var(--muted); margin-bottom: 20px; }
  .top-search { display: flex; background: var(--card); border: 1.5px solid var(--border); border-radius: var(--radius); overflow: hidden; margin-bottom: 20px; box-shadow: var(--shadow); }
  .top-search input { flex: 1; border: none; outline: none; font-size: 14px; padding: 12px 16px; font-family: Inter,sans-serif; }
  .top-search button { background: var(--primary); color: #fff; border: none; padding: 0 22px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: Inter,sans-serif; }-columns: 1fr 1fr; gap: 18px; }
  .split-body { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  @media (max-width: 768px) {
    .split-body { grid-template-columns: 1fr; }
    .detail-grid { grid-template-columns: 1fr; }
    nav { padding: 0 16px; }
    .nav-links { display: none; }
    .nav-right .btn-ghost { display: none; }
    .page-wrap { padding: 16px; }
    .hero-section { padding: 48px 16px 72px; }
    .hero-stats { flex-wrap: wrap; }
    .hero-stat { min-width: 45%; border-bottom: 1px solid rgba(255,255,255,0.12); }
    .services-section { padding: 28px 16px; }
    .service-grid { grid-template-columns: 1fr 1fr; }
    .p-btns { display: none; }
    .p-card { padding: 12px; }
    .map-frame { height: 250px; }
  }

  
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
  .map-frame { border-radius: var(--radius); overflow: hidden; border: 1.5px solid #a5f3fc; box-shadow: var(--shadow); height: 380px; }
  .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; align-items: start; }
  @media (max-width: 640px) { .detail-grid { grid-template-columns: 1fr; } }
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
  .d-map-frame { border-radius: var(--radius); overflow: hidden; border: 1.5px solid #a5f3fc; height: 200px; margin-bottom: 14px; box-shadow: var(--shadow); }
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
  .modal-x { background: var(--bg); border: none; width: 30px; height: 30px; border-radius: 50%; font-size: 14px; cursor: pointer; color: var(--muted); }
  .modal-drug { display: flex; gap: 12px; align-items: center; background: var(--bg); border-radius: var(--radius-sm); padding: 12px; margin-bottom: 16px; border: 1px solid var(--border); }
  .modal-drug-img { width: 40px; height: 40px; background: #e2e8f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
  .modal-drug-name { font-size: 13px; font-weight: 700; }
  .modal-drug-info { font-size: 11px; color: var(--muted); }
  .modal-lbl { font-size: 12px; font-weight: 600; color: var(--muted); margin-bottom: 6px; }
  .modal-ta { width: 100%; border: 1.5px solid var(--border); border-radius: var(--radius-sm); padding: 10px 12px; font-size: 13px; font-family: Inter,sans-serif; color: var(--text); resize: none; outline: none; margin-bottom: 16px; line-height: 1.6; }
  .modal-wa { width: 100%; background: #25D366; color: #fff; border: none; border-radius: var(--radius-sm); padding: 13px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: Inter,sans-serif; display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 10px; }
  .modal-cancel { width: 100%; background: none; border: none; font-size: 13px; color: var(--muted); cursor: pointer; font-family: Inter,sans-serif; padding: 4px; }
`;

const FALLBACK = [
  { id:1, name:"Lifecare Pharmacy", address:"14 Broad Street, Lagos Island", phone:"08012345678", distance:"0.8km", open:true, hours:"8:00am-10:00pm", emoji:"💊", rating:"4.7", reviews:"128" },
  { id:2, name:"MedPlus Pharmacy", address:"27 Allen Avenue, Ikeja", phone:"08023456789", distance:"1.2km", open:true, hours:"24 Hours", emoji:"🏥", rating:"4.5", reviews:"94" },
  { id:3, name:"HealthPlus Pharmacy", address:"3 Admiralty Way, Lekki", phone:"08034567890", distance:"1.8km", open:false, hours:"8:00am-9:00pm", emoji:"⚕️", rating:"4.3", reviews:"61" },
  { id:4, name:"Alpha Pharmacy", address:"5 Opebi Road, Ikeja", phone:"08045678901", distance:"2.1km", open:true, hours:"7:00am-11:00pm", emoji:"💉", rating:"4.6", reviews:"83" },
  { id:5, name:"Sunrise Pharmacy", address:"10 Victoria Island Blvd", phone:"08056789012", distance:"2.4km", open:true, hours:"24 Hours", emoji:"🌅", rating:"4.8", reviews:"210" },
];

const DRUGS = [
  { id:1, name:"Paracetamol 500mg", type:"Tablet · Pain Relief", price:"₦350", emoji:"💊", cat:"Pain Relief" },
  { id:2, name:"Amoxicillin 250mg", type:"Capsule · Antibiotic", price:"₦1,200", emoji:"💉", cat:"Antibiotics" },
  { id:3, name:"Ibuprofen 400mg", type:"Tablet · Anti-inflammatory", price:"₦500", emoji:"🔵", cat:"Pain Relief" },
  { id:4, name:"Metformin 500mg", type:"Tablet · Diabetes", price:"₦800", emoji:"🟡", cat:"Diabetes" },
  { id:5, name:"Omeprazole 20mg", type:"Capsule · Antacid", price:"₦650", emoji:"🟠", cat:"Antacids" },
];

const CATS = ["All","Pain Relief","Antibiotics","Diabetes","Antacids","Vitamins"];
const EMOJI_MAP: Record<string,string> = {"Lagos Island":"💊","Ikeja":"🏥","Lekki":"⚕️","Victoria Island":"🌅"};
const MAP_URL = "https://www.openstreetmap.org/export/embed.html?bbox=3.1191%2C6.3933%2C3.7773%2C6.7022&layer=mapnik&marker=6.5244%2C3.3792";

export default function Home() {
  const [page, setPage] = useState("home");
  const [homeQ, setHomeQ] = useState("");
  const [resultsQ, setResultsQ] = useState("");
  const [drugsQ, setDrugsQ] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const [selected, setSelected] = useState<any>(null);
  const [modal, setModal] = useState<any>(null);
  const [msgText, setMsgText] = useState("");
  const [activePg, setActivePg] = useState(1);
  const [pharmacies, setPharmacies] = useState<any[]>(FALLBACK);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/pharmacies?select=*&order=rating.desc`, {
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''}`,
      }
    }).then(r => r.json()).then(data => {
      if (Array.isArray(data) && data.length > 0) {
        setPharmacies(data.map((p:any) => ({
          id: p.id, name: p.name, address: p.address, phone: p.phone,
          distance: "nearby", open: p.is_open, hours: p.opening_hours,
          emoji: EMOJI_MAP[p.area] || "💊",
          rating: p.rating?.toString() || "4.5",
          reviews: p.reviews?.toString() || "0",
        })));
      }
    }).catch(() => {});
  }, []);

  const goResults = (q: string) => { setResultsQ(q||""); setPage("results"); };
  const goDrugs = () => { setDrugsQ(""); setActiveCat("All"); setPage("drugs"); };
  const filteredP = pharmacies.filter(p => p.name.toLowerCase().includes(resultsQ.toLowerCase()) || p.address.toLowerCase().includes(resultsQ.toLowerCase()));
  const filteredD = DRUGS.filter(d => (activeCat==="All"||d.cat===activeCat) && d.name.toLowerCase().includes(drugsQ.toLowerCase()));
  const openModal = (drug: any) => { setModal(drug); setMsgText(`Hello, I'd like to confirm the availability of ${drug.name}`); };

  return (
    <>
      <style>{S}</style>
      <div className="app">
        <nav>
          <div className="logo" onClick={() => setPage("home")}>
            <div className="logo-fb">HealthBridge</div>
          </div>
          <div className="nav-links">
            <span className="nav-link" onClick={() => setPage("home")}>Home</span>
            <span className="nav-link" onClick={() => goResults("")}>Pharmacies</span>
            <span className="nav-link" onClick={goDrugs}>Medications</span>
            <span className="nav-link">About us</span>
            <span className="nav-link">Help</span>
          </div>
          <div className="nav-right">
            <button className="btn-ghost">Log in</button>
            <button className="btn-signup">Sign up</button>
          </div>
        </nav>

        {page==="home" && <>
          <div className="hero-section">
            <div className="hero-inner">
              <div className="hero-badge"><div className="badge-dot"/>Trusted by 200+ verified pharmacies</div>
              <h1>Find your <span>medication</span><br/>near you in minutes</h1>
              <p className="hero-sub">Search verified pharmacies near you. Get directions, call ahead, and find your medications fast.</p>
              <div className="hero-search">
                <span style={{fontSize:16,marginRight:4}}>🔍</span>
                <input placeholder="Search pharmacy or medication..." value={homeQ} onChange={e=>setHomeQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&goResults(homeQ)}/>
                <button className="btn-green" onClick={()=>goResults(homeQ)}>Search</button>
              </div>
              <div className="hero-gps" onClick={()=>goResults("")}>📍 Use my current location</div>
              <div className="hero-stats">
                <div className="hero-stat"><div className="stat-n">200+</div><div className="stat-l">Verified Pharmacies</div></div>
                <div className="hero-stat"><div className="stat-n">20+</div><div className="stat-l">Areas Covered</div></div>
                <div className="hero-stat"><div className="stat-n">24/7</div><div className="stat-l">Always Available</div></div>
                <div className="hero-stat"><div className="stat-n">5k+</div><div className="stat-l">Happy Users</div></div>
              </div>
            </div>
          </div>
          <div className="services-section">
            <div className="section-title">What can we help you with?</div>
            <div className="section-sub">Everything you need to access healthcare near you</div>
            <div className="service-grid">
              {[
                {icon:"🏥",name:"Find Pharmacies",desc:"Search verified pharmacies by location",action:()=>goResults("")},
                {icon:"💊",name:"Find Medications",desc:"Search for specific drugs near you",action:goDrugs},
                {icon:"📞",name:"Call Directly",desc:"One tap to call any pharmacy",action:()=>goResults("")},
                {icon:"🗺️",name:"Get Directions",desc:"Open Maps to any pharmacy",action:()=>goResults("")},
              ].map(s=>(
                <div key={s.name} className="service-card" onClick={s.action}>
                  <div className="svc-icon">{s.icon}</div>
                  <div className="svc-name">{s.name}</div>
                  <div className="svc-desc">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </>}

        {page==="results" && <div className="page-wrap">
          <button className="back-btn" onClick={()=>setPage("home")}>← Back to home</button>
          <div className="page-title">Results for pharmacy</div>
          <div className="page-sub">{filteredP.length} pharmacies found near you</div>
          <div className="top-search">
            <input placeholder="🔍  Search pharmacies..." value={resultsQ} onChange={e=>setResultsQ(e.target.value)}/>
            <button>Search</button>
          </div>
          <div className="split-body">
            <div>
              <div className="p-list">
                {filteredP.map(p=>(
                  <div key={p.id} className="p-card" onClick={()=>{setSelected(p);setPage("detail");}}>
                    <div className="p-avatar">{p.emoji}</div>
                    <div className="p-body">
                      <div className="p-row1"><span className="p-name">{p.name}</span><span className="p-badge">VERIFIED</span></div>
                      <div className="p-rating"><b>★</b> {p.rating} ({p.reviews} reviews) · 📍 {p.distance}</div>
                      <div style={{fontSize:11,color:"#64748b"}}>🕐 {p.hours} · <span style={{color:p.open?"#059669":"#dc2626",fontWeight:600}}>{p.open?"● Open":"● Closed"}</span></div>
                    </div>
                    <div className="p-btns">
                      <button className="pb pb-view">View details</button>
                      <button className="pb pb-wa" onClick={e=>e.stopPropagation()}>💬 WhatsApp</button>
                      <button className="pb pb-call" onClick={e=>e.stopPropagation()}>📞 Call</button>
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
              <iframe className="map-frame" src={MAP_URL} width="100%" height="380" style={{border:0,display:"block"}} loading="lazy"></iframe>
            </div>
          </div>
        </div>}

        {page==="detail" && selected && <div className="page-wrap">
          <button className="back-btn" onClick={()=>setPage("results")}>← Back to results</button>
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
                  <button className="act-btn act-wa">💬 WhatsApp</button>
                  <button className="act-btn act-call">📞 Call</button>
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
              <iframe className="d-map-frame" src={MAP_URL} width="100%" height="200" style={{border:0,display:"block"}} loading="lazy"></iframe>
              <div className="d-card">
                <div className="sec-label">About this pharmacy</div>
                <p style={{fontSize:13,color:"#64748b",lineHeight:1.7,marginBottom:16}}>Verified and licensed pharmacy serving residents with genuine medications and professional healthcare services.</p>
                <button className="act-btn act-wa" style={{width:"100%",marginBottom:8}}>💬 Chat on WhatsApp</button>
                <button className="act-btn act-call" style={{width:"100%"}}>📞 Call Pharmacy</button>
              </div>
            </div>
          </div>
        </div>}

        {page==="drugs" && <div className="page-wrap">
          <button className="back-btn" onClick={()=>setPage("home")}>← Back to home</button>
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
              <iframe className="map-frame" src={MAP_URL} width="100%" height="380" style={{border:0,display:"block"}} loading="lazy"></iframe>
            </div>
          </div>
        </div>}

        {modal && <div className="overlay" onClick={()=>setModal(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-head">
              <div><div className="modal-title">Chat with {selected?.name || "pharmacy"}</div></div>
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
            <button className="modal-wa">💬 Continue to Whatsapp</button>
            <button className="modal-cancel" onClick={()=>setModal(null)}>Cancel</button>
          </div>
        </div>}
      </div>
    </>
  );
}

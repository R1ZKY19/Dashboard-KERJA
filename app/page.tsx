'use client'

import { useState } from 'react'
import { Activity, Bot, Calculator, ChevronDown, ClipboardList, FileText, Gamepad2, Hash, Home, Landmark, LayoutDashboard, Menu, Settings, ShieldCheck, Ticket, Users, Wrench, X } from 'lucide-react'

const sections = [
  { title: 'DASHBOARD', items: [['Overview', LayoutDashboard]] },
  { title: 'CATATAN', items: [['Notes', FileText], ['File Kerja CS', ClipboardList]] },
  { title: 'AI ASSISTANT', items: [['AI Chat', Bot]] },
  { title: 'TOGEL', items: [['Prediksi Togel', Hash], ['Hasil Result Togel', Hash], ['Kalkulator Togel', Calculator], ['KPBI Live', Activity], ['KPBI Cek Member', ShieldCheck]] },
  { title: 'KALKULATOR', items: [['Kalkulator Betting', Calculator], ['Kalkulator Parlay', Calculator]] },
  { title: 'TIKET & FREESPIN', items: [['Kode Tiket', Ticket], ['Hitung Freespin', Calculator], ['Tangkapan Menang', ClipboardList]] },
  { title: 'BANK & QRIS', items: [['Profil Bank', Landmark], ['RRN QRIS', Hash], ['Pintasan B.QRIS', Home], ['Validasi Rekening', ShieldCheck]] },
  { title: 'DATA DEPO / WD QRIS', items: [['Data Depo / WD QRIS', ClipboardList]] },
  { title: 'ALAT KERJA', items: [['Alat Kerja', Wrench]] },
  { title: 'KODE GAME', items: [['Filter Kode Game', Gamepad2]] },
  { title: 'TIM', items: [['Chat Koordinasi', Users], ['Arsip Kesalahan Chat', FileText], ['Pengguna Online', Activity], ['Pengguna & Akses', Users], ['Activity Log', Activity]] },
  { title: 'SISTEM', items: [['Pengaturan', Settings], ['Auto Screenshot', ClipboardList], ['Extension Suite', Wrench]] },
] as const

export default function Dashboard() {
  const [active, setActive] = useState('Overview')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  return <div className="min-h-screen bg-[#040d18] text-slate-200">
    <header className="fixed inset-x-0 top-0 z-30 h-16 border-b border-[#183047] bg-[#061426]/95 backdrop-blur-xl flex items-center justify-between px-4 lg:pl-[292px]">
      <div className="flex items-center gap-3"><button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden rounded-lg border border-[#183047] p-2">{mobileOpen ? <X size={18}/> : <Menu size={18}/>}</button><div><div className="font-semibold tracking-wide">{active}</div><div className="text-xs text-slate-500">D.KERJA / Workspace</div></div></div>
      <div className="flex items-center gap-3"><div className="hidden sm:block text-right"><div className="text-sm font-medium">RIZKY</div><div className="text-[10px] text-cyan-400">SUPER MASTER</div></div><div className="grid size-9 place-items-center rounded-full border border-cyan-900 bg-[#092235] text-cyan-300">R</div></div>
    </header>

    <aside className={`${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed z-40 top-0 bottom-0 left-0 w-[276px] border-r border-[#183047] bg-[#061426] transition-transform duration-300 overflow-y-auto`}>
      <div className="sticky top-0 z-10 border-b border-[#183047] bg-[#061426] p-5"><div className="flex items-center gap-3"><div className="grid size-10 place-items-center rounded-xl border border-cyan-900 bg-[#092235] text-cyan-300"><LayoutDashboard size={21}/></div><div><div className="font-bold tracking-[.18em]">D.KERJA</div><div className="text-[10px] text-slate-500 tracking-[.22em]">ENTERPRISE SUITE</div></div></div></div>
      <nav className="p-3 space-y-4">
        {sections.map(section => <div key={section.title}><button onClick={() => setCollapsed(v => ({...v, [section.title]: !v[section.title]}))} className="w-full px-2 mb-1 flex items-center justify-between text-[10px] font-semibold tracking-[.18em] text-slate-600 hover:text-slate-400"><span>{section.title}</span><ChevronDown size={13} className={collapsed[section.title] ? '-rotate-90 transition-transform' : 'transition-transform'}/></button>{!collapsed[section.title] && <div className="space-y-1">{section.items.map(([name, Icon]) => <button key={name} onClick={() => {setActive(name); setMobileOpen(false)}} className={`menu-item w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm ${active === name ? 'active' : 'text-slate-400'}`}><Icon size={16}/><span className="truncate">{name}</span>{name.includes('Live') || name === 'Pengguna Online' ? <span className="ml-auto text-[9px] rounded bg-emerald-500/10 px-1.5 py-0.5 text-emerald-400">LIVE</span> : null}</button>)}</div>}</div>)}
      </nav>
      <div className="sticky bottom-0 p-3 bg-[#061426]"><div className="rounded-xl border border-[#174052] bg-[#071a2b] p-3"><div className="flex items-center gap-3"><div className="grid size-9 place-items-center rounded-full bg-[#12334a] text-cyan-300">R</div><div className="min-w-0"><div className="truncate text-sm font-medium">RIZKY</div><div className="text-[10px] text-cyan-400">SUPER MASTER</div></div></div></div></div>
    </aside>

    {mobileOpen && <button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-30 bg-black/60 lg:hidden"/>}

    <main className="lg:ml-[276px] pt-16 min-h-screen"><div key={active} className="page-enter p-5 sm:p-7 lg:p-9 max-w-[1500px] mx-auto">
      <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><div className="text-xs font-semibold tracking-[.2em] text-cyan-500">WORKSPACE</div><h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight">{active}</h1><p className="mt-1 text-sm text-slate-500">Kelola pekerjaan kamu dari satu dashboard.</p></div><div className="rounded-xl border border-[#183047] bg-[#08182a] px-4 py-2 text-xs text-slate-400">Status Sistem <span className="ml-2 text-emerald-400">● Online</span></div></div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[['Modul Aktif','12','Modules'],['Aktivitas Hari Ini','48','Activities'],['Pengguna Online','08','Online'],['Status Sistem','100%','Healthy']].map(([a,b,c],i) => <div key={a} className="card-enter rounded-2xl border border-[#183047] bg-[#08182a] p-5" style={{animationDelay:`${i*70}ms`}}><div className="text-xs text-slate-500">{a}</div><div className="mt-3 text-2xl font-bold">{b}</div><div className="mt-1 text-[11px] text-cyan-500">{c}</div></div>)}</div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_.6fr]"><section className="rounded-2xl border border-[#183047] bg-[#08182a] p-5 sm:p-6"><div className="flex items-center justify-between"><div><h2 className="font-semibold">Quick Access</h2><p className="mt-1 text-xs text-slate-500">Akses fitur kerja yang paling sering digunakan.</p></div><Wrench size={18} className="text-cyan-500"/></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{['Notes','AI Chat','Profil Bank','Alat Kerja'].map((name,i)=><button key={name} onClick={()=>setActive(name)} className="menu-item group flex items-center gap-3 border-[#183047] bg-[#071726] p-4 text-left"><div className="grid size-9 place-items-center rounded-lg border border-[#214258] bg-[#092235] text-cyan-400"><span>{i+1}</span></div><div><div className="text-sm font-medium">{name}</div><div className="text-[11px] text-slate-600 group-hover:text-slate-500">Buka fitur</div></div></button>)}</div></section><section className="rounded-2xl border border-[#183047] bg-[#08182a] p-5 sm:p-6"><h2 className="font-semibold">System Activity</h2><div className="mt-5 space-y-4">{['Dashboard siap digunakan','Modul berhasil dimuat','Workspace aktif'].map((x,i)=><div key={x} className="flex gap-3"><span className="mt-1 size-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,197,.5)]"/><div><div className="text-sm">{x}</div><div className="text-[10px] text-slate-600">{i+1} menit yang lalu</div></div></div>)}</div></section></div>
    </div></main>
  </div>
}
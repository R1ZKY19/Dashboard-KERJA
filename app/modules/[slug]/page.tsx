'use client'

import Link from 'next/link'
import { ArrowLeft, Construction } from 'lucide-react'
import { useParams } from 'next/navigation'

const names: Record<string,string> = {
  notes:'Notes','file-kerja-cs':'File Kerja CS','ai-chat':'AI Chat','prediksi-togel':'Prediksi Togel','hasil-result-togel':'Hasil Result Togel','kalkulator-togel':'Kalkulator Togel','kpbi-live':'KPBI Live','kpbi-cek-member':'KPBI Cek Member','kalkulator-betting':'Kalkulator Betting','kalkulator-parlay':'Kalkulator Parlay','kode-tiket':'Kode Tiket','hitung-freespin':'Hitung Freespin','tangkapan-menang':'Tangkapan Menang','profil-bank':'Profil Bank','rrn-qris':'RRN QRIS','pintasan-bqris':'Pintasan B.QRIS','validasi-rekening':'Validasi Rekening','data-depo-wd-qris':'Data Depo / WD QRIS','alat-kerja':'Alat Kerja','filter-kode-game':'Filter Kode Game','chat-koordinasi':'Chat Koordinasi','arsip-kesalahan-chat':'Arsip Kesalahan Chat','pengguna-online':'Pengguna Online','pengguna-akses':'Pengguna & Akses','activity-log':'Activity Log','pengaturan':'Pengaturan','auto-screenshot':'Auto Screenshot','extension-suite':'Extension Suite'
}

export default function ModulePage(){
 const {slug}=useParams<{slug:string}>(); const name=names[slug] ?? slug.replaceAll('-',' ')
 return <main className="min-h-screen bg-[#040d18] p-5 sm:p-8 lg:p-12"><div className="page-enter mx-auto max-w-5xl"><Link href="/" className="menu-item inline-flex items-center gap-2 px-3 py-2 text-sm text-slate-400"><ArrowLeft size={16}/> Kembali ke Dashboard</Link><section className="mt-6 rounded-2xl border border-[#183047] bg-[#08182a] p-8"><div className="grid size-14 place-items-center rounded-2xl border border-cyan-900 bg-[#092235] text-cyan-400"><Construction size={25}/></div><div className="mt-6 text-xs tracking-[.2em] text-cyan-500">D.KERJA MODULE</div><h1 className="mt-2 text-3xl font-bold capitalize">{name}</h1><p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">Modul ini sudah terhubung ke sistem navigasi D.KERJA. Area kerja fiturnya siap dikembangkan tanpa mengubah struktur dashboard utama.</p><div className="mt-7 rounded-xl border border-dashed border-[#214258] bg-[#071726] p-5 text-sm text-slate-400">Workspace <span className="text-cyan-400">ready</span>. Fitur khusus modul akan ditempatkan di area ini.</div></section></div></main>
}
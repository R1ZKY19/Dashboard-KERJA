import ModuleClient from './ModuleClient'

const slugs = [
  'notes','file-kerja-cs','ai-chat','prediksi-togel','hasil-result-togel','kalkulator-togel','kpbi-live','kpbi-cek-member',
  'kalkulator-betting','kalkulator-parlay','kode-tiket','hitung-freespin','tangkapan-menang','profil-bank','rrn-qris',
  'pintasan-bqris','validasi-rekening','data-depo-wd-qris','alat-kerja','filter-kode-game','chat-koordinasi',
  'arsip-kesalahan-chat','pengguna-online','pengguna-akses','activity-log','pengaturan','auto-screenshot','extension-suite'
]

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }))
}

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <ModuleClient slug={slug} />
}

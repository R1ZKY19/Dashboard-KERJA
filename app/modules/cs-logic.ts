export type ResultStatus = 'WIN'|'LOSE'|'DRAW'|'WIN_HALF'|'LOSE_HALF'

export function halfResult(line:number, goals:number):ResultStatus { if(goals>line)return 'WIN'; if(goals<line)return 'LOSE'; return 'DRAW' }
export function combine(a:ResultStatus,b:ResultStatus):ResultStatus { if(a===b)return a; if(a==='DRAW'||b==='DRAW'){const other=a==='DRAW'?b:a; return other==='WIN'?'WIN_HALF':'LOSE_HALF'} return 'DRAW' }
export function overResult(handicap:number,goals:number):ResultStatus { const frac=handicap-Math.floor(handicap); let lo:number,hi:number; if(frac===.25){lo=Math.floor(handicap);hi=lo+.5}else if(frac===.75){lo=Math.floor(handicap)+.5;hi=lo+.5}else{lo=hi=handicap} return combine(halfResult(lo,goals),halfResult(hi,goals)) }
export function calculateBet(betType:'handicap'|'over'|'under',side:'over'|'under',handicap:number,totalGoal:number):ResultStatus { const ov=overResult(handicap,totalGoal); if(betType==='handicap')return flip(ov); return side==='under'?flip(ov):ov }
export function flip(r:ResultStatus):ResultStatus { return ({WIN:'LOSE',LOSE:'WIN',WIN_HALF:'LOSE_HALF',LOSE_HALF:'WIN_HALF',DRAW:'DRAW'} as Record<ResultStatus,ResultStatus>)[r] }

export type ParlayTeam={name:string;odds:number;status:'win'|'win_half'|'draw'|'lose_half'|'lose'}
export function convertOdds(odds:number,status:ParlayTeam['status']) { const o=Number(odds)||0; if(status==='win')return o; if(status==='win_half')return ((o-1)/2)+1; if(status==='draw')return 1; if(status==='lose_half')return .5; return 0 }
export function calcParlay(stake:number,teams:ParlayTeam[]){ const nominal=Number(stake)||0; const isLose=teams.some(t=>t.status==='lose'); const converted=teams.map(t=>({...t,converted:convertOdds(t.odds,t.status)})); if(isLose)return {totalOdds:0,profit:-nominal,totalPayout:0,finalStatus:'LOSE',converted}; let totalOdds=1; converted.forEach(t=>totalOdds*=t.converted); totalOdds=Math.round(totalOdds*10000)/10000; const profit=(totalOdds-1)*nominal,totalPayout=totalOdds*nominal,hasHalf=converted.some(t=>t.status==='win_half'||t.status==='lose_half'); const finalStatus=totalOdds>1?(hasHalf?'HALF WIN':'WIN'):Math.abs(totalOdds-1)<1e-9?'DRAW':totalOdds<.5?'LOSE':'HALF LOSE'; return {totalOdds,profit,totalPayout,finalStatus,converted} }

export type TogelBet={label:string;model:'diskon'|'full'|'bb'|'even'|'multi'|'dasar';prize?:number;terbalikPrize?:number;discount?:number;kei?:number;options?:{label:string;value?:number;kei?:number}[]}
export const TOGEL_BETS:TogelBet[]=[
 {label:'4D',model:'diskon',prize:3000,discount:.665},{label:'3D',model:'diskon',prize:400,discount:.595},{label:'2D Belakang',model:'diskon',prize:70,discount:.295},{label:'2D Depan',model:'diskon',prize:65,discount:.295},{label:'4D BB',model:'bb',prize:4000,terbalikPrize:200,discount:.665},{label:'3D BB',model:'bb',prize:400,terbalikPrize:100,discount:.595},{label:'2D BB',model:'bb',prize:70,terbalikPrize:20,discount:.295},{label:'4D Full',model:'full',prize:10000},{label:'3D Full',model:'full',prize:1000},{label:'2D Full',model:'full',prize:100},{label:'Colok Bebas',model:'multi',discount:.06,options:[{label:'1 Angka',value:1.5},{label:'2 Angka',value:3},{label:'3 Angka',value:4.5},{label:'4 Angka',value:6}]},{label:'Colok Macau',model:'multi',discount:.1,options:[{label:'7x',value:7},{label:'11x',value:11},{label:'18x',value:18}]},{label:'Colok Naga',model:'multi',discount:.1,options:[{label:'3D',value:23},{label:'4D',value:35}]},{label:'Colok Jitu',model:'diskon',prize:8,discount:.06},{label:'Shio',model:'diskon',prize:9.5,discount:.05},{label:'Kombinasi',model:'diskon',prize:2.6,discount:.08},{label:'Tengah Tepi',model:'even',discount:.02,kei:.03},{label:'50-50',model:'even',discount:.02,kei:.03},{label:'Silang Homo',model:'even',discount:.02,kei:.03},{label:'Kembang Kempis',model:'even',discount:.02,kei:.03},{label:'Dasar',model:'dasar',discount:.02,options:[{label:'Besar',kei:.25},{label:'Kecil',kei:-.1},{label:'Genap',kei:-.1},{label:'Ganjil',kei:.25}]}
]
export function calcTogel(jumlah:number,bet:TogelBet,optionIndex=0){const nominal=Number(jumlah)||0; const opt=bet.options?.[optionIndex]; const model=bet.model==='multi'?'diskon':bet.model==='dasar'?'even':bet.model; const discount=Number(bet.discount)||0; const modalBayar=model==='full'?nominal:Math.round(nominal*(1-discount)); let potensiMenang=0,potensiMenangTerbalik:number|null=null; if(model==='bb'){potensiMenang=Math.round(nominal*(bet.prize||0));potensiMenangTerbalik=Math.round(nominal*(bet.terbalikPrize||0))}else if(model==='even'){potensiMenang=Math.round(nominal*(2-(opt?.kei??bet.kei??0)))}else{potensiMenang=Math.round(nominal*((opt?.value??bet.prize) || 0))} return {nominal,modalBayar,potensiMenang,potensiMenangTerbalik,profit:potensiMenang-modalBayar,discount,model,bet:bet.label,option:opt?.label} }
export const formatRp=(n:number)=>'Rp '+new Intl.NumberFormat('id-ID').format(Math.round(Number(n)||0))

export const CS_GUIDES=[
 ['Hitung Freespin','Tempel teks hasil spin untuk hitung total kemenangan otomatis.','/modules/hitung-freespin'],
 ['Prediksi Togel','Generate angka prediksi untuk berbagai pasaran.','/modules/prediksi-togel'],
 ['Kode Tiket','Koleksi kode tiket promo siap salin.','/modules/kode-tiket'],
 ['Tangkapan Menang','Screenshot bukti kemenangan akhir per game.','/modules/tangkapan-menang'],
 ['Profil Bank','Profil bank & e-wallet untuk verifikasi pembayaran.','/modules/profil-bank'],
 ['RRN QRIS','Bukti transfer RRN dari berbagai bank & e-wallet.','/modules/rrn-qris'],
]
export const QUICK_LINKS=[
 ['BUKTI QRIS LENGKAP','https://help.xendit.co/hc/id/articles/10622653205657-Bukti-Pembayaran-QRIS-yang-Dapat-Diterima'],
 ['WITHDRAW MANUAL (PAKAI KODE)','https://script.google.com/'],
 ['FILTER KODE TIKET','https://filtertiket-rpm.netlify.app']
]
export const BANK_PROFILES=['BNI','MayBCA','Mobile BCA','Mobile BNI','Mobile BRI','Mobile BSI','Mobile CIMB','Mobile Danamon','Livin Mandiri','Mobile Maybank','Mobile SeaBank','Mobile OCBC','DANA','GOPAY','OVO','LinkAja']
export const RRN_PROFILES=['Aladin','Virtual Account BCA Blue','ShopeePay [1]','ShopeePay [2]','Jenius','Bank Jatim','DOKU','AlloBank','Bank Jateng','Bank Mega','Bank Jago','Bank BNI','Bank Wonder','Bank BRI','Bank BSI','Bank BSI BYOND','Bank BTN','Bank CIMB','Bank Danamon','I.Saku','Mandiri / Livin','MyBCA','OCBC','SeaBank','Bank Sinarmas','DANA','OVO','LinkAja','GOPAY']


import React, { forwardRef } from 'react';
import { ReportData } from '../types';

interface ReportTemplateProps {
  data: ReportData;
}

const ReportTemplate = forwardRef<HTMLDivElement, ReportTemplateProps>(({ data }, ref) => {
  return (
    <div 
      ref={ref}
      className="w-[210mm] bg-white p-[15mm] text-slate-900 border"
      style={{ minHeight: '297mm', fontFamily: 'Inter, sans-serif' }}
    >
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-slate-900">
        <img 
          src="https://i.postimg.cc/85r2HXVS/Whats-App-Image-2026-01-13-at-8-29-54-PM.jpg" 
          alt="Logo Sekolah" 
          className="h-24 w-auto" 
          onError={(e) => { e.currentTarget.src = 'https://picsum.photos/100/100?text=SKTP' }}
        />
        <div className="text-center flex-1">
          <h1 className="text-xl font-bold uppercase mb-1">SK Taman Pelangi</h1>
          <h2 className="text-lg font-bold uppercase tracking-widest text-blue-800">Laporan OPR</h2>
          <p className="text-xs uppercase font-medium">Laporan Program & Aktiviti Sekolah</p>
        </div>
        <img 
          src="https://i.postimg.cc/RJ0PKZw3/logo-ts25.png" 
          alt="Logo TS25" 
          className="h-24 w-auto" 
          onError={(e) => { e.currentTarget.src = 'https://picsum.photos/100/100?text=TS25' }}
        />
      </div>

      {/* Main Content Table */}
      <table className="w-full border-collapse border-2 border-slate-900 text-sm">
        <tbody>
          <tr>
            <td className="border border-slate-900 p-2 bg-slate-100 font-bold w-[30%]">NAMA PROGRAM / AKTIVITI</td>
            <td className="border border-slate-900 p-2 uppercase font-semibold">{data.namaProgram || '-'}</td>
          </tr>
          <tr>
            <td className="text-center align-middle border border-slate-900 p-2 bg-slate-100 font-bold">ANJURAN</td>
            <td className="border border-slate-900 p-2">{data.anjuran || '-'}</td>
          </tr>
          <tr>
            <td className="border border-slate-900 p-2 bg-slate-100 font-bold">TARIKH / MASA</td>
            <td className="border border-slate-900 p-2">{data.tarikh || '-'} / {data.masa || '-'}</td>
          </tr>
          <tr>
            <td className="border border-slate-900 p-2 bg-slate-100 font-bold">TEMPAT</td>
            <td className="border border-slate-900 p-2">{data.tempat || '-'}</td>
          </tr>
          <tr>
            <td className="border border-slate-900 p-2 bg-slate-100 font-bold">SASARAN</td>
            <td className="border border-slate-900 p-2">{data.sasaran || '-'}</td>
          </tr>
          <tr>
            <td className="border border-slate-900 p-2 bg-slate-100 font-bold align-top" colSpan={2}>OBJEKTIF PROGRAM</td>
          </tr>
          <tr>
            <td className="border border-slate-900 p-3 align-top min-h-[40px]" colSpan={2}>
              {data.objektif ? (
                <div className="whitespace-pre-wrap">{data.objektif}</div>
              ) : (
                <span className="text-slate-300 italic">Tiada maklumat objektif...</span>
              )}
            </td>
          </tr>
          <tr>
            <td className="border border-slate-900 p-2 bg-slate-100 font-bold align-top" colSpan={2}>RINGKASAN AKTIVITI</td>
          </tr>
          <tr>
            <td className="border border-slate-900 p-3 align-top min-h-[60px]" colSpan={2}>
              {data.aktiviti ? (
                <div className="whitespace-pre-wrap">{data.aktiviti}</div>
              ) : (
                <span className="text-slate-300 italic">Tiada maklumat aktiviti...</span>
              )}
            </td>
          </tr>
          <tr>
            <td className="border border-slate-900 p-0" colSpan={2}>
              <div className="flex w-full">
                <div className="w-1/2 border-r border-slate-900">
                  <div className="bg-slate-100 p-1 font-bold border-b border-slate-900 text-center">KEKUATAN</div>
                  <div className="p-2 min-h-[50px] whitespace-pre-wrap">{data.kekuatan || '-'}</div>
                </div>
                <div className="w-1/2">
                  <div className="bg-slate-100 p-1 font-bold border-b border-slate-900 text-center">KELEMAHAN</div>
                  <div className="p-2 min-h-[50px] whitespace-pre-wrap">{data.kelemahan || '-'}</div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Image Grid Section */}
      <div className="mt-6">
        <h3 className="flex justify-center h-8 font-bold bg-slate-900 text-white mb-2 text-xs uppercase tracking-wider">
          Lensa Aktiviti (Lampiran Gambar)
        </h3>

        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="aspect-[4/3] border border-slate-300 bg-slate-50 flex items-center justify-center overflow-hidden">
              {data.images[i] ? (
                <img src={data.images[i]} alt={`Activity ${i}`} className="w-full h-full object-cover" />
              ) : (
                <span className="text-[10px] text-slate-300">Gambar {i + 1}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Signature Area */}
      <div className="mt-10 flex justify-between px-4">
        <div className="text-center">
          <div className="w-40 border-b border-slate-900 h-12"></div>
          <p className="mt-2 text-xs font-bold uppercase">Disediakan Oleh</p>
          <p className="text-[10px] text-slate-500">Penyelaras Program</p>
        </div>
        <div className="text-center">
          <div className="w-40 border-b border-slate-900 h-12"></div>
          <p className="mt-2 text-xs font-bold uppercase">Disahkan Oleh</p>
          <p className="text-[10px] text-slate-500">Guru Besar / PK Pentadbiran</p>
        </div>
      </div>
      
      <div className="mt-6 text-[8px] text-slate-400 text-right uppercase italic">
        Janaan Komputer: SK Taman Pelangi - One Page Report (OPR)
      </div>
    </div>
  );
});

ReportTemplate.displayName = 'ReportTemplate';

export default ReportTemplate;

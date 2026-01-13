
import React, { useState, useRef } from 'react';
import { ReportData, INITIAL_REPORT_DATA } from './types';
import ReportForm from './components/ReportForm';
import ReportTemplate from './components/ReportTemplate';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const App: React.FC = () => {
  const [data, setData] = useState<ReportData>(INITIAL_REPORT_DATA);
  const [isGenerating, setIsGenerating] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!reportRef.current) return;
    
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2, // Higher scale for better PDF quality
        useCORS: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Laporan_OPR_${data.namaProgram || 'SKTP'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Ralat semasa menjana PDF. Sila cuba lagi.');
    } finally {
      setIsGenerating(false);
    }
  };

  const updateField = (field: keyof ReportData, value: string | string[]) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen py-8 px-4">
      {/* App Header */}
      <div className="max-w-4xl mx-auto mb-8 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <img 
            src="https://i.postimg.cc/85r2HXVS/Whats-App-Image-2026-01-13-at-8-29-54-PM.jpg" 
            alt="Logo Sekolah" 
            className="h-16 md:h-20 object-contain"
            onError={(e) => { e.currentTarget.src = 'https://picsum.photos/100/100?text=SKTP' }}
          />
          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 uppercase tracking-tight">
              Laporan OPR SK Taman Pelangi
            </h1>
            <p className="text-sm text-slate-500 font-medium">Sistem Penjanaan Laporan Satu Muka Surat</p>
          </div>
          <img 
            src="https://i.postimg.cc/RJ0PKZw3/logo-ts25.png" 
            alt="Logo TS25" 
            className="h-16 md:h-20 object-contain"
            onError={(e) => { e.currentTarget.src = 'https://picsum.photos/100/100?text=TS25' }}
          />
        </div>
      </div>

      <main className="max-w-4xl mx-auto space-y-8">
        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="bg-slate-800 p-4">
            <h2 className="text-white font-semibold text-lg flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
              </svg>
              Input Maklumat Laporan
            </h2>
          </div>
          <div className="p-6">
            <ReportForm data={data} updateField={updateField} onGenerate={generatePDF} isGenerating={isGenerating} />
          </div>
        </div>

        {/* Hidden Preview used for PDF Generation */}
        <div className="overflow-hidden h-0 w-0 absolute left-[-9999px]">
          <ReportTemplate data={data} ref={reportRef} />
        </div>
        
        {/* Visual Guide */}
        <div className="text-center text-slate-400 text-sm italic">
          Pastikan semua maklumat diisi sebelum menekan butang JANA PDF.
        </div>
      </main>
    </div>
  );
};

export default App;

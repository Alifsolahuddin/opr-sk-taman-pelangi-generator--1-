
import React from 'react';
import { ReportData } from '../types';

interface InputFieldProps {
  label: string;
  field: keyof ReportData;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (field: keyof ReportData, value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, field, placeholder, type = "text", value, onChange }) => (
  <div className="space-y-1">
    <label className="text-sm font-semibold text-slate-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(field, e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-2 bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
    />
  </div>
);

interface TextAreaFieldProps {
  label: string;
  field: keyof ReportData;
  placeholder: string;
  value: string;
  onChange: (field: keyof ReportData, value: string) => void;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({ label, field, placeholder, value, onChange }) => (
  <div className="space-y-1">
    <label className="text-sm font-semibold text-slate-700">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(field, e.target.value)}
      placeholder={placeholder}
      rows={3}
      className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
    />
  </div>
);

interface ReportFormProps {
  data: ReportData;
  updateField: (field: keyof ReportData, value: string | string[]) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const ReportForm: React.FC<ReportFormProps> = ({ data, updateField, onGenerate, isGenerating }) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    if (files.length + data.images.length > 6) {
      alert("Maksimum 6 gambar sahaja dibenarkan.");
      return;
    }

    const currentImages = [...data.images];
    let loadedCount = 0;
    const totalToLoad = files.length;

    if (totalToLoad === 0) return;

    files.forEach((file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result && typeof reader.result === 'string') {
          currentImages.push(reader.result);
        }
        loadedCount++;
        if (loadedCount === totalToLoad) {
          updateField('images', currentImages);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    const newImages = [...data.images];
    newImages.splice(index, 1);
    updateField('images', newImages);
  };

  const handleTextChange = (field: keyof ReportData, value: string) => {
    updateField(field, value);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <InputField 
            label="Nama Program / Aktiviti" 
            field="namaProgram" 
            placeholder="Contoh: Kejohanan Sukan Tahunan" 
            value={data.namaProgram}
            onChange={handleTextChange}
          />
        </div>
        <InputField 
          label="Anjuran" 
          field="anjuran" 
          placeholder="Contoh: Unit Kokurikulum" 
          value={data.anjuran}
          onChange={handleTextChange}
        />
        <InputField 
          label="Tarikh" 
          field="tarikh" 
          placeholder="Contoh: 12 Mac 2024" 
          value={data.tarikh}
          onChange={handleTextChange}
        />
        <InputField 
          label="Masa" 
          field="masa" 
          placeholder="Contoh: 8:00 AM - 1:00 PM" 
          value={data.masa}
          onChange={handleTextChange}
        />
        <InputField 
          label="Tempat" 
          field="tempat" 
          placeholder="Contoh: Padang Sekolah" 
          value={data.tempat}
          onChange={handleTextChange}
        />
        <InputField 
          label="Sasaran" 
          field="sasaran" 
          placeholder="Contoh: Semua murid dan guru" 
          value={data.sasaran}
          onChange={handleTextChange}
        />
      </div>

      <div className="space-y-4">
        <TextAreaField 
          label="Objektif" 
          field="objektif" 
          placeholder="Terangkan objektif program..." 
          value={data.objektif}
          onChange={handleTextChange}
        />
        <TextAreaField 
          label="Aktiviti" 
          field="aktiviti" 
          placeholder="Terangkan aktiviti-aktiviti yang dijalankan..." 
          value={data.aktiviti}
          onChange={handleTextChange}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextAreaField 
            label="Kekuatan" 
            field="kekuatan" 
            placeholder="Apakah kekuatan program?" 
            value={data.kekuatan}
            onChange={handleTextChange}
          />
          <TextAreaField 
            label="Kelemahan" 
            field="kelemahan" 
            placeholder="Apakah kelemahan program?" 
            value={data.kelemahan}
            onChange={handleTextChange}
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-700">Gambar Aktiviti (Maksimum 6)</label>
        <div className="flex flex-wrap gap-4 items-center">
          <label className="cursor-pointer bg-blue-50 text-blue-600 border-2 border-dashed border-blue-200 hover:border-blue-400 hover:bg-blue-100 px-6 py-8 rounded-xl flex flex-col items-center justify-center transition-all w-32 h-32">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-xs font-bold">Upload</span>
            <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
          
          {data.images.map((img, idx) => (
            <div key={idx} className="relative w-32 h-32 group">
              <img src={img} alt={`Upload ${idx}`} className="w-full h-full object-cover rounded-xl border border-slate-200" />
              <button 
                onClick={() => removeImage(idx)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-slate-200">
        <button
          onClick={onGenerate}
          disabled={isGenerating || !data.namaProgram}
          className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-xl transform transition-all active:scale-95 flex items-center justify-center gap-2 ${
            isGenerating || !data.namaProgram 
              ? 'bg-slate-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800'
          }`}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Menjana PDF...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              JANA PDF
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ReportForm;

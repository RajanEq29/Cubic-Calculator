import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Home,  Palette,} from 'lucide-react';
import BasicCalculator from './components/BasicCalculator';
import AdvanceCalculator from './components/AdvanceCalculator';

type FormData = {
  uom: string;
  length: number;
  width: number;
  height: number;
  weight: number;
  weightUnit: string;
  qty: number;
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ADVANCE');
  const [primaryColor, setPrimaryColor] = useState('#5D3587');
 
  const [showColorPicker, setShowColorPicker] = useState(false);

  const methods = useForm<FormData>({
    defaultValues: {
      uom: 'cm',
      length: 0,
      width: 0,
      height: 0,
      weight: 0,
      weightUnit: 'Kg',
      qty: 1,
    }
  });

  const { watch } = methods;
  const values = watch();

  

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'h') {
      console.log("======>")
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    const calculate = () => {
      const {  length, width, height,  qty } = values;
      let l = Number(length), w = Number(width), h = Number(height), q = Number(qty);
      if (isNaN(l) || isNaN(w) || isNaN(h) || isNaN(q)) return;

   
      
      


     
    };
    calculate();
  }, [values]);

  const tabs = ['ADVANCE', 'BASIC'];
  const colors = ['#5D3587', '#1E40AF', '#059669', '#DC2626', '#D97706', '#7C3AED'];

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-[#F0F2F5] py-10 px-4 md:px-0" style={{ '--brand-primary': primaryColor } as React.CSSProperties}>
        <div className="max-w-5xl mx-auto">

          <div className="bg-white/80 backdrop-blur-md p-2 rounded-full mb-8 flex justify-between items-center shadow-sm overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`tab-button ${activeTab === tab ? 'tab-active' : 'tab-inactive'}`}
                  style={activeTab === tab ? { backgroundColor: primaryColor } : {}}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4 px-4">
              <button onClick={() => setShowColorPicker(!showColorPicker)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                <Palette size={20} />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 font-semibold hover:bg-brand-light rounded-full transition-colors hidden md:flex" style={{ color: primaryColor }}>
                <Home size={18} />
                <span>Add to Home</span>
              </button>
            </div>
          </div>

          {showColorPicker && (
            <div className="bg-white p-4 rounded-3xl shadow-xl mb-6 flex gap-3 animate-in fade-in zoom-in duration-300">
              {colors.map(c => (
                <button key={c} onClick={() => { setPrimaryColor(c); setShowColorPicker(false); }} className="w-8 h-8 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform" style={{ backgroundColor: c }} />
              ))}
            </div>
          )}

          <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-purple-50">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold" style={{ color: primaryColor }}>
                  Mode: <span className="opacity-70">{activeTab === 'ADVANCE' ? 'Cubic Meter (m³)' : 'Basic Calculator'}</span>
                </h2>
                <div className="flex items-center gap-4">
                  <span className="text-gray-400 text-sm hidden sm:inline text-right">Press <kbd className="bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">H</kbd> for help</span>
                  <button className="text-white px-6 py-2.5 rounded-2xl text-sm font-bold shadow-lg transition-transform hover:scale-105" style={{ backgroundColor: primaryColor, boxShadow: `${primaryColor}33 0px 8px 16px` }}>
                    Open {activeTab === 'ADVANCE' ? 'Feet' : 'm³'} Calculator
                  </button>
                </div>
              </div>

              <div className="">
                <div className="lg:col-span-2 space-y-8">
                  <h3 className="text-gray-400 font-bold tracking-widest text-xs uppercase">INPUTS</h3>
                 
 {activeTab === 'ADVANCE' ? <AdvanceCalculator primaryColor={primaryColor} /> : <BasicCalculator primaryColor={primaryColor} />}
                
                </div>

                
              </div>
            </div>
          </div>
        </div>

     
      </div>
    </FormProvider>
  );
};



export default App;

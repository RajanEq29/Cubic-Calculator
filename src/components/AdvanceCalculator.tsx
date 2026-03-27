import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

type FormData = {
    uom: string;
    length: number;
    width: number;
    height: number;
    weight: number;
    weightUnit: string;
    qty: number;
};

const AdvanceCalculator: React.FC<{ primaryColor?: string }> = ({ primaryColor = '#5B4099' }) => {
    const { register, control } = useFormContext<FormData>();
    const values = useWatch({ control });

    const length = Number(values.length) || 0;
    const width = Number(values.width) || 0;
    const height = Number(values.height) || 0;
    const qty = Number(values.qty) || 0;
    const uom = values.uom || 'cm';
    const weight = Number(values.weight) || 0;
    const weightUnit = values.weightUnit || 'Kg';

    // Volume Calculations (Convert to meters)
    let l_m = length, w_m = width, h_m = height;
    if (uom === 'cm') {
        l_m = length / 100;
        w_m = width / 100;
        h_m = height / 100;
    } else if (uom === 'inch') {
        l_m = length * 0.0254;
        w_m = width * 0.0254;
        h_m = height * 0.0254;
    } else if (uom === 'feet') {
        l_m = length * 0.3048;
        w_m = width * 0.3048;
        h_m = height * 0.3048;
    }

    const cbm = l_m * w_m * h_m * qty;
    const cft = cbm * 35.3147;

    // Weight Calculations
    let weightKg = weight;
    if (weightUnit === 'lb') {
        weightKg = weight * 0.453592;
    }
    const totalWeightKg = weightKg * qty;
    const totalWeightLb = totalWeightKg / 0.453592;

    // Volumetric Weight
    const volWeightSeaKg = cbm * 1000;
    const volWeightSeaLb = volWeightSeaKg / 0.453592;
    const volWeightAirKg = cbm * 167; // Standard 1:6 ratio (1m3 = 167kg)
    const volWeightAirLb = volWeightAirKg / 0.453592;

    // Container Estimations
    const container20ft = cbm / 33;
    const container40ft = cbm / 67;
    const container40ftHC = cbm / 76;

    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">

            {/* --- INPUTS SECTION --- */}
            <div>
                <h3 className="text-gray-500 font-semibold uppercase tracking-wider mb-4 border-b pb-2 text-sm">Inputs</h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">UOM</label>
                        <select
                            {...register('uom')}
                            className="w-full border rounded-full px-4 py-2 bg-white focus:outline-none focus:ring-1"
                            style={{ borderColor: primaryColor + '40' }}
                        >
                            <option value="cm">cm</option>
                            <option value="inch">inch</option>
                            <option value="feet">ft</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Length</label>
                        <input type="number" {...register('length')} className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-1" style={{ borderColor: primaryColor + '40' }} placeholder="" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Width</label>
                        <input type="number" {...register('width')} className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-1" style={{ borderColor: primaryColor + '40' }} placeholder="" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Height</label>
                        <input type="number" {...register('height')} className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-1" style={{ borderColor: primaryColor + '40' }} placeholder="" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-4">
                        <label className="block text-sm text-gray-600 mb-1">Weight</label>
                        <input type="number" {...register('weight')} className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-1" style={{ borderColor: primaryColor + '40' }} placeholder="" />
                    </div>
                    <div className="md:col-span-4">
                        <label className="block text-sm text-gray-600 mb-1">Unit</label>
                        <select
                            {...register('weightUnit')}
                            className="w-full border rounded-full px-4 py-2 bg-white focus:outline-none focus:ring-1"
                            style={{ borderColor: primaryColor + '40' }}
                        >
                            <option value="Kg">Kg</option>
                            <option value="lb">lb</option>
                        </select>
                    </div>
                    <div className="md:col-span-4">
                        <label className="block text-sm text-gray-600 mb-1">Qty</label>
                        <input type="number" {...register('qty')} className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-1" style={{ borderColor: primaryColor + '40' }} placeholder="1" defaultValue={1} />
                    </div>
                </div>
            </div>

            {/* --- RESULTS SECTION --- */}
            <div className="pt-4">
                <h3 className="text-gray-500 font-semibold uppercase tracking-wider mb-6 border-b pb-2 text-sm">Results</h3>

                {/* Highlighted Volume Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-[#FAF8FC] border rounded-2xl p-6 text-center shadow-sm" style={{ borderColor: primaryColor + '30' }}>
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <label className="text-sm font-medium" style={{ color: primaryColor }}>Volume (Cubic Meter)</label>
                            <span className="text-3xl font-serif italic" style={{ color: primaryColor }}>m³</span>
                        </div>
                        <input type="text" readOnly value={cbm.toFixed(4)} className="w-full border rounded-full px-4 py-2 bg-white text-center focus:outline-none" style={{ borderColor: primaryColor + '30' }} />
                    </div>

                    <div className="bg-[#FAF8FC] border rounded-2xl p-6 text-center shadow-sm" style={{ borderColor: primaryColor + '30' }}>
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <label className="text-sm font-medium" style={{ color: primaryColor }}>Volume (Cubic Feet)</label>
                            <span className="text-3xl font-serif italic" style={{ color: primaryColor }}>ft³</span>
                        </div>
                        <input type="text" readOnly value={cft.toFixed(4)} className="w-full border rounded-full px-4 py-2 bg-white text-center focus:outline-none" style={{ borderColor: primaryColor + '30' }} />
                    </div>
                </div>

                {/* 2-Column Result Rows */}
                <div className="space-y-4 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <input type="text" readOnly value={totalWeightKg.toFixed(2)} className="w-full border rounded-full px-4 py-2 bg-[#FBFBFC] focus:outline-none" style={{ borderColor: primaryColor + '20' }} />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Weight (lb)</label>
                            <input type="text" readOnly value={totalWeightLb.toFixed(2)} className="w-full border rounded-full px-4 py-2 bg-[#FBFBFC] focus:outline-none" style={{ borderColor: primaryColor + '20' }} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Volumetric Weight Sea (Kg)</label>
                            <input type="text" readOnly value={volWeightSeaKg.toFixed(2)} className="w-full border rounded-full px-4 py-2 bg-[#FBFBFC] focus:outline-none" style={{ borderColor: primaryColor + '20' }} />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Volumetric Weight Sea (lb)</label>
                            <input type="text" readOnly value={volWeightSeaLb.toFixed(2)} className="w-full border rounded-full px-4 py-2 bg-[#FBFBFC] focus:outline-none" style={{ borderColor: primaryColor + '20' }} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Volumetric Weight Air (Kg)</label>
                            <input type="text" readOnly value={volWeightAirKg.toFixed(2)} className="w-full border rounded-full px-4 py-2 bg-[#FBFBFC] focus:outline-none" style={{ borderColor: primaryColor + '20' }} />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Volumetric Weight Air (lb)</label>
                            <input type="text" readOnly value={volWeightAirLb.toFixed(2)} className="w-full border rounded-full px-4 py-2 bg-[#FBFBFC] focus:outline-none" style={{ borderColor: primaryColor + '20' }} />
                        </div>
                    </div>
                </div>

                {/* 3-Column Container Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">20 Feet Container</label>
                        <input type="text" readOnly value={container20ft.toFixed(2)} className="w-full border rounded-full px-4 py-2 bg-[#FBFBFC] focus:outline-none" style={{ borderColor: primaryColor + '20' }} />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">40 Feet Container</label>
                        <input type="text" readOnly value={container40ft.toFixed(2)} className="w-full border rounded-full px-4 py-2 bg-[#FBFBFC] focus:outline-none" style={{ borderColor: primaryColor + '20' }} />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">40 Feet HC Container</label>
                        <input type="text" readOnly value={container40ftHC.toFixed(2)} className="w-full border rounded-full px-4 py-2 bg-[#FBFBFC] focus:outline-none" style={{ borderColor: primaryColor + '20' }} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdvanceCalculator;
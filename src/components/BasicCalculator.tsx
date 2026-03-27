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

const BasicCalculator: React.FC<{ primaryColor?: string }> = ({ primaryColor = '#5B4099' }) => {
    const { register, control } = useFormContext<FormData>();
    const values = useWatch({ control });

    const length = Number(values.length) || 0;
    const width = Number(values.width) || 0;
    const height = Number(values.height) || 0;
    const qty = Number(values.qty) || 0;
    const uom = values.uom || 'cm';

    // Convert to meters
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

    const inputBorderColor = { borderColor: primaryColor + '40' };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-8">

            {/* --- INPUTS SECTION --- */}
            <div>
                <h3 className="text-gray-500 font-semibold uppercase tracking-wider mb-4 border-b pb-2 text-sm">
                    Inputs
                </h3>

                <div className="grid grid-cols-1 gap-5">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Unit of Measurement</label>
                        <select
                            {...register('uom')}
                            className="w-full border rounded-full px-4 py-2 bg-white focus:outline-none focus:ring-1"
                            style={inputBorderColor}
                        >
                            <option value="cm">cm</option>
                            <option value="inch">inch</option>
                            <option value="feet">ft</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Length</label>
                        <input
                            type="number"
                            {...register('length')}
                            className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-1"
                            placeholder=""
                            style={inputBorderColor}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Width</label>
                        <input
                            type="number"
                            {...register('width')}
                            className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-1"
                            placeholder=""
                            style={inputBorderColor}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Height</label>
                        <input
                            type="number"
                            {...register('height')}
                            className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-1"
                            placeholder=""
                            style={inputBorderColor}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Quantity</label>
                        <input
                            type="number"
                            {...register('qty')}
                            className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-1"
                            placeholder="1"
                            defaultValue={1}
                            style={inputBorderColor}
                        />
                    </div>
                </div>
            </div>

            {/* --- RESULTS SECTION --- */}
            <div className="pt-6">
                <h3 className="text-gray-500 font-semibold uppercase tracking-wider mb-6 border-b pb-2 text-sm">
                    Results
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Cubic Meter Card */}
                    <div className="bg-[#FAF8FC] border rounded-2xl p-6 text-center shadow-sm" style={{ borderColor: primaryColor + '30' }}>
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <label className="text-sm font-medium" style={{ color: primaryColor }}>Cubic Meter (m³)</label>
                            <span className="text-3xl font-serif italic" style={{ color: primaryColor }}>m³</span>
                        </div>
                        <input
                            type="text"
                            readOnly
                            value={cbm.toFixed(4)}
                            className="w-full border rounded-full px-4 py-2 bg-white text-center focus:outline-none"
                            style={{ borderColor: primaryColor + '30' }}
                        />
                    </div>

                    {/* Cubic Feet Card */}
                    <div className="bg-[#FAF8FC] border rounded-2xl p-6 text-center shadow-sm" style={{ borderColor: primaryColor + '30' }}>
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <label className="text-sm font-medium" style={{ color: primaryColor }}>Cubic Feet (ft³)</label>
                            <span className="text-3xl font-serif italic" style={{ color: primaryColor }}>ft³</span>
                        </div>
                        <input
                            type="text"
                            readOnly
                            value={cft.toFixed(4)}
                            className="w-full border rounded-full px-4 py-2 bg-white text-center focus:outline-none"
                            style={{ borderColor: primaryColor + '30' }}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default BasicCalculator;
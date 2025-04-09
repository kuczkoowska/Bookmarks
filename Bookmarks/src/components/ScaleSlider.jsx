import React, { useState, useEffect } from 'react';

const ScaleSlider = ({ scaleValue, setScaleValue, setNumberColumns, setShowScale, color }) => {
    const [tempValue, setTempValue] = useState(() => {
        const savedColumns = localStorage.getItem('numberColumns');
        const initialValue = savedColumns ? parseInt(savedColumns, 10) : 4;
        setNumberColumns(initialValue);
        return initialValue;
    });

    useEffect(() => {
        setNumberColumns(tempValue);
    }, [tempValue, setNumberColumns]);

    const handleCancel = () => {
        const savedColumns = localStorage.getItem('numberColumns');
        const originalValue = savedColumns ? parseInt(savedColumns, 10) : 4;
        setNumberColumns(originalValue);
        setTempValue(originalValue);
        setShowScale(false);
    };

    const handleApply = () => {
        setScaleValue(tempValue);
        setNumberColumns(tempValue);
        localStorage.setItem('numberColumns', tempValue.toString());
        setShowScale(false);
    };

    return (
        <div className={`p-4 px-8 text-${color}`}>
            <div className="relative flex items-center w-full">
                <input
                    type="range"
                    min="4"
                    max="8"
                    step="1"
                    value={tempValue}
                    onChange={(e) => {
                        const newValue = parseInt(e.target.value);
                        setTempValue(newValue);
                    }}
                    className="w-full cursor-pointer"
                />
            </div>
            <div className="flex justify-between text-sm mt-1">
                {[4, 5, 6, 7, 8].map((val) => (
                    <span 
                        key={val} 
                        className={`${tempValue === val ? 'font-bold text-blue-500' : ''}`}
                    >
                        {val}
                    </span>
                ))}
            </div>
            <div className='py-1 px-4 flex justify-between'>
                <button
                    className="mt-4 bg-red-500 text-white py-1 rounded-xl cursor-pointer w-[45%]"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
                <button
                    className="mt-4 bg-blue-500 text-white py-1 rounded-xl cursor-pointer w-[45%]"
                    onClick={handleApply}
                >
                    Apply
                </button>
            </div>
        </div>
    );
};

export default ScaleSlider;
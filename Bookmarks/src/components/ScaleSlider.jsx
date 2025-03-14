import React from 'react';

const ScaleSlider = ({ scaleValue, setScaleValue, setNumberColumns, setShowScale }) => {
    return (
        <div className="fixed top-20 right-4 bg-white p-4 rounded-lg shadow-lg w-56 z-[9999]">
            <h2 className="text-md font-bold text-center mb-2">Change Scale</h2>
            <div className="relative flex items-center w-full">
                <input
                    type="range"
                    min="4"
                    max="8"
                    step="1"
                    value={scaleValue}
                    onChange={(e) => {
                        const newValue = parseInt(e.target.value);
                        setScaleValue(newValue);
                        setNumberColumns(newValue);
                    }}
                    className="w-full cursor-pointer"
                />
            </div>
            <div className="flex justify-between text-sm mt-1">
                {[4, 5, 6, 7, 8].map((val) => (
                    <span key={val} className={`${scaleValue === val ? 'font-bold text-blue-500' : ''}`}>{val}</span>
                ))}
            </div>
            <button
                className="mt-2 bg-blue-500 text-white px-4 py-1 rounded-xl cursor-pointer w-full"
                onClick={() => setShowScale(false)}>
                Apply
            </button>
        </div>
    );
};

export default ScaleSlider;

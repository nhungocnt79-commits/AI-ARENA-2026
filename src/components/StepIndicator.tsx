import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  onSelectStep,
}) => {
  const steps = [
    { number: 1, title: 'Hệ Trang Phục', subtitle: 'Tứ thân / Ngũ thân / Bà ba' },
    { number: 2, title: 'Thiết Kế Áo', subtitle: 'Cổ, cúc, họa tiết & bảng màu' },
    { number: 3, title: 'Phối Quần/Váy', subtitle: 'Phom dáng & màu sắc tối ưu' },
    { number: 4, title: 'Album Phụ Kiện', subtitle: 'Giày → Trang sức → Phụ kiện tóc' },
    { number: 5, title: 'Lookbook Tổng Quan', subtitle: 'Phác thảo, hài hòa & chia sẻ' },
  ];

  return (
    <div className="w-full bg-[#FAF7F2] border-b border-[#E8DEC8] py-3.5 px-4 overflow-x-auto">
      <div className="max-w-5xl mx-auto flex items-center justify-between min-w-[620px] gap-2">
        {steps.map((step, idx) => {
          const isDone = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
            <React.Fragment key={step.number}>
              <button
                onClick={() => onSelectStep(step.number)}
                className={`flex items-center gap-3 text-left py-1.5 px-2.5 rounded-xl transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[#EFE7DC] text-[#2C241E] shadow-2xs'
                    : 'text-[#8C7A6B] hover:text-[#2C241E] hover:bg-[#F5EFE6]'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-colors ${
                    isDone
                      ? 'bg-[#15803D] text-white'
                      : isCurrent
                      ? 'bg-[#9B2C2C] text-white ring-2 ring-[#9B2C2C]/20'
                      : 'bg-[#E5DACB] text-[#6B5A4B]'
                  }`}
                >
                  {isDone ? <Check className="w-3.5 h-3.5" /> : step.number}
                </div>

                <div className="flex flex-col">
                  <span
                    className={`text-xs font-medium tracking-tight whitespace-nowrap ${
                      isCurrent ? 'text-[#2C241E] font-semibold' : 'text-[#6B5A4B]'
                    }`}
                  >
                    {step.title}
                  </span>
                  <span className="text-[10px] text-[#8C7A6B] whitespace-nowrap hidden sm:inline">
                    {step.subtitle}
                  </span>
                </div>
              </button>

              {idx < steps.length - 1 && (
                <div
                  className={`h-[1.5px] flex-1 min-w-[20px] max-w-[40px] rounded-full transition-colors ${
                    currentStep > idx + 1 ? 'bg-[#15803D]' : 'bg-[#E5DACB]'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;

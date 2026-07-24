import { Icon } from "../atoms";
function SubscriptionPlanCard({plan, isSelected, onSelect, isFeatured}) {
return (
    <button
      onClick={() => onSelect(plan.id)}
      className={`w-full rounded-2xl text-left transition-all duration-300 
    ${
        isFeatured
            ? 'bg-[#1A1D3E] border-2 border-[#09147A] shadow-2xl'
            :isSelected
            ? 'bg-[#1A1D3E] border-2 border-[#09147A]'
            : 'bg-[#3D4142] border-2 border-transparent hover:border-white/20'
      }`}
    >
      {/* === MOBILE LAYOUT === */}
      <div className="flex flex-col gap-4 p-5 md:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="crown" className="h-6 w-6" />
            <h3 className="text-lg font-bold text-white">{plan.name}</h3>
          </div>
          <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
            style={{
              borderColor: isSelected ? '#09147A' : '#6B7280',
              backgroundColor: isSelected ? '#09147A' : 'transparent',
            }}
          >
            {isSelected && (
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
              </svg>
            )}
          </div>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-[22px] font-bold text-white">{plan.price}</span>
          <span className="text-sm text-white/50">{plan.period}</span>
        </div>

        <p className="text-sm text-white/70">Akses Tak Terbatas ke Ribuan Film dan Series!</p>

        <ul className="flex flex-col gap-2 mt-1">
          {plan.features.map((f) => (
            <li key={f.text} className="flex items-center gap-3">
              <Icon name={f.icon} className="h-5 w-5 shrink-0" />
              <span className="text-sm text-white/80">{f.text}</span>
            </li>
          ))}
        </ul>

        <button
          className={`w-full mt-4 py-3 rounded-full text-sm font-bold transition ${
            isFeatured || isSelected
            ? 'bg-[#09147A] hover:bg-[#0a17a0]'
            : 'bg-[#2F3334] hover:bg-[#272B2C]'
        }`}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(plan.id);
          }}
        >
          Ubah ke Premium
        </button>
      </div>

      {/* === DESKTOP LAYOUT === */}
      <div className="hidden md:flex items-start justify-between gap-6 p-6 lg:p-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <Icon name="crown" className="h-7 w-7" />
            <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
          </div>

          <p className="text-base text-white/70 mb-5">Akses Tak Terbatas ke Ribuan Film dan Series!</p>

          <ul className="flex flex-col gap-2">
            {plan.features.map((f) => (
              <li key={f.text} className="flex items-center gap-3">
                <Icon name={f.icon} className="h-5 w-5 shrink-0" />
                <span className="text-base text-white/80">{f.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-end gap-4 min-w-50">
          <div className="flex items-center gap-3">
            <span className="text-[28px] font-bold text-white">{plan.price}</span>
            <span className="text-sm text-white/50">{plan.period}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
              style={{
                borderColor: isSelected ? '#09147A' : '#6B7280',
                backgroundColor: isSelected ? '#09147A' : 'transparent',
              }}
            >
              {isSelected && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
              )}
            </div>
          </div>

          <button
            className="w-full py-3 rounded-full text-sm font-bold text-white bg-[#2F3334] hover:bg-[#272B2C] transition"
            onClick={() => onSelect(plan.id)}
          >
            Ubah ke Premium
          </button>
        </div>
      </div>
    </button>
  );
}

export default SubscriptionPlanCard;
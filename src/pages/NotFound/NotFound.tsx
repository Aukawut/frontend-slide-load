import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
      {/* Glow background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
      </div>

      <div className="max-w-xl w-full">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-2xl backdrop-blur-xl px-8 py-10 md:px-10 md:py-12">
          {/* subtle gradient border */}
          <div className="pointer-events-none absolute inset-px rounded-[22px] border border-white/5 bg-linear-to-b from-white/5 via-transparent to-white/0" />

          {/* floating label */}
          <div className="relative inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-slate-900/70 px-3 py-1 text-xs font-medium text-cyan-100 mb-6">
            <span className="inline-block h-2 w-2 rounded-full bg-rose-400 animate-pulse" />
            <span>Oops! Page not found</span>
          </div>

          <div className="relative flex flex-col gap-4 md:gap-5">
            <h1 className="text-6xl md:text-7xl font-semibold tracking-tight">
              <span className="bg-linear-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">
                404
              </span>
            </h1>

            <h2 className="text-2xl md:text-3xl font-semibold text-slate-50">
              Lost in the void.
            </h2>

            <p className="text-sm md:text-base text-slate-300/80 leading-relaxed">
              หน้าที่คุณกำลังค้นหาอาจถูกย้าย ลบไปแล้ว
              หรืออาจจะพิมพ์ลิงก์ผิด ลองกลับไปหน้าแรก
              แล้วเริ่มต้นใหม่อีกครั้งนะครับ 🙂
            </p>

            {/* Info row */}
            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-semibold">
                  404
                </span>
                <span>Resource not found</span>
              </div>
              <span className="hidden md:inline">•</span>
              <span className="flex-1 md:flex-none">
                หากคิดว่าเป็นข้อผิดพลาดของระบบ กรุณาติดต่อผู้ดูแล
              </span>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold
                           bg-linear-to-r from-cyan-400 to-sky-500 text-slate-900
                           shadow-lg shadow-cyan-500/30
                           hover:from-cyan-300 hover:to-sky-400
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/80
                           active:scale-[0.98] transition-transform"
              >
                กลับหน้าแรก
              </button>

              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-medium
                           border border-slate-600/70 bg-slate-900/60 text-slate-200
                           hover:border-slate-400 hover:bg-slate-800/80
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500/80
                           active:scale-[0.98] transition-transform"
              >
                กลับหน้าก่อนหน้า
              </button>
            </div>
          </div>

          {/* corner decoration */}
          <div className="pointer-events-none absolute -right-6 -bottom-6 h-28 w-28 rounded-3xl border border-slate-600/40 bg-slate-900/70 opacity-60 rotate-6" />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

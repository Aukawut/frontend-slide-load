import React, { useEffect, useState } from "react";
import type { PageConfig } from "../../constants/main-types";
import { initialPages } from "../../constants/main-data";
import "./Home.css";

const Home: React.FC = () => {
  const [pages] = useState<PageConfig[]>(initialPages);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [intervalSeconds, setIntervalSeconds] = useState(60); // default 10s
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const iframeContainerRef = React.useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLocked, setIsLocked] = useState(false); // Lock หน้า

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      iframeContainerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleLock = () => {
    setIsLocked((prev) => !prev);
  };

  // Progress bar วิ่งตามเวลาเปลี่ยนหน้า
  useEffect(() => {
    if (!isAutoPlay || isLocked) {
      setProgress(0);
      return;
    }

    setProgress(0);
    const start = Date.now();
    const duration = intervalSeconds * 1000;

    let stopped = false;

    const tick = () => {
      if (stopped) return;

      const elapsed = Date.now() - start;
      const ratio = Math.min(elapsed / duration, 1);
      setProgress(ratio * 100);

      if (ratio < 1 && isAutoPlay && !isLocked) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);

    return () => {
      stopped = true;
    };
  }, [currentIndex, intervalSeconds, isAutoPlay, isLocked]);

  // ตรวจจับเวลาออกจาก fullscreen
  useEffect(() => {
    const handleExit = () => setIsFullscreen(false);
    document.addEventListener("fullscreenchange", handleExit);
    return () => document.removeEventListener("fullscreenchange", handleExit);
  }, []);

  // เปลี่ยนหน้าตามเวลา
  useEffect(() => {
    if (!isAutoPlay || isLocked || pages.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % pages.length);
    }, intervalSeconds * 1000);

    return () => clearInterval(timer);
  }, [isAutoPlay, intervalSeconds, pages.length, isLocked, pages.length]);

  const currentPage = pages[currentIndex];

  const handleSelectPage = (index: number) => {
    setCurrentIndex(index);
  };

  const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!Number.isNaN(value) && value >= 3 && value <= 300) {
      setIntervalSeconds(value);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Bar */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="max-w-8xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-[#00B1C3] flex items-center justify-center text-white font-bold text-lg shadow-sm">
              P
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-slate-900">
                Dashboard
              </h1>
              <p className="text-xs text-slate-500">
                แสดงผลและหมุนหน้า Dashboard / URL ต่าง ๆ แบบอัตโนมัติ
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Interval</span>
              <input
                type="number"
                min={3}
                max={300}
                value={intervalSeconds}
                onChange={handleIntervalChange}
                className="w-20 rounded-xl border border-slate-300 bg-white px-3 py-1 text-sm
                focus:outline-none focus:ring-2 focus:ring-[#00B1C3]"
              />
              <span className="text-xs text-slate-500">วินาที</span>
            </div>

            <button
              onClick={() => setIsAutoPlay((prev) => !prev)}
              disabled={isLocked}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition
              ${
                isAutoPlay && !isLocked
                  ? "bg-[#00B1C3] text-white hover:opacity-90"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              } ${isLocked ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  isAutoPlay && !isLocked ? "bg-emerald-400" : "bg-slate-400"
                }`}
              />
              {isLocked
                ? "ถูกล็อคหน้า"
                : isAutoPlay
                ? "กำลังหมุนอัตโนมัติ"
                : "หยุดหมุนชั่วคราว"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[90%] mx-auto w-full px-4 py-4 flex gap-4">
        {/* Sidebar: Page List */}
        <aside className="w-72 bg-white border border-slate-200 rounded-2xl p-3 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-semibold text-slate-800">Page List</h2>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
              {pages.length} pages
            </span>
          </div>

          <div className="space-y-2 overflow-y-auto pr-1">
            {pages.map((page, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={page.id}
                  onClick={() => handleSelectPage(index)}
                  className={`w-full text-left rounded-xl px-3 py-2 text-sm transition border
                  ${
                    isActive
                      ? "bg-[rgba(0,177,195,0.12)] border-[#00B1C3] text-[#007E8B] shadow-[0_0_0_1px_rgba(0,177,195,0.25)]"
                      : "bg-white border-slate-200 text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium truncate">{page.name}</span>
                    {isActive && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full border
                        ${
                          isLocked
                            ? "bg-amber-100 text-amber-700 border-amber-200"
                            : "bg-[rgba(0,177,195,0.12)] text-[#007E8B] border-[rgba(0,177,195,0.35)]"
                        }`}
                      >
                        {isLocked ? "Locked" : "Active"}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {page.url}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="mt-auto pt-2 border-t border-slate-200 text-[11px] text-slate-500">
            * สามารถกำหนด URL หน้าใหม่ได้จาก config หรือเชื่อมกับ backend
          </div>
        </aside>

        {/* Display Area */}
        <section className="flex-1 flex flex-col gap-3">
          {/* Info Bar */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                หน้าแสดงผลปัจจุบัน
              </h2>
              <p className="text-xs text-slate-600 flex items-center gap-2">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {currentPage?.name || "-"}
                {isLocked && (
                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
                    🔒 Locked
                  </span>
                )}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Lock Button */}
              <button
                onClick={toggleLock}
                className={`text-xs rounded-full border px-3 py-1 flex items-center gap-1 transition
                ${
                  isLocked
                    ? "border-[#00B1C3] bg-[rgba(0,177,195,0.12)] text-[#007E8B]"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span>{isLocked ? "🔓 Unlock" : "🔒 Lock Page"}</span>
              </button>

              <button
                onClick={toggleFullscreen}
                className="text-xs rounded-full border border-slate-300 px-3 py-1 text-slate-700 hover:bg-slate-100"
              >
                {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              </button>

              {currentPage && (
                <a
                  href={currentPage.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs rounded-full border border-slate-300 px-3 py-1 text-slate-700 hover:bg-slate-100"
                >
                  Open in new tab
                </a>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#00B1C3] transition-[width] duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Iframe Container */}
          <div
            ref={iframeContainerRef}
            className="flex-1 bg-white border border-slate-200 rounded-2xl overflow-hidden
            shadow-[0_10px_30px_rgba(0,0,0,0.08)] relative"
          >
            {currentPage ? (
              <iframe
                key={currentPage.id + currentIndex}
                src={currentPage.url}
                title={currentPage.name}
                className="w-full h-full border-0 fade-in-scale"
              />
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500 text-sm">
                ยังไม่มีการตั้งค่า Page
              </div>
            )}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-1">
            {pages.map((_, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={index}
                  onClick={() => handleSelectPage(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    isActive
                      ? "w-6 bg-[#00B1C3]"
                      : "w-2 bg-slate-400 hover:bg-slate-500"
                  }`}
                />
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;

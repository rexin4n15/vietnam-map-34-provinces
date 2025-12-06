import Link from "next/link";
import { getStats } from "@/lib/provinces";
import { CodeBlock } from "@/components/CodeBlock";

export default function HomePage() {
  const stats = getStats();

  return (
    <div className="min-h-screen bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-24">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-sm font-medium mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            Chính thức vận hành từ 1/7/2025
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white to-slate-400">
            Bản đồ Hành chính <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-sky-400 to-blue-500">
              Việt Nam 34 Tỉnh Thành
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Component React tương tác hỗ trợ mô hình <strong>chính quyền 2 cấp</strong> mới.
            Tự động xử lý sáp nhập 63 tỉnh cũ thành <strong>34 đơn vị</strong> và drilldown tới <strong>{stats.totalCommunes.toLocaleString()}</strong> xã/phường.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/demo"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-sky-500 text-white font-semibold shadow-lg shadow-sky-500/25 hover:bg-sky-400 hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all text-center"
            >
              Xem Demo Live
            </Link>
            <Link
              href="/docs/react"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-800/80 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all text-center"
            >
              Tài liệu hướng dẫn
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-t border-white/5 pt-12">
            {[
              { value: stats.total, label: "Tỉnh/TP Mới (từ 63)" },
              { value: "3,321", label: "Đơn vị cấp Xã (từ 10K)" },
              { value: "100%", label: "Mô hình 2 Cấp" },
              { value: "React 18+", label: "Tương thích" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1 px-2">{stat.value}</div>
                <div className="text-sm text-slate-500 uppercase tracking-wider font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <div className="mb-32 grid lg:grid-cols-2 gap-12 items-center">
          <div className="bg-slate-900/50 border border-white/10 rounded-3xl p-8 lg:p-12 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-6">Bối cảnh cải cách hành chính 2025</h3>
            <div className="space-y-4 text-slate-400 leading-relaxed text-justify">
              <p>
                Từ ngày <strong>1/7/2025</strong>, Việt Nam hoàn thành cuộc cải cách lớn nhất lịch sử: chuyển đổi từ mô hình 3 cấp sang <strong>2 cấp (Tỉnh - Xã)</strong>, bãi bỏ hoàn toàn cấp huyện.
              </p>
              <p>
                Toàn bộ <strong>34 tỉnh thành</strong> (giảm từ 63) và <strong>3.321 xã/phường</strong> (giảm từ 10.035) đã chính thức đi vào hoạt động.
                Đây là cuộc cách mạng tinh gọn bộ máy, đưa chính quyền gần dân hơn theo phương châm <em>"Địa phương quyết, địa phương làm, địa phương chịu trách nhiệm"</em>.
              </p>
              <div className="flex gap-4 pt-4">
                <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">46%</div>
                  <div className="text-xs text-green-300/70">Giảm đầu mối Tỉnh</div>
                </div>
                <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400">100%</div>
                  <div className="text-xs text-purple-300/70">Bãi bỏ cấp Huyện</div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-sky-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-slate-950 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                <div className="px-4 py-3 border-b border-white/10 bg-slate-900/50 flex justify-between items-center">
                  <span className="text-xs text-slate-500">Mã nguồn mở & Tự do</span>
                  <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 text-[10px] font-bold">Open Source</span>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-lg mb-2 text-slate-200">Sẵn sàng cho kỷ nguyên mới</h4>
                  <p className="text-slate-400 text-sm mb-4">
                    Thư viện được cập nhật liên tục theo các Nghị quyết của Quốc hội như <strong>NQ 60-NQ/TW</strong> và <strong>QĐ 19/2025</strong>.
                    Dữ liệu bản đồ GeoJSON được tối ưu hóa cho Highcharts, đảm bảo hiệu năng cao cho các dashboard React.
                  </p>
                  <Link href="/provinces" className="text-sky-400 text-sm hover:underline flex items-center gap-1 group/link">
                    Xem danh sách 34 tỉnh thành <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="font-bold text-white mb-1">Luật số 72/2025/QH15</div>
                <div className="text-slate-500">Cơ sở pháp lý cao nhất cho chính quyền 2 cấp.</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="font-bold text-white mb-1">Nghị quyết 203/2025</div>
                <div className="text-slate-500">Sửa đổi Hiến pháp, định hình lại cấu trúc hành chính.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Preview code block - Adjusted text */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-32 bg-slate-900/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Tích hợp Đơn giản</h2>
            <p className="text-slate-400 text-lg">
              Chỉ cần import và truyền data. Thư viện tự động xử lý topology phức tạp,
              logic sáp nhập vùng (theo QĐ 19/2025) và tương tác drilldown đa cấp.
            </p>
            <ul className="space-y-3">
              {[
                "Tự động sáp nhập theo chuẩn QĐ 19/2025",
                "Tích hợp sẵn Drilldown xuống cấp Xã/Phường",
                "Hỗ trợ TypeScript 100%",
                "Tùy biến giao diện (Tooltip, Colors)"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs">✓</div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative group">
            <div className="relative bg-slate-950 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-slate-900/50">
                <span className="text-xs text-slate-500 ml-2">App.tsx</span>
              </div>
              <CodeBlock
                language="tsx"
                code={`import { VietnamMap } from '@xdev-asia/vietnam-map-34-provinces/react';

export default function Dashboard() {
  return (
    <div className="h-[600px] bg-slate-900 rounded-xl">
      <VietnamMap 
        onProvinceClick={(p) => console.log(p)}
        colorAxis={{
          minColor: '#1e293b',
          maxColor: '#0ea5e9'
        }}
      />
    </div>
  );
}`}
              />
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "34 Tỉnh Thành Mới",
              desc: "Địa giới hành chính chính xác theo NQ 60-NQ/TW và QĐ 19/2025. Bao gồm các siêu đô thị sáp nhập như HCM Mới, Hải Phòng Mới.",
              gradient: "from-purple-500/20 to-blue-500/20",
              border: "group-hover:border-purple-500/50"
            },
            {
              title: "Hiệu Năng Cao",
              desc: "Tối ưu hóa GeoJSON trên nền tảng Highcharts, đảm bảo tương tác mượt mà (60fps) ngay cả với 3000+ xã phường.",
              gradient: "from-blue-500/20 to-teal-500/20",
              border: "group-hover:border-sky-500/50"
            },
            {
              title: "Data Drilldown",
              desc: "Tương tác chiều sâu từ Tỉnh -> Xã/Phường. Không cần cấu hình phức tạp, tự động load dữ liệu chi tiết.",
              gradient: "from-teal-500/20 to-green-500/20",
              border: "group-hover:border-teal-500/50"
            }
          ].map((card, i) => (
            <div key={i} className={`group relative p-1 rounded-2xl bg-linear-to-br ${card.gradient} bg-opacity-0 transition-all duration-500`}>
              <div className={`h-full bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-xl p-8 transition-colors ${card.border}`}>
                <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                <p className="text-slate-400 leading-relaxed text-justify">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

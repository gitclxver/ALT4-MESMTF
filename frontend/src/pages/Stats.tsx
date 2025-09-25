import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { ArrowUpIcon, MicroscopeIcon, HeartIcon, BrainIcon, StethoscopeIcon, SkullIcon } from "../utils/icons";



interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  colorClass: string;
}
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  colorClass,
}) => (
  <div className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-6">
    <div
      className={`flex-shrink-0 p-4 rounded-full ${colorClass
        .replace("text", "bg")
        .replace("600", "100")} ${colorClass}`}
    >
      {icon}
    </div>
    <div>
      <p className="text-sm font-semibold text-slate-500">{title}</p>
      <p className="text-4xl font-extrabold text-slate-800">{value}</p>
      {trend && (
        <p className="text-xs text-green-600 font-semibold flex items-center mt-1">
          <ArrowUpIcon /> {trend}
        </p>
      )}
    </div>
  </div>
);

// --- Main Stats Page Component ---
function Stats() {
  return (
    <>
      <Header />
      <div className="bg-slate-50 min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-slate-800">
              Health Statistics Dashboard
            </h1>
            <p className="mt-2 text-lg text-slate-600">
              Overview of Malaria and Typhoid cases from system data.
            </p>
          </div>

          {/* Key Metrics Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <StatCard
              title="Total Malaria Cases"
              value="1,284"
              icon={<MicroscopeIcon />}
              trend="+5% this month"
              colorClass="text-orange-600"
            />
            <StatCard
              title="Total Typhoid Cases"
              value="892"
              icon={<MicroscopeIcon />}
              trend="+8% this month"
              colorClass="text-red-600"
            />
            <StatCard
              title="Total Recoveries"
              value="2,015"
              icon={<HeartIcon />}
              colorClass="text-green-600"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Diagnosis Breakdown */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                Diagnosis Source
              </h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 text-purple-600 rounded-full mr-4">
                    <BrainIcon />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-700">
                      AI Preliminary Diagnoses
                    </p>
                    <div className="w-full bg-slate-200 rounded-full h-2.5 mt-1">
                      <div
                        className="bg-purple-500 h-2.5 rounded-full"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </div>
                  <p className="ml-4 text-lg font-bold text-slate-800">1,629</p>
                </div>
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-full mr-4">
                    <StethoscopeIcon />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-700">
                      Doctor Confirmed Diagnoses
                    </p>
                    <div className="w-full bg-slate-200 rounded-full h-2.5 mt-1">
                      <div
                        className="bg-blue-500 h-2.5 rounded-full"
                        style={{ width: "92%" }}
                      ></div>
                    </div>
                  </div>
                  <p className="ml-4 text-lg font-bold text-slate-800">2,011</p>
                </div>
              </div>
            </div>

            {/* Outcomes */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                Patient Outcomes
              </h2>
              <div className="grid grid-cols-2 gap-6 text-center">
                <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-5xl font-bold text-green-600">2,015</p>
                  <p className="mt-2 text-slate-600 font-semibold">Recovered</p>
                </div>
                <div className="p-6 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex justify-center text-red-600">
                    <SkullIcon />
                  </div>
                  <p className="text-5xl font-bold text-red-600 mt-2">161</p>
                  <p className="mt-2 text-slate-600 font-semibold">Deaths</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Stats;
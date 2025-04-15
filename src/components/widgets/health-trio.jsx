import {
  getDateRangeText,
  getSleepData,
  getWaterData,
  getWeightData,
  sleepChartColors,
  waterChartColors,
} from "./health-trio.data.js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useDateRangeStore from "@/store/date-range-store";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function HealthTrio() {
  const today = new Date();
  const dateRange = useDateRangeStore((state) => state.dateRange);

  const formattedDate = getDateRangeText(dateRange, today);

  const weight = getWeightData(dateRange);

  const water = getWaterData(dateRange);

  const sleepData = getSleepData(dateRange);

  return (
    <Card className="grow overflow-y-auto">
      <CardHeader>
        <CardTitle>Health Overview</CardTitle>
        <CardDescription>{formattedDate}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Weight Section */}
        <div className="space-y-2 rounded-lg bg-bg-weak-50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-label-md font-medium">Weight</h3>
            </div>
            <span className="text-label-md font-medium">
              {weight.current} {weight.unit}
            </span>
          </div>

          <div className="relative h-16 w-full">
            {/* Scale Visualization */}
            <div className="absolute inset-0 flex flex-col items-center">
              {/* Weight Numbers */}
              <div className="text-sm mb-2 flex w-full justify-between text-text-sub-600">
                {weight.range.map((value) => (
                  <span
                    key={value}
                    className={
                      value === weight.current
                        ? "font-semibold text-neutral-900"
                        : ""
                    }
                  >
                    {value}
                  </span>
                ))}
              </div>

              {/* Scale Line */}
              <div className="relative h-8 w-full">
                <div className="bg-bg- absolute inset-0 top-1/2 h-[1px]"></div>

                {/* Tick Marks */}
                {weight.range.map((value, index) => {
                  const position = (index / (weight.range.length - 1)) * 100;
                  return (
                    <div
                      key={value}
                      className="absolute top-0 h-2 w-[1px] bg-neutral-400"
                      style={{ left: `${position}%` }}
                    ></div>
                  );
                })}

                {/* Small Tick Marks */}
                {Array.from({ length: (weight.range.length - 1) * 5 }).map(
                  (_, index) => {
                    const position =
                      (index / ((weight.range.length - 1) * 5)) * 100;
                    return (
                      <div
                        key={index}
                        className="absolute top-0 h-1 w-[1px] bg-neutral-300"
                        style={{ left: `${position}%` }}
                      ></div>
                    );
                  },
                )}

                {/* Current Weight Indicator */}
                <div
                  className="absolute top-1/2 h-8 w-[2px] -translate-y-1/2 bg-neutral-900"
                  style={{
                    left: `${((weight.current - weight.range[0]) / (weight.range[weight.range.length - 1] - weight.range[0])) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Water and Sleep Section - Side by Side */}
        <div className="flex gap-4">
          {/* Water Section */}
          <div className="w-1/2 rounded-lg bg-bg-weak-50 p-4">
            <h3 className="mb-4 text-label-md font-medium">Water</h3>

            <div className="flex flex-col items-center">
              {dateRange === "today" ? (
                <>
                  {/* Water Bottle Visualization for Today */}
                  <div className="relative mb-2 h-36 w-20">
                    <svg
                      className="absolute inset-0 h-full w-full scale-125"
                      viewBox="0 0 512 512"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Existing SVG path code */}
                      <path
                        d="M231.222 16.0811C241.108 15.6334 251.141 15.9789 261.044 15.9787C267.231 15.9786 274.562 15.5041 280.603 16.1004C282.068 16.245 283.415 16.6317 284.658 17.4361C286.351 18.5315 287.473 20.1875 287.838 22.173Q287.916 22.5954 287.95 23.0235Q287.984 23.4516 287.975 23.881Q287.966 24.3104 287.913 24.7366Q287.86 25.1628 287.764 25.5814Q287.667 26.0001 287.529 26.4067Q287.391 26.8134 287.212 27.2039Q287.033 27.5943 286.816 27.9646Q286.598 28.3349 286.344 28.6811C284.761 30.823 282.731 31.7314 280.193 32.1719C279.913 34.9435 280.071 37.8358 280.062 40.6226Q279.984 48.31 280.17 55.9954C287.851 55.8042 295.628 55.8353 303.311 55.9738C309.864 56.092 316.55 58.2585 321.17 63.0903C327.642 69.861 328.053 76.3862 328.078 85.2814Q328.112 90.9847 328.024 96.6875C336.111 98.7712 342.74 102.129 348.705 108.038C356.74 115.998 360.006 126.612 360.085 137.69L360.063 151.404C360.08 155.101 360.262 158.903 359.927 162.588C359.081 171.923 354.68 180.761 347.193 186.534C342.677 190.017 336.843 191.742 332.859 195.851C329.854 198.95 328.101 203.027 328.208 207.375C328.61 223.855 340.309 222.526 349.74 231.575C356.925 238.468 359.918 247.183 360.078 256.985C360.342 273.164 360.046 289.393 360.055 305.578L360.064 400.875L360.062 442.007C360.045 448.61 360.669 455.808 359.571 462.308Q359.313 463.833 358.94 465.333Q358.566 466.834 358.08 468.301Q357.594 469.769 356.997 471.196Q356.401 472.622 355.697 474Q354.994 475.377 354.188 476.696Q353.382 478.016 352.478 479.27Q351.574 480.525 350.578 481.707Q349.581 482.889 348.497 483.992Q347.878 484.628 347.231 485.235Q346.585 485.843 345.912 486.422Q345.239 487 344.541 487.549Q343.843 488.097 343.122 488.614Q342.401 489.131 341.658 489.616Q340.914 490.1 340.15 490.551Q339.386 491.003 338.603 491.42Q337.819 491.837 337.019 492.219Q336.218 492.601 335.401 492.948Q334.584 493.294 333.752 493.604Q332.921 493.914 332.076 494.187Q331.232 494.46 330.376 494.695Q329.521 494.931 328.655 495.128Q327.79 495.325 326.917 495.484Q326.044 495.643 325.165 495.763Q324.286 495.884 323.402 495.965C318.744 496.363 313.918 496.094 309.237 496.114C300.626 496.151 292.016 496.021 283.405 496.132L214.886 496.099L196.397 496.111C192.478 496.082 188.239 496.212 184.386 495.473C178.191 494.286 171.491 491.114 166.707 486.998C157.776 479.315 152.881 469.995 152.099 458.217C151.845 454.392 151.991 450.506 151.993 446.672L152.001 427.75L152.001 368.058L151.999 292.588C151.999 279.423 151.537 266.108 152.105 252.968C152.22 250.301 152.597 247.809 153.513 245.293C156.409 237.338 161.864 230.404 169.346 226.328C173.159 224.251 176.807 222.557 179.703 219.212C182.833 215.597 184.253 211.093 183.859 206.327C183.653 203.842 182.863 201.57 181.619 199.418C177.185 191.753 170.2 191.211 163.589 185.586C157.579 180.474 152.842 172.408 152.205 164.448C151.729 158.497 152.016 152.421 152.006 146.453C151.996 140.64 151.57 134.383 152.469 128.637C154.147 117.919 162.195 107.125 171.403 101.632C172.853 100.767 183.308 96.3024 183.492 96.0508C186.346 92.1502 179.449 76.2111 189.907 64.1614C196.601 56.448 203.544 55.9478 213.077 55.9613C219.148 55.9699 225.455 56.3396 231.497 55.8446L231.932 55.807Q232.053 44.0644 231.979 32.3214C230.706 32.1112 229.448 31.9287 228.32 31.2621C226.304 30.0698 224.69 28.0934 224.189 25.7776C223.71 23.5557 224.157 21.1015 225.488 19.247C226.941 17.2212 228.886 16.5102 231.222 16.0811Z"
                        fill="#000000"
                        stroke="#000000"
                        strokeWidth="1"
                      />
                      <path
                        d="M318.811 479.86C326.993 479.195 332.656 478.032 338.266 471.465C340.946 468.327 342.821 464.476 343.336 460.367C344.709 449.413 344.012 436.051 344.008 424.788L344.005 363.633L343.998 291.989L344.009 269.152C344.009 264.249 344.166 259.282 343.757 254.393C343.345 249.449 341.306 245.666 337.497 242.509C334.335 239.888 330.535 238.432 327.068 236.306C318.488 231.044 313.138 221.223 312.161 211.369Q312.078 210.531 312.036 209.69Q311.994 208.849 311.994 208.007Q311.993 207.164 312.034 206.323Q312.075 205.482 312.157 204.644Q312.239 203.806 312.363 202.973Q312.486 202.14 312.65 201.314Q312.814 200.488 313.019 199.671Q313.223 198.854 313.468 198.048Q313.712 197.242 313.996 196.449Q314.28 195.656 314.602 194.878Q314.925 194.1 315.285 193.339Q315.645 192.578 316.043 191.835Q316.44 191.093 316.873 190.371Q317.306 189.649 317.775 188.949Q318.243 188.249 318.745 187.573Q319.247 186.897 319.782 186.246C324.032 181.076 328.909 178.788 334.603 175.597C345.027 169.757 344.028 159.786 344.008 149.365C343.997 144.116 344.238 138.702 343.751 133.472C343.182 127.36 339.901 121.383 335.167 117.48C331.72 114.637 327.378 112.993 322.976 112.382C317.638 111.641 311.874 112.075 306.48 112.109L281.157 112.112L223.862 112.117C213.514 112.116 203.136 111.937 192.791 112.123C185.355 112.734 178.741 114.555 173.763 120.433C166.906 128.529 168.023 139.679 168.083 149.569C168.106 153.411 167.816 157.353 168.147 161.173C168.56 165.931 170.654 170.509 174.388 173.588C177.128 175.847 180.486 176.954 183.475 178.788C192.039 184.045 198.733 193.356 199.778 203.501C200.713 212.574 198.736 221.836 192.864 228.965C190.32 232.054 187.23 234.908 183.864 237.082C177.806 240.993 172.266 242.003 169.435 249.599C168.501 252.105 168.159 254.836 168.062 257.496C167.903 261.839 168.062 266.229 168.074 270.577L168.08 294.43L168.069 376.741L168.075 432.117C168.096 440.494 167.516 450.371 168.253 458.536C168.801 464.603 172.085 470.656 176.808 474.502Q177.456 475.022 178.139 475.496Q178.821 475.97 179.534 476.396Q180.247 476.823 180.987 477.2Q181.727 477.577 182.492 477.903Q183.256 478.229 184.041 478.502Q184.825 478.775 185.627 478.994Q186.428 479.212 187.243 479.376Q188.057 479.54 188.881 479.648C195.858 480.565 203.423 479.981 210.48 479.969L249.192 479.971L295.734 479.968C302.848 479.969 311.814 480.463 318.634 479.89C318.693 479.885 318.752 479.87 318.811 479.86Z"
                        fill="#47C2FF"
                        style={{
                          clipPath: `polygon(0% ${100 - water.percentage}%, 100% ${100 - water.percentage}%, 100% 100%, 0% 100%)`,
                        }}
                      />
                    </svg>
                  </div>

                  {/* Water Info for Today */}
                  <div className="text-center">
                    <div className="font-medium">
                      {water.current} ml ({water.percentage}%)
                    </div>
                    <div className="text-xs text-text-sub-600">
                      Out of {water.goal} ml
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Water Bar Chart for Other Date Ranges */}
                  <div className="h-36 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={water.history}
                        margin={{ top: 5, right: 5, left: 5, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                          dataKey={
                            dateRange === "this-week"
                              ? "day"
                              : dateRange === "this-month"
                                ? "week"
                                : "month"
                          }
                          tick={{ fontSize: 10 }}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis hide />
                        <Tooltip
                          formatter={(value) => [`${value} ml`, "Water"]}
                          labelFormatter={(label) => `${label}`}
                        />
                        <Bar
                          dataKey="amount"
                          fill={waterChartColors.fill}
                          radius={waterChartColors.radius}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Water Info for Other Date Ranges */}
                  <div className="mt-2 text-center">
                    <div className="font-medium">
                      {water.current} ml (avg. {water.percentage}%)
                    </div>
                    <div className="text-xs text-text-sub-600">
                      Out of {water.goal} ml daily goal
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Sleep Section */}
          <div className="w-1/2 rounded-lg bg-bg-weak-50 p-4">
            <h3 className="mb-4 text-label-md font-medium">Sleep</h3>

            <div className="h-36">
              {/* Sleep Chart using Recharts */}
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={sleepData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 20 }}
                  stackId="1"
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey={
                      dateRange === "today"
                        ? "time"
                        : dateRange === "this-week"
                          ? "day"
                          : dateRange === "this-month"
                            ? "week"
                            : "month"
                    }
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    formatter={(value, name) => {
                      const labels = {
                        deepSleep: sleepChartColors.deepSleep.label,
                        rem: sleepChartColors.rem.label,
                        lightSleep: sleepChartColors.lightSleep.label,
                        awake: sleepChartColors.awake.label,
                      };
                      return [`${value} min`, labels[name]];
                    }}
                  />
                  <defs>
                    <linearGradient
                      id="deepSleepGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#22c55e"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                    <linearGradient
                      id="remGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#f97316"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                    <linearGradient
                      id="lightSleepGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#facc15" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#facc15"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                    <linearGradient
                      id="awakeGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#a78bfa"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="deepSleep"
                    stackId="1"
                    stroke={sleepChartColors.deepSleep.stroke}
                    fill={sleepChartColors.deepSleep.fill}
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="rem"
                    stackId="1"
                    stroke={sleepChartColors.rem.stroke}
                    fill={sleepChartColors.rem.fill}
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="lightSleep"
                    stackId="1"
                    stroke={sleepChartColors.lightSleep.stroke}
                    fill={sleepChartColors.lightSleep.fill}
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="awake"
                    stackId="1"
                    stroke={sleepChartColors.awake.stroke}
                    fill={sleepChartColors.awake.fill}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>

              {/* Sleep Legend */}
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[10px]">
                <div className="flex items-center gap-1">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: sleepChartColors.deepSleep.legendColor,
                    }}
                  ></div>
                  <span>{sleepChartColors.deepSleep.label}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: sleepChartColors.rem.legendColor,
                    }}
                  ></div>
                  <span>{sleepChartColors.rem.label}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: sleepChartColors.lightSleep.legendColor,
                    }}
                  ></div>
                  <span>{sleepChartColors.lightSleep.label}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: sleepChartColors.awake.legendColor,
                    }}
                  ></div>
                  <span>{sleepChartColors.awake.label}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

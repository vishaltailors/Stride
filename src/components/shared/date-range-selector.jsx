import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useDateRangeStore from "@/store/date-range-store";

export const dateRangeOptions = [
  {
    label: "Today",
    value: "today",
  },
  {
    label: "This Week",
    value: "this-week",
  },
  {
    label: "This Month",
    value: "this-month",
  },
  {
    label: "This Year",
    value: "this-year",
  },
];

export default function DateRangeSelector({ className = "w-auto min-w-32", align = "end", onChange }) {
  const dateRange = useDateRangeStore((state) => state.dateRange);
  const setDateRange = useDateRangeStore((state) => state.setDateRange);
  
  // Handle date range change
  const handleDateRangeChange = (value) => {
    setDateRange(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Select
      defaultValue="today"
      onValueChange={handleDateRangeChange}
      value={dateRange}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder="Select a date range" />
      </SelectTrigger>
      <SelectContent align={align}>
        {dateRangeOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

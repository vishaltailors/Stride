import ProfileImage from "@/assets/images/avatar.png";
import {
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageHeaderInfo,
  PageIcon,
  PageQuickActions,
  PageTitle,
} from "@/components/shared/page-header";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button, ButtonIcon } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useDateRangeStore from "@/store/date-range-store";
import {
  RiBringForward,
  RiCheckLine,
  RiNotification2Line,
  RiSearch2Line,
} from "@remixicon/react";

export default function Header({ isDraggable, setIsDraggable }) {
  const dateRange = useDateRangeStore((state) => state.dateRange);
  const setDateRange = useDateRangeStore((state) => state.setDateRange);
  const options = [
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

  return (
    <PageHeader>
      <PageHeaderContent>
        <PageIcon as={Avatar} className="p-0" color="blue">
          <AvatarImage src={ProfileImage} />
        </PageIcon>
        <PageHeaderInfo>
          <PageTitle>
            <span>Vishal Tailor</span>
          </PageTitle>
          <PageDescription>Welcome back! 👋🏻</PageDescription>
        </PageHeaderInfo>
      </PageHeaderContent>
      <PageQuickActions>
        <Button variant="neutral" mode="ghost">
          <ButtonIcon as={RiSearch2Line} />
        </Button>
        <Button variant="neutral" mode="ghost">
          <ButtonIcon as={RiNotification2Line} />
        </Button>
        <Select
          defaultValue="today"
          onValueChange={setDateRange}
          value={dateRange}
        >
          <SelectTrigger className="w-auto min-w-32">
            <SelectValue placeholder="Select a date range" />
          </SelectTrigger>
          <SelectContent align="end">
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="neutral"
          mode="stroke"
          onClick={() => setIsDraggable(!isDraggable)}
        >
          <ButtonIcon as={isDraggable ? RiCheckLine : RiBringForward} />
          {isDraggable ? "Confirm Current Positions" : "Organize Widgets"}
        </Button>
      </PageQuickActions>
    </PageHeader>
  );
}

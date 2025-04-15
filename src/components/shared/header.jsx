import ProfileImage from "@/assets/images/avatar.png";
import DateRangeSelector from "@/components/shared/date-range-selector";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  RiBringForward,
  RiCheckLine,
  RiFootprintLine,
  RiHeartPulseLine,
  RiMedalLine,
  RiNotification2Line,
  RiRunLine,
} from "@remixicon/react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useState } from "react";

function NotificationItem({
  icon: Icon,
  title,
  time,
  iconColor = "text-gray-400",
  onClick,
}) {
  return (
    <div
      className="hover:bg-bg-soft-100 flex cursor-pointer items-start gap-3 p-4 transition-colors"
      onClick={onClick}
    >
      <div className={`mt-1 ${iconColor}`}>
        {/* Using the Icon component passed as prop */}
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <p className="text-paragraph-sm">{title}</p>
        <p className="text-text-soft-500 text-paragraph-xs">{time}</p>
      </div>
    </div>
  );
}

export default function Header({ isDraggable, setIsDraggable }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [hasNotifications, setHasNotifications] = useState(true);

  const handleNotificationClick = () => {
    setHasNotifications(false);
  };

  return (
    <PageHeader>
      <PageHeaderContent>
        <SidebarTrigger />
        <PageIcon as={Avatar} className="p-0" color="blue">
          <AvatarImage src={ProfileImage} />
        </PageIcon>
        {!isMobile && (
          <PageHeaderInfo>
            <PageTitle>
              <span>Vishal Tailor</span>
            </PageTitle>
            <PageDescription>Welcome back! 👋🏻</PageDescription>
          </PageHeaderInfo>
        )}
      </PageHeaderContent>
      <PageQuickActions>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="neutral" mode="ghost" className="relative">
              <ButtonIcon as={RiNotification2Line} />
              {hasNotifications && (
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary-base"></span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[320px] !p-0" align="end">
            <div className="flex flex-col divide-y divide-stroke-soft-200">
              <div className="flex items-center justify-between p-4">
                <h3 className="text-label-sm font-medium">Notifications</h3>
              </div>

              <NotificationItem
                icon={RiRunLine}
                title="New workout recorded: 5K Morning Run"
                time="1:27 PM"
                iconColor="text-blue-500"
                onClick={() => handleNotificationClick()}
              />

              <NotificationItem
                icon={RiHeartPulseLine}
                title="Heart rate goal achieved today!"
                time="1:27 PM"
                iconColor="text-red-500"
                onClick={() => handleNotificationClick()}
              />

              <NotificationItem
                icon={RiFootprintLine}
                title="You've reached 8,000 steps today"
                time="1:27 PM"
                iconColor="text-green-500"
                onClick={() => handleNotificationClick()}
              />

              <NotificationItem
                icon={RiMedalLine}
                title="Weekly distance goal completed"
                time="1:27 PM"
                iconColor="text-amber-500"
                onClick={() => handleNotificationClick()}
              />
            </div>
          </PopoverContent>
        </Popover>
        <DateRangeSelector />
        {!isMobile && (
          <Button
            variant="neutral"
            mode="stroke"
            onClick={() => setIsDraggable(!isDraggable)}
          >
            <ButtonIcon as={isDraggable ? RiCheckLine : RiBringForward} />
            {isDraggable ? "Confirm Current Positions" : "Organize Widgets"}
          </Button>
        )}
      </PageQuickActions>
    </PageHeader>
  );
}

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
import DateRangeSelector from "@/components/shared/date-range-selector";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button, ButtonIcon } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  RiBringForward,
  RiCheckLine,
  RiNotification2Line,
  RiSearch2Line,
} from "@remixicon/react";
import { useMediaQuery } from "@uidotdev/usehooks";

export default function Header({ isDraggable, setIsDraggable }) {
  const isMobile = useMediaQuery("(max-width: 768px)");

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
        <Button variant="neutral" mode="ghost">
          <ButtonIcon as={RiSearch2Line} />
        </Button>
        <Button variant="neutral" mode="ghost">
          <ButtonIcon as={RiNotification2Line} />
        </Button>
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

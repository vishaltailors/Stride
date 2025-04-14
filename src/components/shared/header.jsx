import ProfileImage from "@/assets/images/avatar.png";
import {
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageHeaderInfo,
  PageIcon,
  PageTitle,
} from "@/components/shared/page-header";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default async function Header() {
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
    </PageHeader>
  );
}

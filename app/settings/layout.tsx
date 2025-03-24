import { Separator } from "../../components/ui/separator";
import { SidebarNav } from "../../components/settings/sidebar-nav";

const sidebarNavItems = [
  {
    title: "Account",
    href: "/settings/account",
  },
  {
    title: "Preferences",
    href: "/settings/preferences",
  },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6 md:flex md:space-y-0 md:space-x-6">
        <aside className="md:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <Separator orientation="vertical" className="hidden md:block" />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

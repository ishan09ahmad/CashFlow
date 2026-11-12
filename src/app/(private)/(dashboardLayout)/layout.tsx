import DashboardLayout from "@/components/layouts/DashboardLayout/page";


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
// app/admin/layout.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/sign-in");
  }

  return (
    <div className="flex">
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}

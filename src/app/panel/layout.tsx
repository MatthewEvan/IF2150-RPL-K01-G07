import { redirect } from "next/navigation";
import NavbarPanel from "@/components/layout/NavbarPanel";
import { cariAkun } from "@/lib/models/akun";
import { buatClientServer } from "@/lib/supabase/server";

export default async function PanelLayout({ children }: LayoutProps<"/panel">) {
  const supabase = await buatClientServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const akun = user ? await cariAkun(supabase, user.id) : null;
  if (!akun) redirect("/masuk");

  return (
    <>
      <NavbarPanel peran={akun.peran} />
      <main className="mx-auto w-full max-w-280 flex-1 px-5 py-6">
        {children}
      </main>
    </>
  );
}

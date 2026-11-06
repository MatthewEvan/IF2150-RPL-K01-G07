import NavbarPanel from "@/components/layout/NavbarPanel";

export default function PanelLayout({ children }: LayoutProps<"/panel">) {
  return (
    <>
      <NavbarPanel />
      <main className="mx-auto w-full max-w-280 flex-1 px-5 py-6">
        {children}
      </main>
    </>
  );
}

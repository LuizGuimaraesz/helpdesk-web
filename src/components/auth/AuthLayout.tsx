import { Outlet } from "react-router-dom";
import NavHeader from "../../assets/NavHeader.svg";

export function AuthLayout() {
  return (
    <main className="bg-page relative min-h-dvh overflow-hidden">
      <img
        src="/assets/login-background.png"
        alt=""
        className="pointer-events-none absolute inset-0 size-full object-cover"
      />
      <div
        className="bg-page pointer-events-none absolute inset-0 hidden mix-blend-screen lg:block"
        aria-hidden="true"
      />

      <section className="bg-surface absolute inset-0 top-9 flex flex-col items-center gap-8 overflow-y-auto rounded-t-[20px] px-5 py-10 sm:px-12 sm:py-12 lg:top-[20px] lg:left-auto lg:w-[680px] lg:rounded-tr-none lg:px-[140px]">
        <img src={NavHeader} alt="HelpDesk" />
        <Outlet />
      </section>
    </main>
  );
}

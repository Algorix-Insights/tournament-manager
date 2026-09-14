import { NavLink, Outlet, useLocation } from "react-router";
import { Gamepad2, LayoutDashboard, Search, Trophy, UsersRound } from "lucide-react";
import logoGameSpace from "@/assets/logo-game-space.png";

const navigation = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/players", label: "Jugadores", icon: UsersRound },
  { to: "/games", label: "Videojuegos", icon: Gamepad2 },
  { to: "/scores", label: "Clasificación", icon: Trophy },
];

export default function AppLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#f7f6f8] font-manrope-regular text-[#111827]">
      <header className="sticky top-0 z-50 w-full bg-[#f7f6f8] px-3 py-4 sm:px-6 sm:py-5 lg:px-8">
        <nav aria-label="Navegación principal" className="mx-auto flex min-h-16 w-full items-center gap-4 sm:gap-7">
          <NavLink to="/dashboard" aria-label="Ir al inicio" className="shrink-0 px-1 sm:px-2">
            <img className="h-auto w-36 sm:w-40" src={logoGameSpace} alt="GameSpace" />
          </NavLink>

          <label className="bg-[#e9ecef] rounded-full hidden min-w-40 flex-1 items-center gap-2 px-2 py-2.5 text-sm text-[#8f929b] md:flex lg:max-w-100">
            <Search className="size-4 shrink-0" aria-hidden="true" />
            <input className="min-w-0 w-full bg-transparent outline-none placeholder:text-[#8f929b]" placeholder="Buscar participante" aria-label="Buscar participante" />
          </label>

          <div className="flex min-w-0 flex-1 items-center justify-end gap-1 overflow-x-auto sm:gap-2">
            {navigation.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} className={({ isActive }) => `flex shrink-0 items-center justify-center gap-2 rounded-full px-3 py-3 text-sm transition-colors sm:px-5 ${isActive ? "bg-[#684bf3] font-manrope-semibold text-white" : "text-[#5f6470] hover:bg-[#f1eefb] hover:text-[#684bf3]"}`}>
                <Icon className="size-4 sm:hidden" aria-hidden="true" />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      <main>
        <div key={location.pathname} className="route-enter">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
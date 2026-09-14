import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { Gamepad2, LayoutDashboard, Search, Trophy, UsersRound } from "lucide-react";
import logoGameSpace from "@/assets/logo-game-space.png";
import { usePlayerSearch } from "@/features/players/hooks/usePlayerSearch";

const navigation = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/players", label: "Jugadores", icon: UsersRound },
  { to: "/games", label: "Videojuegos", icon: Gamepad2 },
  { to: "/scores", label: "Clasificación", icon: Trophy },
];

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const playerSearch = usePlayerSearch(debouncedSearch);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebouncedSearch(search), 300);
    return () => window.clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!searchContainerRef.current?.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const showSearchResults = isSearchFocused && debouncedSearch.trim().length >= 2;
  const selectPlayer = () => {
    navigate(`/players?search=${encodeURIComponent(search.trim())}`);
    setSearch("");
    setIsSearchFocused(false);
  };

  return (
    <div className="min-h-screen bg-[#f7f6f8] font-manrope-regular text-[#111827]">
      <header className="sticky top-0 z-50 w-full bg-[#f7f6f8] px-3 py-4 sm:px-6 sm:py-5 lg:px-8">
        <nav aria-label="Navegación principal" className="mx-auto flex min-h-16 w-full items-center gap-4 sm:gap-7">
          <NavLink to="/dashboard" aria-label="Ir al inicio" className="shrink-0 px-1 sm:px-2">
            <img className="h-auto w-36 sm:w-40" src={logoGameSpace} alt="GameSpace" />
          </NavLink>

          <div ref={searchContainerRef} className="relative hidden min-w-40 flex-1 md:block lg:max-w-100">
            <label className="flex items-center gap-2 rounded-full bg-[#e9ecef] px-2 py-2.5 text-sm text-[#8f929b]">
              <Search className="size-4 shrink-0" aria-hidden="true" />
              <input
                className="min-w-0 w-full bg-transparent outline-none placeholder:text-[#8f929b]"
                placeholder="Buscar participante"
                aria-label="Buscar participante"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onFocus={() => setIsSearchFocused(true)}
              />
            </label>

            {showSearchResults && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl bg-white p-2 shadow-lg ring-1 ring-black/5">
                {playerSearch.isFetching && <p className="px-3 py-2 text-sm text-[#8f929b]">Buscando...</p>}
                {!playerSearch.isFetching && playerSearch.data?.data.length === 0 && (
                  <p className="px-3 py-2 text-sm text-[#8f929b]">No se encontraron jugadores.</p>
                )}
                {!playerSearch.isFetching && playerSearch.data?.data.map((player) => (
                  <button
                    key={player.id}
                    type="button"
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-[#f1eefb]"
                    onClick={selectPlayer}
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#d9cffb] text-xs">
                      {player.name.charAt(0)}
                    </span>
                    <span className="min-w-0">
                      <strong className="block truncate text-sm text-[#111827]">{player.name}</strong>
                      <small className="block truncate text-xs text-[#8f929b]">@{player.gamertag}</small>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

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
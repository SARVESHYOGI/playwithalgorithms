"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import { MdComputer, MdLightMode, MdDarkMode } from "react-icons/md";

const themes = [
  { value: "system", label: "System", icon: MdComputer },
  { value: "light", label: "Light", icon: MdLightMode },
  { value: "dark", label: "Dark", icon: MdDarkMode },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!mounted) return null;

  const activeTheme = themes.find((t) => t.value === theme) || themes[0];

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center space-x-2 rounded-lg border border-background-100 bg-background-100 px-3 py-2 text-sm font-medium text-background-700 
                   shadow-sm transition hover:bg-background-200 
                   focus:outline-none focus:ring-2 focus:ring-background"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Select theme"
        type="button"
      >
        <activeTheme.icon className="text-xl" />
      </button>

      {open && (
        <div className="absolute left-0  mt-2 origin-top-right rounded-lg bg-background-100 shadow-lg ring-1 ring-black ring-opacity-5 transition transform scale-95 opacity-0 animate-fadeIn z-20">
          <div className="py-1">
            {themes.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => {
                  setTheme(value);
                  setOpen(false);
                }}
                className={`flex items-center space-x-2 px-4 w-24 py-2 text-sm transition 
                           hover:bg-background-200  rounded-md
                           ${
                             theme === value
                               ? "bg-background-50 font-semibold"
                               : ""
                           }`}
                type="button"
              >
                <Icon className="text-lg" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

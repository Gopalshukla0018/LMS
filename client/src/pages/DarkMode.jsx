import { Moon, Sun } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/ThemeProvider";
const DarkMode = () => {
  // `setTheme` ke saath `theme` bhi lein taaki pata chale current theme kaun sa hai
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    // Agar current theme 'light' hai to 'dark' kar do, warna 'light' kar do
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    // Dropdown ki jagah ek simple Button
    <Button onClick={toggleTheme} variant="outline" size="icon">
      {/* Conditional rendering: Agar theme dark hai to Suraj, nahi to Chand dikhao */}
      {theme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default DarkMode;
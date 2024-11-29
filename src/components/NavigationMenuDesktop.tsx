import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from '../contexts/AuthContext';
import { IoLogOutOutline } from "react-icons/io5";

export function NavigationMenuDesktop() {
  const { logout } = useAuth();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
            Meu perfil
          </NavigationMenuTrigger>
          <NavigationMenuContent className="gap-y-2">
            <NavigationMenuLink href="/update-profile">
              Atualizar
            </NavigationMenuLink>
            <NavigationMenuLink href="/delete-profile">
              Deletar 
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Button size={'icon'} className="bg-yellow-400 hover:bg-yellow-500 text-text p-0 text-bold" onClick={logout}>
            <IoLogOutOutline/>
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
"use client"

import * as React from "react"
import Link from "next/link"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export default function NavHeader() {
    return (
        <NavigationMenu>
            <NavigationMenuList>

                <NavigationMenuItem>
                    <Link href="/shop/list" >
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Shop List
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/rule" >
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Rules
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/steering" >
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Steerings
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/glossary" >
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Glossary
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

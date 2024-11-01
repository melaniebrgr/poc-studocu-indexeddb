'use client'

import { NotebookText } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useGetAllSummaries } from "@/app/components/IDBVanillaCard/useIDB";

export function AppSidebar() {
  const summaries = useGetAllSummaries();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Summaries</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {summaries.map((summary) => (
                <SidebarMenuItem key={summary.title}>
                  <SidebarMenuButton asChild>
                    <a>
                      <NotebookText />
                      <span>{summary.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
